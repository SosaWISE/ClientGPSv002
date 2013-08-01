define(['./flowUtil','gmaps','./polygon','./polyPoint','./edge'],
function (flowUtil, gmaps, Polygon, PolyPoint, Edge) {
	"use strict";

	function Rectangle(options, stopUnselect) {
		this.model = options.model;
		// init paths with correct points
		this.updatePathFromModel(options.paths = new gmaps.MVCArray());

		// call parent
		Polygon.apply(this, arguments);
	}
	// inherits from g Polygon
	Rectangle.prototype = Object.create(Polygon.prototype);
	Rectangle.prototype.constructor = Rectangle;

	Rectangle.prototype.updatePathFromModel = function (path) {
		var model = this.model,
			point,
			index = 0;

		if (!path) {
			path = this.getPath();
		}

		// 0 - bottom left (GS point 1)
		path.setAt(index++, new gmaps.LatLng(model.MinLattitude(), model.MinLongitude()));
		// 1 - top left (Laipac point 1)
		path.setAt(index++, new gmaps.LatLng(model.MaxLattitude(), model.MinLongitude()));
		// 2 - top right (GS point 2)
		path.setAt(index++, new gmaps.LatLng(model.MaxLattitude(), model.MaxLongitude()));
		// 3 -  bottom right (Laipac point 2)
		path.setAt(index++, new gmaps.LatLng(model.MinLattitude(), model.MaxLongitude()));

		// GS_AccountGeoFenceRectangle to Laipac
		// Laipac     = GS_AccountGeoFenceRectangle
		// Latitude1  = MaxLattitude
		// Longitude1 = MinLongitude
		// Latitude2  = MinLattitude
		// Longitude2 = MaxLongitude
	};
	Rectangle.prototype.updateModelFromPath = function (path) {
		var model = this.model,
			point,
			index = 0;

		if (!path) {
			path = this.getPath();
		}

		// point 1
		point = path.getAt(index);
		model.MinLattitude(point.lat());
		model.MinLattitude(point.lng());

		// point 2
		point = path.getAt(index + 2);
		model.MaxLattitude(point.lat());
		model.MaxLattitude(point.lng());
	};

	Rectangle.prototype.setAt = function (vertexIndex, latLng) {
		var path = this.getPath(),
			model = this.model,
			polyPoints = this.polyPoints,
			edges = this.edges;

		switch(vertexIndex) {
		case 0:
			model.MinLattitude(latLng.lat());
			model.MinLongitude(latLng.lng());
			break;
		case 1:
			model.MaxLattitude(latLng.lat());
			model.MinLongitude(latLng.lng());
			break;
		case 2:
			model.MaxLattitude(latLng.lat());
			model.MaxLongitude(latLng.lng());
			break;
		case 3:
			model.MinLattitude(latLng.lat());
			model.MaxLongitude(latLng.lng());
			break;
		default:
			return;
		}

		//set on path
		this.updatePathFromModel();

		path.forEach(function (latLng, index) {
			//set on polyPoints
			polyPoints.getAt(index).setPosition(latLng);
			//set on edges
			var edgePath = edges.getAt(index).getPath();
			edgePath.setAt(0, latLng);
			edgePath.setAt(1, path.getAt((index + 1) % 4));
		});
		// edges.getAt(vertexIndex).getPath().setAt(0, latLng);
		// edges.getAt((vertexIndex > 0) ? vertexIndex - 1 : edges.getLength() - 1).getPath().setAt(1, latLng);

		gmaps.event.trigger(this, "changed");
	};

	Polygon.prototype.isValidVertexPosition = function (vertexIndex, latLng) {
		return true;
	};
	Rectangle.prototype.dragEnd = function () {
		if (!this.dragContext) {
			alert('missing drag context');
			return;
		}

		var lastValidLatLng = this.dragContext.lastValidLatLng,
			path = this.getPath(),
			minLatLng = path.getAt(0),
			minIndex = 0;

		// make sure minlat,minlng and maxlat,maxlng are in correct indexes
		// by putting the minimums at index 0
		path.forEach(function (latLng, index) {
			//@TODO: fix the min logic to most southwest
			if (latLng.lat() <= minLatLng.lat() &&
				latLng.lat() <= minLatLng.lat()) {
				minLatLng = latLng;
				minIndex = index;
			}
		});
		if (minIndex > 0) {
			this.setIndexFirst(minIndex);
		}

		//reset drag context
		this.dragContext = null;

		//return valid latLng
		return lastValidLatLng;
	};



	return Rectangle;
});
