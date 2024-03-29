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
    this.routeMap = {};
    this.routes = [];
    this.anonRoutes = [];

    this.destPath = null;
    this.prevRoute = null;
    this._ignoreCount = 0;
  }
  Router.prototype.create = function() {
    return new Router();
  };

  Router.prototype.init = function() {
    var _this = this;
    // ,changeTimeout;

    function changePath() {
      _this.goToPath(_this.getPath(), false);
    }

    // check the user is logged in
    if (!config.user()) {
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
      // clearTimeout(changeTimeout);
      // changeTimeout = setTimeout(function() {
      changePath();
      // }, 0);
    });
  };
  Router.prototype.useDestPath = function() {
    this.goToPath(this.destPath, false);
    this.destPath = null;
  };

  Router.prototype.addRoute = function(controller, routeName, routePath, defaultRouteData) {
    addRoute(this, this.routes, controller, routeName, routePath, defaultRouteData);
  };
  Router.prototype.addAnonRoute = function(controller, routeName, routePath, defaultRouteData) {
    addRoute(this, this.anonRoutes, controller, routeName, routePath, defaultRouteData);
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
      // remove # from front and make lowercase
      hash = hash.substr(1).toLowerCase();
    }
    return hash;
  };

  Router.prototype.goToPath = function(path, allowHistory) {
    var _this = this,
      user = config.user(),
      routes = user ? this.routes : this.anonRoutes,
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
      //@TODO: store in app data???
      // StateKeys: {
      //   lastView: 'state.active-hash'
      // },
      this.prevRoute.deactivate();
    }

    // find the first route that matches the path
    route = findFirstRoute(routes, path);
    // check if a route was found
    if (!route) {
      // first route is the default route
      route = routes[0];
      // make default path for route
      path = route.toPath(route.fromPath('/' + route.name));
    }

    // activate the route
    route.activate(path, onActivated);
    // check if it was activated synchronously
    if (!activated) {
      // temporarily set the path while the route is being activated
      this.setPath(path, false);
    }

    showElements(user, route);
    this.prevRoute = route;
  };
  Router.prototype.goToRoute = function(routeName, routeData, allowHistory) {
    var route = this.routeMap[routeName];
    if (!route) {
      throw new Error('no route named ' + routeName);
    }
    return this.goToPath(route.toPath(routeData), allowHistory);
  };


  function addRoute(router, routes, controller, routeName, routePath, defaultRouteData) {
    var route = Route.create(router, controller, routeName, routePath, defaultRouteData);
    if (router.routeMap[route.name]) {
      throw new Error('route named `' + route.name + '` already exists');
    }
    router.routeMap[route.name] = route;
    routes.push(route);
  }

  function findFirstRoute(routes, path) {
    var routeFound;
    // activate the first route that matches the path
    routes.some(function(route) {
      if (route.fromPath(path)) {
        routeFound = route;
        // break out of loop
        return routeFound;
      }
    });
    return routeFound;
  }

  function showElements(user, route) {
    if (user) {
      $('body').attr('class', route.name);

      $('#login-container').hide();
      $('.site-container').show();
      $('.view').show();
      $('.sidebars > .sidebar').addClass('active');
      $('.sidebars > .sidebar.' + route.name).addClass('active');

    } else {
      $('body').attr('class', '');

      $('#login-container').show();
      $('.site-container').hide();
      $('.view').hide();
    }
  }

  return new Router();
});
