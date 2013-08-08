/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'underscore', 'sammy', 'presenter', 'config', 'route-mediator', 'store'],
function ($, _, Sammy, presenter, config, routeMediator, store) {
	var
		loginOptions,
		destRoute = '',
		currentHash = '',
		defaultOptions,
		defaultRoute = '',
		isRedirecting = false,
		logger = config.Logger,
		window = config.Window,

		sammy = new Sammy.Application(function () {
			if (Sammy.Title) {
				this.use(Sammy.Title);
				this.setTitle(config.Title);
			}
		}),

		_navigateBack = function () {
			window.history.back();
		},

		_navigateTo = function (url) {
			sammy.setLocation(url);
		},

		_register = function (options) {
			if (options.routes) {
				// Register a list of routes.
				_.each(options.routes, function (route) {
					registerRoute({
						route: route.route,
						title: route.title,
						callback: route.callback,
						view: options.view,
						group: route.group,
						isDefault: !!route.isDefault
					});
				});
				return;
			}

			// Register 1 route.
			registerRoute(options);
		},

		registerBeforeLeaving = function () {
			sammy.before(/.*/, function () {
				var
					context = this,
					response = routeMediator.CanLeave();
					//prevHash = currentHash;

				if (!isRedirecting && !response.val) {
					isRedirecting = true;
					logger.warning(response.message);
					// Keep hash url the same in address bar
					context.app.setLocation(currentHash);
				}
				else {
					isRedirecting = false;
					currentHash = context.app.getLocation();
					currentHash = currentHash.substr(currentHash.indexOf('#'));
				}

				// cancel the route if this returns false
				return response.val;
			});
		},
		registerRoute = function (options) {
			if (!options.callback) {
				throw Error('callback must be specified.');
			}

			if (options.isDefault) {
				defaultOptions = options;
				defaultRoute = options.route;
				setupGet(options, '/');
			}

			setupGet(options);
		},

		setupGet = function (options, routeOverride) {
			var route = routeOverride || options.route;
			if (route === config.Hashes.login) {
				loginOptions = options;
			}
			sammy.get(route, function (context) { // context is 'this'.
				var loggedIn = !!config.CurrentUser(),
					cls,
					lOptions = options;

				if (loggedIn) {
					// user is logged in
					if (route === config.Hashes.login) {
						// don't let user go to login page
						lOptions = defaultOptions;
						context.app.setLocation(lOptions.route);
					}

					// save last path
					store.Save(config.StateKeys.lastView, context.path);
				}
				else if (route !== config.Hashes.login) {
					// store route the user wanted to go to so when the
					// user is logged in we can redirect to that route
					destRoute = route;

					// user is logged out, so force user to go to login page
					lOptions = loginOptions;
					context.app.setLocation(lOptions.route);
				}

				cls = lOptions.title.toLowerCase();
				// set body class if it's not 'login'
				$('body').attr('class', (cls!=='login') ? cls : '');
				// // set body class
				// $('body').attr('class', cls);

				if (loggedIn) {
					lOptions.callback(context.params); // Activate the viewModel.
					_showPortal(cls);

					presenter.TransitionTo(
						$(lOptions.view),
						lOptions.route, // context.path, // We want to find the route we defined in the config.
						lOptions.group
					);
				}
				else {
					lOptions.callback({}); // Activate the login viewModel.
					_showLogin();
				}

				// if (this.title) {
				// 	this.title(options.title);
				// }
				$('title').text(lOptions.title + ' | Security Sciences');
			});
		},

		getUsableRoute = function (value) {
			if (value && value.indexOf('#') >= 0) {
				return value.substr(value.indexOf('#'));
			}
			return null;
		},

		_run = function () {
			var url = store.Fetch(config.StateKeys.lastView),
				addressBarUrl;

			// 1) if I browse to a location, use it.
			// 2) otherwise use the url i grabbed from storage.
			// 3) otherwise use the default route.
			addressBarUrl = sammy.getLocation();
			_startupHash = getUsableRoute(addressBarUrl) || getUsableRoute(url) || defaultRoute;

			// set hash before running
			sammy.setLocation(_startupHash);
			sammy.run();
			registerBeforeLeaving();
		},

		_startupHash = '/',

		_getStartupHash = function () {
			return _startupHash;
		},

		_showPortal = function(cls) {
			$('#login-container').hide();
			$('.site-container').show();
			$('.view').show();
			$('.sidebars > .sidebar').addClass('active');
			$('.sidebars > .sidebar.' + cls).addClass('active');
		},
		_showLogin = function() {
			$('#login-container').show();
			$('.site-container').hide();
			$('.view').hide();
		},
		_transitionToLastView = function () {
			_navigateTo(destRoute);
		};

	/** Return object. */
	return {
		NavigateBack: _navigateBack,
		NavigateTo: _navigateTo,
		Register: _register,
		Run: _run,
		get GetStartupHash() { return _getStartupHash; },
		get TransitionToLastView() { return _transitionToLastView; }
	};
});
