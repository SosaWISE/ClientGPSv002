/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'dataservice.base',
  'config'
], function(
  utils,
  DataserviceBase,
  config
) {
  "use strict";

  function DataserviceGeofences() {
    DataserviceGeofences.super_.call(this, '', config.serviceDomain);
  }
  utils.inherits(DataserviceGeofences, DataserviceBase);

  //
  // helper functions
  //

  DataserviceGeofences.prototype.getData = function(data, cb) {
    this.post('Device/AcquireDeviceGeoFences', data, cb);
  };

  /**
   * @Description  Below is a description of the properties of the data object.
   *	<br />long GeoFenceID -- This is the primary key of the object.  If not present then the API will create a
   *	new geoFence.
   *	<br />long SessionID -- This is the current SessionID
   *	<br />long AccountId -- The account id that this geofence is tied to.
   *	<br />long CustomerId -- The Customer Id to which the account id belongs to.
   *	<br />string GeoFenceName -- Name of the fence.  i.e. My House.
   *	<br />string GeoFenceDescription -- Long description
   *	<br />string ItemId -- This is the type of device that the geoFence belongs to. (For Laipac use  S911BRC-HC, S911BRC-CE)
   *	<br />string ReportMode -- Possible values (1-Exit Alert; 2-Enter Alert; 3-Exit Enter Alert)
   *	<br />double MaxLattitude -- Maximum Latitude
   *	<br />double MinLongitude -- Minimum Longitude
   *	<br />double MaxLongitude -- Maximum Longitude
   *	<br />double MinLattitude -- Minimum Latitude
   *	<br />short? ZoomLevel -- Google Maps Zoom Level
   */
  DataserviceGeofences.prototype.updateData = function(data, cb) {
    this.post('GeoSrv/GeoRectangleSave', data, cb);
  };

  return new DataserviceGeofences();
});
