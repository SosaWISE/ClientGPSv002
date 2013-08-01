define(['gmaps','./polygon','./marker','./rectangle'],
function (gmaps, Polygon, Marker, Rectangle) {
	"use strict";

	function Map(mapDiv, opts, paths, boundary) {
		gmaps.Map.call(this, mapDiv, opts);

		this.boundary = null;

		if (boundary) {
			this.setBoundary(boundary);
		}

		this.currentPoly = null;
		this.polygons = [];
		this.markers = [];
		this.clickHandle = null;
		this.inEditMode = false;
	}
	// inherit from g Map
	Map.prototype = new gmaps.Map(document.createElement("div"));

	Map.defaultPolygonOptions = {
		fillColor: "#444444",
		fillOpacity: 0.4,
		// map: this,
		// paths: [],
		strokeColor: "#444444",
		strokeOpacity: 0.75,
		strokeWeight: 4,
		zIndex: 5
	};

	Map.prototype.setBoundary = function (boundary, stopFitBounds) {
		if (boundary.getMap() !== this) {
			boundary.setMap(this);
		}

		this.boundary = boundary;
		if (!stopFitBounds) {
			this.fitBounds(boundary.getBounds());
		}
	};
	Map.prototype.setCurrentPolygon = function (polygon) {
		if (this.currentPoly !== polygon) {
			for (var i = 0; i < this.polygons.length; i += 1) {
				if (this.polygons[i].getPath().getLength() < 3) {
					// remove incomplete polygons (points and lines)
					this.polygons[i].dispose();
					i -= 1;
				}
				else {
					this.polygons[i].unselect();
				}
			}
			this.currentPoly = polygon;

			if (this.currentPoly) {
				this.currentPoly.select();
			}
		}
	};
	Map.prototype.addPolygon = function (polygon, isCurrent) {

		if (polygon.getMap() !== this) {
			polygon.setMap(this);
		}

		polygon.unselect();
		this.polygons.push(polygon);

		if (isCurrent) {
			if (this.currentPoly) {
				this.currentPoly.unselect();
			} else {
				polygon.select();
				this.currentPoly = polygon;
			}
		} else {
			polygon.unselect();
		}

		var me = this;
		gmaps.event.addListener(polygon, "changed", function () {
			gmaps.event.trigger(me, "changed");
		});
		gmaps.event.trigger(this, "changed");
	};

	Map.prototype.closeInfoWindow = function () {
	};
	Map.prototype.removePolygon = function (polygon) {
		if (polygon && polygon === this.boundary) {
			this.boundary.setMap(null);
			this.boundary = null;
		}
		else {
			for (var i = 0; i < this.polygons.length; i += 1) {
				if (this.polygons[i] === polygon) {

					if (this.currentPoly === polygon) {
						this.currentPoly = null;
					}

					polygon.setMap(null);
					gmaps.event.clearListeners(polygon, "changed");

					this.polygons.remove(i);

					gmaps.event.trigger(this, "changed");
					break;
				}
			}
		}
	};

	Map.prototype.checkResize = function () {
		gmaps.event.trigger(this, 'resize');
	};

	Map.prototype.clear = function () {
		while (this.polygons.length > 0) {
			this.polygons[0].dispose();
		}

		if (this.boundary) {
			this.boundary.dispose();
		}

		this.boundary = null;
		this.currentPoly = null;
	};

	Map.prototype.beginEdit = function (stopUnselect) {
		if (!this.clickHandle) {
			this.clickHandle = gmaps.event.addListener(this, "click", function (e) {

				if (e.safePassage || !this.boundary || this.boundary.containsLatLng(e.latLng)) {

					var index, poly;
					if (!this.currentPoly) {
						//add new polygon with
						poly = new Polygon(Map.defaultPolygonOptions, stopUnselect);
						this.addPolygon(poly, true);
						index = 0;
					}
					else {
						//add point to current polygon
						index = this.currentPoly.getIndexOfNewPoint(e.latLng);
					}
					this.currentPoly.insertAt(index, e.latLng);
				}
			});
			this.inEditMode = true;
		}
	};
	Map.prototype.endEdit = function () {
		if (this.clickHandle) {
			gmaps.event.removeListener(this.clickHandle);
			this.clickHandle = null;
			this.inEditMode = false;
		}
	};
	// Map.prototype.cancelEdit = function () {
	// };
	// Map.prototype.getChanges = function () {
	// };

	Map.prototype.findIntersections = function (newEdges) {
		var i, j, k, iPoly, intersects;

		for (i = 0; i < this.polygons.length; i += 1) {
			iPoly = this.polygons[i];

			if (iPoly !== this.currentPoly) {
				for (j = 0; j < iPoly.edges.getLength(); j += 1) {
					for (k = 0; k < newEdges.length; k += 1) {

						intersects = iPoly.edges.getAt(j).intersects(newEdges[k]);
						if (intersects) {
							return true;
						}
					}
				}
			}
		}

		if (this.boundary) {
			for (j = 0; j < this.boundary.edges.getLength(); j += 1) {
				for (k = 0; k < newEdges.length; k += 1) {
					if (this.boundary.edges.getAt(j).intersects(newEdges[k])) {
						return true;
					}
				}
			}
		}

		return false;
	};
	Map.prototype.findContainment = function (point) {
		for (var i = 0; i < this.polygons.length; i += 1) {
			if (this.polygons[i].containsLatLng(point)) {
				return true;
			}
		}
		return false;
	};



	Map.prototype.removePolygonsByOwnerId = function (ownerId) {
		var i, poly;
		for (i = 0; i < this.polygons.length; i++) {
			poly = this.polygons[i];
			if (poly.ownerId === ownerId) {
				poly.dispose();
				i--;
			}
		}
	};

	Map.prototype.addRectangle = function (model, id, options) {
		var result;

		// add on defaults
		options = extend({
			model: model,
			id: id,
			map: this,
		}, options, Map.defaultPolygonOptions);

		this.addPolygon(result = new Rectangle(options));
		return result;
	};


	Map.prototype.removeMarkersByOwnerId = function (ownerId) {
		var i, item;
		for (i = 0; i < this.markers.length; i++) {
			item = this.markers[i];
			if (item.ownerId === ownerId) {
				this.markers.remove(i);
				i--;
			}
		}
	};
	Map.prototype.addMarker = function (ownerId, point) {
		var marker = new Marker(this, new gmaps.LatLng(point.Lattitude, point.Longitude));
		marker.ownerId = ownerId;
		this.markers.push(marker);
	};


	//
	// static functions
	//

	function extend(options /*, defaultOptions... */) {
		var args = Array.prototype.slice.call(arguments, 1);
		// foreach default options argument
		// add the property if it doesn't exist
		// on the options argument
		args.forEach(function (defaultOptions) {
			// make sure defaultOptions is defined
			if (!defaultOptions) { return; }
			Object.keys(defaultOptions).forEach(function (key) {
				if (!options.hasOwnProperty(key)) {
					options[key] = defaultOptions[key];
				}
			});
		});
		return options;
	}

	return Map;
});
