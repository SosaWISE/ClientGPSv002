/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
define('messenger',
['amplify', 'config'],
function (amplify, config) {
	var
		priority = 1,

		_publish = function (topic, options) {
			amplify.publish(topic, options);
		},

		_subscribe = function (options) {
			amplify.subscribe(
				options.topic,
				options.context,
				options.callback,
				priority
			);
		};

	_publish.viewModelActivated = function (options) {
		amplify.publish(config.Messages.viewModelActivated, options);
	};

	return {
		Publish: _publish,
		Subscribe: _subscribe
	};
});