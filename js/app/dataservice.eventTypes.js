/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 9/04/13
 * Time: 04:19 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'config',
	'dataservice.base',
	'utils'
], function(config, DataserviceBase, utils) {

	function DataserviceEventTypes() {
		DataserviceEventTypes.super_.call(this, 'Device', config.serviceDomain);
	}
	utils.inherits(DataserviceEventTypes, DataserviceBase);

	//
	// helper functions
	//

	DataserviceEventTypes.prototype.GetData = function(data, cb) {
		this.post('EventTypesReadAll', data, cb);
	};

	return new DataserviceEventTypes();
});
