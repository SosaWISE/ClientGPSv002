/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */
define('router',
['jquery', 'underscore', 'sammy', 'presenter', 'config', 'route-mediator', 'store'],
function ($, _, Sammy, presenter, config, routeMediator, store) {
	var
		loginOptions,
		currentHash = '',
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
				defaultRoute = options.route;
				setupGet(options, '/');
			}

			setupGet(options);
		},

		setupGet = function (options, routeOverride) {
			var route = routeOverride || options.route;
//			if (route === config.Hashes.login) {
//				loginOptions = options;
//			}
			sammy.get(route, function (context) { // context is 'this'.
				var loggedOut = !config.CurrentUser(),
						cls;

				/////////////TESTING////////////////////////
				//loggedOut = false;
				/////////////TESTING////////////////////////

				debugger;
				// use login options if logged out
//				if (loggedOut) {
//					options = loginOptions;
//				}
				cls = options.title.toLowerCase();

				// set body class if it's not 'login'
				$('body').attr('class', (cls!=='login') ? cls : '');

				store.Save(config.StateKeys.lastView, context.path);
				options.callback(context.params); // Activate the viewModel.

				if (loggedOut) {
					$('#login-container').show();
					$('.site-container').hide();
					$('.view').hide();
					presenter.TransitionTo(
						$(options.view),
						options.route, // context.path, // We want to find the route we defined in the config.
						options.group
					);
				} else {
					$('#login-container').hide();
					$('.site-container').show();
					$('.sidebars > .sidebar').addClass('active');
					$('.sidebars > .sidebar.' + cls).addClass('active');
				}

				// if (this.title) {
				// 	this.title(options.title);
				// }
				$('title').text(options.title + ' | Security Sciences');
			});
		},

		getUsableRoute = function (value) {
			if (value && value.indexOf('#') >= 0) {
				return value.substr(value.indexOf('#'));
			}
			return null;
		},

		_run = function () {
			var url = store.Fetch(config.StateKeys.lastView);

			// 1) if I browse to a location, use it.
			// 2) otherwise use the url i grabbed from storage.
			// 3) otherwise use the default route.
			var addressBarUrl = sammy.getLocation();
			_startupHash = getUsableRoute(addressBarUrl) || getUsableRoute(url) || defaultRoute;

			// set hash before running
			sammy.setLocation(_startupHash);
			sammy.run();
			registerBeforeLeaving();
		},

		_startupHash = '/',

		_getStartupHash = function () {
			return _startupHash;
		};

	/** Return object. */
	return {
		NavigateBack: _navigateBack,
		NavigateTo: _navigateTo,
		Register: _register,
		Run: _run,
		get GetStartupHash() { return _getStartupHash; }
	};
});
