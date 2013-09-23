/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */
define([
 'dataservice.session',
 'dataservice.customer',
 'dataservice.devices',
 'dataservice.geofences',
 'dataservice.events',
 'dataservice.eventTypes',
 'dataservice.users'
], function(session, customer, devices, geofences, events, eventTypes, users) {
  "use strict";
  return {
    Session: session,
    Customer: customer,
    Devices: devices,
    Geofences: geofences,
    Events: events,
    EventTypes: eventTypes,
    Users: users,
  };
});
