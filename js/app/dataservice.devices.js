/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 2:22 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'config',
	'dataservice.base',
	'utils'
], function(config, DataserviceBase, utils) {

	function DataserviceDevices() {
		DataserviceDevices.super_.call(this, 'Device', config.serviceDomain);
	}
	utils.inherits(DataserviceDevices, DataserviceBase);

	//
	// helper functions
	//

	DataserviceDevices.prototype.getData = function(data, cb) {
		this.post('AcquireList', data, cb);
	};
	DataserviceDevices.prototype.updateData = function(data, cb) {
		console.log('DataserviceDevices.prototype.updateData not implemented');
		setTimeout(function() {
			cb({
				Code: -1,
				Message: 'not implemented',
			});
		}, 0);
	};
	DataserviceDevices.prototype.AcquireListByCustomerID = function(data, cb) {
		this.post('AcquireListByCustomerID', data, cb);
	};
	DataserviceDevices.prototype.AcquireDeviceDetails = function(data, cb) {
		this.post('AcquireDeviceDetails', data, cb);
	};

	return new DataserviceDevices();
});
