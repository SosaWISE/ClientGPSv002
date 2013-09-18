/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:54 AM
 * To change this template use File | Settings | File Templates.
 */
define([
  'ukov',
  'ko'
], function(
  ukov,
  ko
) {
  var schemaName = 'model.geofence';

  //
  // setup schema
  //

  // {
  // 	"GeoFenceID": 7,
  // 	"GeoFenceTypeId": "RECT",
  // 	"GeoFenceTypeUi": "fence",
  // 	"ReportModeId": "3",
  // 	"ReportModeUi": "INCEXC",
  // 	"AccountId": 100169,
  // 	"GeoFenceName": "Both Inclusion and Exclusion Zone of a Rectangular",
  // 	"GeoFenceDescription": null,
  // 	"GeoFenceNameUi": "Both Inclusion and Exclusion Zone of a Rectangular",
  // 	"MeanLattitude": 40.32603879612476,
  // 	"MeanLongitude": -111.68433833333333,
  // 	"ZoomLevel": 12,
  // 	"Area": 372878.2628931999,
  // 	"MinLattitude": 40.32482425891619,
  // 	"MinLongitude": -111.69247166666668,
  // 	"MaxLattitude": 40.32725333333333,
  // 	"MaxLongitude": -111.67620499999998,
  // 	"GeoFenceType": "Rectangle",
  // 	"PointLatitude": null,
  // 	"PointLongitude": null,
  // 	"CenterLattitude": null,
  // 	"CenterLongitude": null,
  // 	"Radius": null,
  // 	"PolyPointsList": [],
  // 	"IsActive": false,
  // 	"IsDeleted": false,
  // 	"ModifiedOn": "2013-08-19T23:30:47.623"
  // }
  ukov.schema[schemaName] = {
    GeoFenceID: {},
    // GeoFenceTypeId: {},
    GeoFenceTypeUi: {},
    ReportModeId: {},
    // ReportModeUi: {},
    AccountId: {},
    GeoFenceName: {},
    GeoFenceDescription: {},
    GeoFenceNameUi: {},
    MeanLattitude: {},
    MeanLongitude: {},
    ZoomLevel: {},
    // Area: {},
    MinLattitude: {},
    MinLongitude: {},
    MaxLattitude: {},
    MaxLongitude: {},
    // GeoFenceType: {},
    // PointLatitude: {},
    // PointLongitude: {},
    // CenterLattitude: {},
    // CenterLongitude: {},
    // Radius: {},
    // PolyPointsList: {},
    // IsActive: {},
    // IsDeleted: {},
    ModifiedOn: {
      alwaysClean: true,
    },
  };

  return {
    wrap: function(model, collectionName) {
      model = ukov.wrapModel(model, schemaName, collectionName);
      model.id = model.GeoFenceID();

      model.saving = ko.observable(false);
      model.active = ko.observable(false);
      model.activate = function() {
        this.active(true);
      };
      model.deactivate = function() {
        this.active(false);
      };

      // model.type = ko.observable();
      model.time = ko.observable();

      return model;
    },
  };
});
