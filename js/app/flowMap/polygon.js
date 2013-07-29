define(['./flowUtil','gmaps','jquery','./polyPoint','./edge'],
function (flowUtil, gmaps, $, PolyPoint, Edge) {
	"use strict";

	function Polygon(options, stopUnselect) {
		this.lineOptions = null;
		this.stopUnselect = stopUnselect;

		if (options) {
			this.lineOptions = {
				strokeColor: options.strokeColor,
				strokeOpacity: options.strokeOpacity,
				strokeWeight: options.strokeWeight
			};
			options.strokeOpacity = 0.1;
		}

		gmaps.Polygon.apply(this, arguments);

		var that = this;

		this.initialColor = options.strokeColor || "#444444";
		this.editable = (options.editable !== undefined && options.editable !== null) ? options.editable : true;
		this.id = options.id ? options.id : 0;
		this.ownerId = options.ownerId ? options.ownerId : null;

		this.polyPoints = new gmaps.MVCArray();
		this.edges = new gmaps.MVCArray();

		if (!this.getPath()) {
			this.setPath(new gmaps.MVCArray());
		}
		this.onPathReset();

		gmaps.event.addListener(this, "click", this.onClick);

		if (this.editable) {
			gmaps.event.addListener(this, "rightclick", this.onRightClick);

			/*gmaps.event.addListener(this, "mouseover", function (e) {
			this.setOptions({
			fillColor: "#FFFFFF"
			});
			});*/
		}

		gmaps.event.addListener(this.getPath(), "reset", function () {
			that.onPathReset();
		});
	}
	// inherits from g Polygon
	Polygon.prototype = new gmaps.Polygon();

	Polygon.prototype.onClick = function (e) {
		var map = this.getMap(), newCurrent;

		if (this.editable) {
			if (map.inEditMode) {
				if (this.isCurrent()) {
					if (this.stopUnselect) {
						return;
					}
					newCurrent = null;
				}
				else {
					newCurrent = this;
				}
				map.setCurrentPolygon(newCurrent);
			}
			else {
				//if (displayOptions) {
				//	displayOptions(this.id, this.ownerId);
				//}
			}
		}
		else {
			gmaps.event.trigger(map, "click", e);
		}
	};
	Polygon.prototype.onRightClick = function (e) {
		var _this = this
			, map = _this.getMap()
			, infoWindow
			, div
			;

		if (map.inEditMode) {

			div = $(document.createElement("div"));
			div.append($(document.createElement("a")).attr("href", "#").text("Delete Area").addClass("polygonDelete").click(function () {
				infoWindow.close();
				_this.dispose();
				return false;
			}));
			if (flowUtil.isDebug()) {
				div.append($(document.createElement("div")).html("Path:" + _this.getPath().getArray().join(", ")));
				div.append($(document.createElement("div")).html("isClockwise:" + _this.isPathClockwise()));
				div.append($(document.createElement("div")).html("area:" + gmaps.geometry.spherical.computeArea(_this.getPath())));
				div.append($(document.createElement("div")).append(
					$(document.createElement("a")).attr("href", "#").text("Reverse Path").click(function () {
						_this.reversePathRotation();
						infoWindow.close();
						return false;
					}))
				);
			}

			infoWindow = new gmaps.InfoWindow({
				content: div[0],
				position: e.latLng
			});

			infoWindow.open(map);
		}
	};

	Polygon.prototype.onPathReset = function () {
		var path, length, list, me = this;

		//get path and its length
		path = this.getPath();
		length = path.getLength();

		//clear polyPoints
		this.clearPolyPoints();
		list = this.polyPoints;
		path.forEach(function (v, i) {
			list.push(new PolyPoint(me, i, v));
		});

		//clear edges
		this.clearEdges();
		list = this.edges;
		if (length > 1) {
			//add egdes
			path.forEach(function (v, i) {
				list.push(new Edge(v, path.getAt((i + 1) % length), me, me.lineOptions));
			});
		}

		if (this !== this.getMap().currentPoly) {
			this.unselect();
		}

		gmaps.event.trigger(this, "changed");
	};

	Polygon.prototype.select = function () {
		for (var i = 0; i < this.polyPoints.getLength(); i += 1) {
			this.polyPoints.getAt(i).EndSnapMode();
		}
	};
	Polygon.prototype.unselect = function () {
		if (!this.stopUnselect) {
			for (var i = 0; i < this.polyPoints.getLength(); i += 1) {
				this.polyPoints.getAt(i).StartSnapMode();
			}
		}
	};
	Polygon.prototype.isCurrent = function () {
		return (this === this.getMap().currentPoly);
	};
	Polygon.prototype.dispose = function () {
		this.clearPolyPoints();
		this.clearEdges();

		this.getMap().removePolygon(this);
		this.setMap(null); //in case the map didn't contain the polygon
	};
	Polygon.prototype.clearPolyPoints = function () {
		//clear polyPoints
		this.polyPoints.forEach(function (polyPoint) {
			polyPoint.setMap(null);
		});
		this.polyPoints.clear();
	};
	Polygon.prototype.clearEdges = function () {
		//clear edges
		this.edges.forEach(function (edge) {
			edge.setMap(null);
		});
		this.edges.clear();
	};

	Polygon.prototype.getIndexOfNewPoint = function (latLng) {
		var length, i
			, minDistance
			, maxDistance
			, index
			, tmpMin
			, tmpMax
			;
		length = this.getPath().getLength();
		if (length <= 1) {
			return length;
		}

		length = this.edges.getLength();
		for (i = 0; i < length; i += 1) {
			if (!this.newVertexWillIntersectSelf(i, latLng)) {
				tmpMin = this.edges.getAt(i).minDistanceTo(latLng);
				tmpMax = this.edges.getAt(i).maxDistanceTo(latLng);
				if (index === undefined ||
						(tmpMin <= minDistance && tmpMax <= maxDistance)) {
					minDistance = tmpMin;
					maxDistance = tmpMax;
					index = i;
				}
			}
		}
		return (index || 0) + 1;
	};
	Polygon.prototype.newVertexWillIntersectSelf = function (testEdgeIndex, latLng) {
		var i, edge, edgePath, newEdge1, newEdge2, intersects;

		edge = this.edges.getAt(testEdgeIndex);
		edgePath = edge.getPath();
		newEdge1 = new Edge(edgePath.getAt(0), latLng, null, { projection: edge.projection, strokeColor: "#444444" });
		newEdge2 = new Edge(edgePath.getAt(1), latLng, null, { projection: edge.projection, strokeColor: "#444444" });

		for (i = 0; i < this.edges.getLength(); i += 1) {
			if (i !== testEdgeIndex) {
				edge = this.edges.getAt(i);

				intersects = newEdge1.intersects(edge);
				if (intersects) {
					return true;
				}

				intersects = newEdge2.intersects(edge);
				if (intersects) {
					return true;
				}
			}
		}

		return false;
	};

	Polygon.prototype.isPathClockwise = function () {
		var result = this.getPath().isClockwise();
		this.onPathReset();
		return result;
	};
	Polygon.prototype.reversePathRotation = function () {
		this.getPath().reverseRotation();
		this.onPathReset();
	};

	Polygon.prototype.insertAt = function (index, latLng) {
		var outIndex = {};

		this.doInsertAt(index, latLng);

		if (this.getPath().getLength() > 1) {
			if (!this.tryPolyCutout(index, outIndex)) {
				//remove at index 1 since doPolyCutOut sets the changedIndex to 1
				this.getPath().removeAt(outIndex.value);
				this.onPathReset();
			}
		}
		//else {
		//	this.onPathReset();
		//}
	};
	Polygon.prototype.doInsertAt = function (vertexIndex, latLng) {
		var path, edges, i, length;

		//set on path
		path = this.getPath();
		path.insertAt(vertexIndex, latLng);

		//insert polyPoint
		this.polyPoints.insertAt(vertexIndex, new PolyPoint(this, vertexIndex, this.getPath().getAt(vertexIndex)));
		length = this.polyPoints.getLength();
		for (i = vertexIndex + 1; i < length; i += 1) {
			this.polyPoints.getAt(i).index += 1;
		}

		//insert edge
		edges = this.edges;
		if (path.getLength() > 3) {
			edges.insertAt(vertexIndex, new Edge(path.getAt(vertexIndex), path.getAt((vertexIndex + 1) % path.getLength()), this, this.lineOptions));
			edges.getAt((vertexIndex > 0) ? vertexIndex - 1 : edges.getLength() - 1).getPath().setAt(1, path.getAt(vertexIndex));
		}
		else if (path.getLength() === 3) {
			if (vertexIndex === 1) {
				edges.getAt(0).getPath().setAt(1, path.getAt(1));
			}
			edges.push(new Edge(path.getAt(1), path.getAt(2), this, this.lineOptions));
			edges.push(new Edge(path.getAt(2), path.getAt(0), this, this.lineOptions));
		}
		else if (path.getLength() === 2) {
			edges.push(new Edge(path.getAt(0), path.getAt(1), this, this.lineOptions));
		}

		gmaps.event.trigger(this, "changed");
	};
	Polygon.prototype.setAt = function (vertexIndex, latLng) {
		var path, edges;

		//set on path
		path = this.getPath();
		path.setAt(vertexIndex, latLng);

		//set on polyPoints
		this.polyPoints.getAt(vertexIndex).setPosition(latLng);

		//set on edges
		edges = this.edges;
		if (edges.getLength() === 1) {
			edges.getAt(0).getPath().setAt((vertexIndex > 0) ? 1 : 0, latLng);
		}
		else if (edges.getLength() > 0) {
			edges.getAt(vertexIndex).getPath().setAt(0, latLng);
			edges.getAt((vertexIndex > 0) ? vertexIndex - 1 : edges.getLength() - 1).getPath().setAt(1, latLng);
		}

		gmaps.event.trigger(this, "changed");
	};
	Polygon.prototype.removeAt = function (index) {
		var latLng, outIndex = {};

		//get latLng to be removed incase there's an error
		latLng = this.getPath().getAt(index);
		//remove latLng
		this.getPath().removeAt(index);
		this.onPathReset();

		if (!this.tryPolyCutout(index, outIndex)) {
			//re-insert latLng at index 1 since doPolyCutOut sets the changedIndex to 1
			this.getPath().insertAt(outIndex.value, latLng);
			this.onPathReset();
		}
	};

	Polygon.prototype.isValidVertexPosition = function (vertexIndex, latLng) {
		var i, length, tmpEdge, vertexEdge, prevEdge, intersects, prevIndex, path, isClockwise;

		length = this.edges.getLength();
		if (length >= 4) {
			//an intersection can only occur if there are 4 or more edges

			//check for intersections
			tmpEdge = this.edges.getAt(vertexIndex);
			vertexEdge = new Edge(latLng, tmpEdge.getPath().getAt(1), null, { projection: tmpEdge.projection, strokeColor: "#444444" });

			prevIndex = (vertexIndex > 0) ? vertexIndex - 1 : length - 1;
			tmpEdge = this.edges.getAt(prevIndex);
			prevEdge = new Edge(tmpEdge.getPath().getAt(0), latLng, null, { projection: tmpEdge.projection, strokeColor: "#444444" });

			for (i = 0; i < length; i += 1) {
				if (i !== vertexIndex && i !== prevIndex) {
					tmpEdge = this.edges.getAt(i);

					intersects = vertexEdge.intersects(tmpEdge);
					if (intersects) {
						return false;
					}

					intersects = prevEdge.intersects(tmpEdge);
					if (intersects) {
						return false;
					}
				}
			}
		}

		if (length >= 3) {
			//rotation can only change if there are 3 or more

			//check if changes the rotation
			path = this.getPath().copy();
			isClockwise = path.isClockwise();
			path.setAt(vertexIndex, latLng);
			if (isClockwise !== path.isClockwise()) {
				return false;
			}
		}

		return true;
	};
	Polygon.prototype.dragStart = function (vertexIndex, latLng) {
		this.dragContext = {
			vertexIndex: vertexIndex,
			startLatLng: latLng,
			lastValidLatLng: latLng
		};
	};
	Polygon.prototype.dragging = function (latLng) {
		if (!this.dragContext) {
			alert('missing drag context');
			return;
		}

		var isValid = true
			, edges = this.edges
			, vertexIndex
			;

		vertexIndex = this.dragContext.vertexIndex;

		// // make sure the point is NOT inside another polygon on the map
		// isValid = !this.getMap().findContainment(latLng);

		if (isValid && edges.getLength() > 0) {
			//prevent self intersections
			isValid = this.isValidVertexPosition(vertexIndex, latLng);
		}

		if (isValid) {
			//set vertex position
			this.setAt(vertexIndex, latLng);

			//set last valid latLng
			this.dragContext.lastValidLatLng = latLng;
		}

		return this.dragContext.lastValidLatLng;
	};
	Polygon.prototype.dragEnd = function () {
		if (!this.dragContext) {
			alert('missing drag context');
			return;
		}

		var vertexIndex = this.dragContext.vertexIndex
			, latLng = this.dragContext.lastValidLatLng
			, outIndex = {}
			;

		//do cut
		this.getPath().setAt(vertexIndex, latLng);
		if (!this.tryPolyCutout(vertexIndex, outIndex)) {
			//reset back to start position before cutting
			latLng = this.dragContext.startLatLng;
			//??not sure why the index hasn't changed here like with all other calls to doPolyCutOut
			//this.setAt(vertexIndex, latLng);
			this.setAt(outIndex.value, latLng);
		}

		//reset drag context
		this.dragContext = null;

		//return valid latLng
		return latLng;
	};

	Polygon.prototype.getCenter = function () {
		if (this.getPath().getLength() < 1) { return null; }
		return this.getBounds().getCenter();
	};
	// determines if a latLng is within a polygon
	Polygon.prototype.containsLatLng = function (latLng) {
		// Exclude points outside of bounds as there is no way they are in the poly
		var numPaths, p, path, numPoints, j, i, v1, v2, inPoly,
			bounds = this.getBounds();

		if (bounds !== null && !bounds.contains(latLng)) {
			return false;
		}

		// Raycast point in polygon method
		inPoly = false;

		numPaths = this.getPaths().getLength();
		for (p = 0; p < numPaths; p += 1) {
			path = this.getPaths().getAt(p);
			numPoints = path.getLength();
			j = numPoints - 1;

			for (i = 0; i < numPoints; i += 1) {
				v1 = path.getAt(i);
				v2 = path.getAt(j);

				if (v1.lng() < latLng.lng() && v2.lng() >= latLng.lng() || v2.lng() < latLng.lng() && v1.lng() >= latLng.lng()) {
					if (v1.lat() + (latLng.lng() - v1.lng()) / (v2.lng() - v1.lng()) * (v2.lat() - v1.lat()) < latLng.lat()) {
						inPoly = !inPoly;
					}
				}

				j = i;
			}
		}

		return inPoly;
	};
	// determines if a polygon is completely contained within another polygon
	Polygon.prototype.engulfsPolygon = function (polygon) {

		var i, path, nVertices, contains;

		path = polygon.getPath();
		nVertices = path.getLength();

		if (nVertices <= 1) {
			return false;
		}

		for (i = 0; i < nVertices; i += 1) {
			contains = this.containsLatLng(path.getAt(i));
			if (!contains) {
				return false;
			}
		}
		return true;
	};



	//
	// tryPolyCutout...
	//
	Polygon.prototype.tryPolyCutout = function (changedIndex, outIndex) {
		//@NOTE: implemention removed

		changedIndex=outIndex;
		return true;
	};
	Polygon.prototype.setIndexFirst = function (index) {
		this.getPath().setIndexFirst(index);
		this.onPathReset();
	};
	Polygon.prototype.intersectsEdges = function (newEdges) {
		var i, j, intersects, nEdges, edge;

		nEdges = this.edges.getLength();
		for (i = 0; i < nEdges; i += 1) {
			edge = this.edges.getAt(i);

			for (j = 0; j < newEdges.length; j += 1) {
				intersects = edge.intersects(newEdges[j]);
				if (intersects) {
					return true;
				}
			}
		}
		return false;
	};

	Polygon.prototype.ensurePartsAreSynched = function () {
		var path = this.getPath(), length = path.getLength(), me = this;

		if (length !== me.polyPoints.getLength()) {
			throw 'polyPoint length doesn\'t match';
		}
		if (length > 1 && length !== me.edges.getLength()) {
			throw 'edges length doesn\'t match';
		}

		path.forEach(function (v, i) {
			var iNexted = (i + 1) % length,
				vNexted = path.getAt(iNexted);

			if (!v.equals(me.polyPoints.getAt(i).getPosition())) {
				throw 'polyPoint doesn\'t match vertex';
			}

			if (length > 1) {
				if (!v.equals(me.edges.getAt(i).getPath().getAt(0))) {
					throw 'edge pointA doesn\'t match vertex';
				}
				if (!vNexted.equals(me.edges.getAt(i).getPath().getAt(1))) {
					throw 'edge pointB doesn\'t match next vertex';
				}
			}
		});
	};
	Polygon.prototype.getTempEdges = function (index, latLng) {
		var p = this.getPath(),
			tempOptions, newEdges;

		if (index < 0 || index > p.getLength()) {
			throw "cannot add point at that index";
		}

		tempOptions = this.lineOptions;
		tempOptions.projection = this.getMap().getProjection();

		newEdges = [];

		if (p.getLength() >= 2) {
			newEdges.push(new Edge(p.getAt((index > 0) ? index - 1 : p.getLength() - 1), latLng, null, tempOptions));
			newEdges.push(new Edge(latLng, p.getAt(index % p.getLength()), null, tempOptions));
		}
		else if (p.getLength() === 1) {
			newEdges.push(new Edge(p.getAt(0), latLng, null, tempOptions));
		}
		else {
			// What to do if trying to get an edge with only one point?
		}

		return newEdges;
	};


	return Polygon;
});
