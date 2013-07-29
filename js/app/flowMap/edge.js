define(['./flowUtil','gmaps'],
function (flowUtil, gmaps) {
	"use strict";

	function Edge(latLng1, latLng2, polygon, options) {
		gmaps.Polyline.call(this, {
			map: (polygon) ? polygon.getMap() : null,
			path: [latLng1, latLng2],
			strokeColor: (options && options.strokeColor) ? options.strokeColor : "#FF00FF",
			strokeOpacity: 1.0,    //(options) ? options.strokeOpacity : null,
			strokeWeight: (options) ? options.strokeWeight : null,
			zIndex: 6
		});
		this.initialColor = options.strokeColor;
		this.projection = (this.getMap()) ? this.getMap().getProjection() : options.projection;
		this.calculateProjection();
		var that = this;

		gmaps.event.addListener(this.getPath(), "set_at", function () {
			that.calculateProjection();
		});

		gmaps.event.addListener(this, "click", function (e) {
			if (!polygon.isCurrent()) {
				this.nearestLatLngTo(e.latLng);
				gmaps.event.trigger(this.getMap(), "click", { latLng: e.latLng, safePassage: true });
			}
		});
		gmaps.event.addListener(this, "mouseover", function () {
			var map = this.getMap();
			if (map && map.inEditMode) {
				if (!polygon.isCurrent()) {
					this.setOptions({
						strokeColor: "#4A4EE8"
					});
				}
			}
		});
		gmaps.event.addListener(this, "mouseout", function () {
			var map = this.getMap();
			if (map && map.inEditMode) {
				if (!polygon.isCurrent()) {
					this.setOptions({
						strokeColor: this.initialColor
					});
				}
			}
		});
	}
	// inherits from g Polyline
	Edge.prototype = new gmaps.Polyline();

	//--------------------------------------------------------
	//    Computes slope and y-intercept
	//--------------------------------------------------------
	Edge.prototype.calculateProjection = function () {
		var path = this.getPath();
		//this.latLng1 = { x: new BigDecimal(path.getAt(0).lng().toString()), y: new BigDecimal(path.getAt(0).lat().toString()) };
		//this.latLng2 = { x: new BigDecimal(path.getAt(1).lng().toString()), y: new BigDecimal(path.getAt(1).lat().toString()) };
		this.pow = 1; // Math.pow(10, 15);
		this.latLng1 = { x: path.getAt(0).lng() * this.pow, y: path.getAt(0).lat() * this.pow };
		this.latLng2 = { x: path.getAt(1).lng() * this.pow, y: path.getAt(1).lat() * this.pow };
		//logPoint("latLng1", this.latLng1);
		//logPoint("latLng2", this.latLng2);
		this.latLngDx = this.latLng2.x - this.latLng1.x;
		this.latLngDy = this.latLng2.y - this.latLng1.y;

		this.p1 = this.projection.fromLatLngToPoint(path.getAt(0));
		this.p2 = this.projection.fromLatLngToPoint(path.getAt(1));
		this.dx = this.p2.x - this.p1.x;
		this.dy = this.p2.y - this.p1.y;
	};

	Edge.prototype.intersects = function (testEdge) {
		return this.getIntersectType(testEdge).intersect;
	};
	Edge.prototype.getIntersectType = function (testEdge) {
		var result = flowUtil.getLineIntersectType(this.p1, this.p2, testEdge.p1, testEdge.p2, this.dx, this.dy, testEdge.dx, testEdge.dy), v;
		if (result.point) {
			v = this.projection.fromPointToLatLng(result.point);

			//if (result.intersect) {
			//	//make up for javascript bad float calculations
			//	//	check if the intesection vertex is "mostly" equal to one of the end points
			//	//	if so, use that point and set it as a pointIntersect
			//	path = this.getPath();
			//	if (flowUtil.verticesAreEqual(path.getAt(0), v)) {
			//		v = path.getAt(0);
			//		result.intersect = false;
			//		result.pointIntersect = true;
			//		console.warn("changed from intersect to pointIntersect A");
			//	}
			//	//else if (flowUtil.verticesAreEqual(path.getAt(1), v)) {
			//	//	v = path.getAt(1);
			//	//	result.intersect = false;
			//	//	result.pointIntersect = true;
			//	//	console.warn("changed from intersect to pointIntersect B");
			//	//}
			//	else {
			//	}
			//}

			result.vertex = v;
		}
		return result;
	};
	Edge.prototype.getIntersectType2 = function (testEdge) {
		//var result = flowUtil.getLineIntersectType(this.p1, this.p2, testEdge.p1, testEdge.p2, this.dx, this.dy, testEdge.dx, testEdge.dy),
		var result = flowUtil.getLineIntersectType(this.latLng1, this.latLng2, testEdge.latLng1, testEdge.latLng2, this.latLngDx, this.latLngDy, testEdge.latLngDx, testEdge.latLngDy), v;
		if (result.point) {
			//v = this.projection.fromPointToLatLng(result.point);
			v = new gmaps.LatLng(result.point.y / this.pow, result.point.x / this.pow);
			result.point = this.projection.fromLatLngToPoint(v);

			//if (result.intersect) {
			//	//make up for javascript bad float calculations
			//	//	check if the intesection vertex is "mostly" equal to one of the end points
			//	//	if so, use that point and set it as a pointIntersect
			//	path = this.getPath();
			//	if (flowUtil.verticesAreEqual(path.getAt(0), v)) {
			//		v = path.getAt(0);
			//		result.intersect = false;
			//		result.pointIntersect = true;
			//		console.warn("changed from intersect to pointIntersect A");
			//	}
			//	//else if (flowUtil.verticesAreEqual(path.getAt(1), v)) {
			//	//	v = path.getAt(1);
			//	//	result.intersect = false;
			//	//	result.pointIntersect = true;
			//	//	console.warn("changed from intersect to pointIntersect B");
			//	//}
			//	else {
			//	}
			//}

			result.vertex = v;
		}
		return result;
	};

	Edge.prototype.getRadians = function (reverse) {
		//return flowUtil.calcRadiansBetweenPoints(this.p1, this.p2); //this gives funky results since lat and lng aren't symetrical

		var path, a, b, temp;
		path = this.getPath();

		a = { x: path.getAt(0).lng(), y: path.getAt(0).lat() };
		b = { x: path.getAt(1).lng(), y: path.getAt(1).lat() };

		if (reverse) {
			temp = a;
			a = b;
			b = temp;
		}

		return flowUtil.calcRadiansBetweenPoints(a, b);
	};
	Edge.prototype.hasAngleBetween = function (edgeA, edgeB, reverseEdgeA) {
		var a, b, x, nDigits = 5;

		//this function seems to be reversed or maybe my mind is. either way, think twice before making changes

		if (!flowUtil.verticesAreEqual(edgeA.getPath().getAt(1), edgeB.getPath().getAt(0))) {
			throw "edgeA and edgeB don't create an angle";
		}

		a = edgeA.getRadians(reverseEdgeA).roundTo(nDigits); //need to be going away from intersection
		b = edgeB.getRadians().roundTo(nDigits);
		x = this.getRadians().roundTo(nDigits);

		if (a < b) {
			//it's easier to check that it's not between and return the negated result
			return !(a < x && x < b) && x !== a && x !== b;
		} else {
			return b < x && x < a;
		}
	};
	Edge.prototype.isLatLngLeaving = function (latLng) {
		//latLng is leaving because it intersects at the first point, but not its second
		var path = this.getPath();
		return flowUtil.verticesAreEqual(path.getAt(0), latLng) && !flowUtil.verticesAreEqual(path.getAt(1), latLng);
	};
	Edge.prototype.isLatLngPassing = function (latLng) {
		//latLng is passing because it doesn't intersect any point
		var path = this.getPath();
		return !flowUtil.verticesAreEqual(path.getAt(0), latLng) && !flowUtil.verticesAreEqual(path.getAt(1), latLng);
	};


	Edge.prototype.getHalfWayRadians = function (edgeB, reverseEdgeA) {
		var a, b, x, result;

		if (!flowUtil.verticesAreEqual(this.getPath().getAt(1), edgeB.getPath().getAt(0))) {
			throw "this and edgeB don't create an angle";
		}

		a = this.getRadians(reverseEdgeA).roundTo(12); //need to be going away from intersection
		b = edgeB.getRadians().roundTo(12);
		x = this.getRadians().roundTo(12);

		if (a < b) {
			result = ((a + b) / 2) + Math.PI;
			if (result >= (Math.PI * 2)) {
				result -= (Math.PI * 2);
			}
		}
		else {
			result = (a + b) / 2;
		}

		return result;
	};

	Edge.prototype.nearestLatLngTo = function (latLng) {
		var p3 = this.projection.fromLatLngToPoint(latLng),
			u = ((p3.x - this.p1.x) * (this.p2.x - this.p1.x) + (p3.y - this.p1.y) * (this.p2.y - this.p1.y)) / (this.dx * this.dx + this.dy * this.dy);

		if (u <= 0) {
			return this.getPath().getAt(0);
		}
		if (u >= 1) {
			return this.getPath().getAt(1);
		}

		return this.projection.fromPointToLatLng(new gmaps.Point(this.p1.x + u * this.dx, this.p1.y + u * this.dy));
	};
	Edge.prototype.furthestLatLngTo = function (latLng) {
		var p3 = this.projection.fromLatLngToPoint(latLng),
			u = ((p3.x - this.p1.x) * (this.p2.x - this.p1.x) + (p3.y - this.p1.y) * (this.p2.y - this.p1.y)) / (this.dx * this.dx + this.dy * this.dy);

		if (u <= 0) {
			return this.getPath().getAt(1);
		}
		if (u >= 1) {
			return this.getPath().getAt(0);
		}

		return this.projection.fromPointToLatLng(new gmaps.Point(this.p1.x + u * this.dx, this.p1.y + u * this.dy));
	};

	Edge.prototype.minDistanceTo = function (latLng) {
		return gmaps.geometry.spherical.computeDistanceBetween(this.nearestLatLngTo(latLng), latLng);
	};
	Edge.prototype.maxDistanceTo = function (latLng) {
		return gmaps.geometry.spherical.computeDistanceBetween(this.furthestLatLngTo(latLng), latLng);
	};
	Edge.prototype.distanceTo = function (vertexIndex, latLng) {
		return gmaps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(vertexIndex), latLng);
	};

	Edge.prototype.getHeading = function () {
		var get = this.getPath().getAt;

		return gmaps.geometry.spherical.computeHeading(get(0), get(1));
	};


	return Edge;
});
