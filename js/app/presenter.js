/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
define('presenter',
['jquery'],
function ($) {
	var
		_transitionOptions = {
			ease: 'swing',
			fadeOut: 100,
			floatIn: 500,
			offsetLeft: '20px',
			offsetRight: '-20px'
		},

		_entranceThemeTransition = function ($view) {
			$view.css({
				display: 'block',
				visibility: 'visible'
			}).addClass('view-active').animate({
				marginRight: 0,
				marginLeft: 0,
				opacity: 1
			}, _transitionOptions.floatIn, _transitionOptions.ease);
		},

		_highlightActiveView = function (route, group) {
			// Reset top level nav links
			// Find all NAV links by CSS classname
			var $group = $(group);
			if ($group) {
				$(group + '.route-active').removeClass('route-active');
				if (route) {
					var match = route[0] === '/' ? route.substring(1) : route;
					// Highlight the selected nav that matches the route
					$group.has('a[href="' + match + '"]').addClass('route-active');
				}
			}
		},

		_resetViews = function () {
			$('.view').css({
				marginLeft: _transitionOptions.offsetLeft,
				marginRight: _transitionOptions.offsetRight,
				opacity: 0
			});
		},

		_toggleActivity = function (show) {
			$('#busyindicator').activity(show);
		},

		_transitionTo = function ($view, route, group) {
			var $activeViews = $('.view-active');

			_toggleActivity(true);

			if ($activeViews.length) {
				$activeViews.fadeOut(_transitionOptions.fadeOut, function () {
					_resetViews();
					_entranceThemeTransition($view);
				});
				$('.view').removeClass('view-active');
			} else {
				_resetViews();
				_entranceThemeTransition($view);
			}

			_highlightActiveView(route, group);

			_toggleActivity(false);
		};

	/** Return object. */
	return {
		get ToggleActivity() { return _toggleActivity; },
		get TransitionOptions() { return _transitionOptions; },
		get TransitionTo() { return _transitionTo; }
	};
});