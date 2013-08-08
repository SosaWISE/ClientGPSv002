/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:54 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko'],
function (ko) {
	/** Define Model. */
	var GeoFence = function () {
		var self = this;

		self.saving = ko.observable(false);
		self.active = ko.observable(false);

		self.GeoFenceID = ko.observable();
		self.AccountId = ko.observable();
		// self.Area = ko.observable();
		// self.CenterLattitude = ko.observable();
		// self.CenterLongitude = ko.observable();
		self.GeoFenceDescription = ko.observable();
		// self.Name = ko.observable();
		self.GeoFenceName = ko.observable();
		self.Type = ko.observable();
		// self.TypeId = ko.observable();
		self.ReportMode = ko.observable();
		// self.ReportModeUi = ko.observable();
		self.MaxLattitude = ko.observable();
		self.MaxLongitude = ko.observable();
		self.MeanLattitude = ko.observable();
		self.MeanLongitude = ko.observable();
		self.MinLattitude = ko.observable();
		self.MinLongitude = ko.observable();
		// self.PointLattitude = ko.observable();
		// self.PointLongitude = ko.observable();
		// self.PolyPointsList = ko.observableArray();
		// self.Radius = ko.observable();
		self.ModifiedOn = ko.observable();
		self.ZoomLevel = ko.observable();

		self.SessionID = ko.observable();
		self.ItemId = ko.observable();

		// self.isBrief = ko.observable(true);
		self.isNullo = false;
		self.dirtyFlag = new ko.DirtyFlag([
		]);

		/** Return object. */
		return self;
	};

	GeoFence.Nullo = new GeoFence();
	GeoFence.Nullo.isNullo = true;
	GeoFence.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	GeoFence.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	GeoFence.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object. */
	return GeoFence;
});
