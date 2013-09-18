define([
  'jquery',
  'route',
  'config'
], function(
  $,
  Route,
  config
) {
  "use strict";

  function Router() {
    this.clear();
    this.destPath = null;
    this.prevRoute = null;
    this._ignoreCount = 0;
  }
  Router.prototype.clear = function() {
    this.routeMap = {};
    this.routes = [];
    this.anonRoutes = [];
  };

  function addRoute(router, routes, routeName, routePath, defaultRouteData, controller) {
    var route = Route.create(router, routeName, routePath, defaultRouteData, controller);
    if (router.routeMap[route.name]) {
      throw new Error('route named `' + route.name + '` already exists');
    }
    router.routeMap[route.name] = route;
    routes.push(route);
  }
  Router.prototype.addRoute = function(routeName, routePath, defaultRouteData, controller) {
    addRoute(this, this.routes, routeName, routePath, defaultRouteData, controller);
  };
  Router.prototype.addAnonRoute = function(routeName, routePath, defaultRouteData, controller) {
    addRoute(this, this.anonRoutes, routeName, routePath, defaultRouteData, controller);
  };

  Router.prototype.setPath = function(path, allowHistory) {
    if (path[0] !== '#') {
      path = '#' + path;
    }
    if (location.hash !== path) {
      // add to _ignoreCount
      this._ignoreCount++;
      if (allowHistory) {
        location.hash = path;
      } else {
        location.replace(path);
      }
    }
  };
  Router.prototype.getPath = function() {
    var hash = location.hash;
    if (hash && hash.length) {
      // remove # from front
      hash = hash.substr(1);
    }
    return hash;
  };
  Router.prototype.goToPath = function(path, allowHistory) {
    var _this = this,
      user = config.CurrentUser(),
      routes = user ? this.routes : this.anonRoutes,
      defaultPath = user ? this.defaultPath : this.defaultAnonPath,
      route,
      activated = false;

    function onActivated(pathTaken) {
      activated = true;
      if (pathTaken) {
        // ensure that it gets added to the history
        if (allowHistory && pathTaken === path) {
          _this.setPath('', false);
        }
        // set pathTaken in address bar
        _this.setPath(pathTaken, allowHistory);
      }
    }

    if (this.prevRoute) {
      this.prevRoute.deactivate();
    }

    // find the first route that matches the path or the default path
    route = findFirstRoute(routes, path) || findFirstRoute(routes, path = defaultPath);
    // activate the route
    route.activate(path, onActivated);
    // check if it was activated synchronously
    if (!activated) {
      // temporarily set the path while the route is being activated
      this.setPath(path, false);
    }

    if (user) {
      $('body').attr('class', route.name);
      showPortal(route.name);
    } else {
      $('body').attr('class', '');
      showLogin();
    }

    this.prevRoute = route;
  };
  Router.prototype.goToRoute = function(routeName, routeData, allowHistory) {
    var route = this.routeMap[routeName];
    if (!route) {
      throw new Error('route named `' + routeName + '` doesn\'t exist');
    }
    return this.goToPath(route.toPath(routeData), allowHistory);
  };

  Router.prototype.init = function() {
    var _this = this,
      changeTimeout;

    function changePath() {
      _this.goToPath(_this.getPath(), false);
    }

    // check the user is logged in
    if (!config.CurrentUser()) {
      // save destination path
      this.destPath = this.getPath();
    }

    // go to initial route, then listen for the route to change
    changePath();
    window.addEventListener('hashchange', function() {
      if (_this._ignoreCount > 0) {
        _this._ignoreCount--;
        return;
      }
      clearTimeout(changeTimeout);
      // changeTimeout = setTimeout(function() {
      changePath();
      // }, 0);
    });
  };
  Router.prototype.useDestPath = function() {
    this.goToPath(this.destPath, false);
    this.destPath = null;
  };


  function findFirstRoute(routes, path) {
    var routeFound;
    // activate the first route that matches the path
    routes.some(function(route) {
      if (route.getRouteData(path)) {
        routeFound = route;
        // break out of loop
        return routeFound;
      }
    });
    return routeFound;
  }
  // function activateFirstRoute(routes, path, activateCallback) {
  // 	var routeUsed;
  // 	// activate the first route that matches the path
  // 	routes.some(function(route) {
  // 		if (route.activate(path, activateCallback)) {
  // 			routeUsed = route;
  // 			// break out of loop
  // 			return routeUsed;
  // 		}
  // 	});
  // 	return routeUsed;
  // }


  function showPortal(cls) {
    $('#login-container').hide();
    $('.site-container').show();
    $('.view').show();
    $('.sidebars > .sidebar').addClass('active');
    $('.sidebars > .sidebar.' + cls).addClass('active');
  }

  function showLogin() {
    $('#login-container').show();
    $('.site-container').hide();
    $('.view').hide();
  }

  Router.instance = new Router();
  return Router;
});
