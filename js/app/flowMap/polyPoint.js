define(['./flowUtil','gmaps','jquery'],
function (flowUtil, gmaps, $) {
	"use strict";

	function PolyPoint(poly, index, latLng) {
		var that = this,
			lastValidLocation;

		gmaps.Marker.call(this, {
			draggable: true,
			flat: true,
			icon: PolyPoint.defaultIcon,
			map: poly.getMap(),
			position: latLng,
			raiseOnDrag: false,
			zIndex: 100,
			shape: { type: "circle", coords: [7, 7, 7] }
		});

		this.poly = poly;
		this.index = index;
		this.editable = poly.editable;

		this.overHandle = null;
		this.outHandle = null;

		lastValidLocation = latLng;

		if (!this.editable) {
			this.StartSnapMode();
		}
		else {

			gmaps.event.addListener(this, "mouseover", function () {
				return false;
			});

			gmaps.event.addListener(this, "dragstart", function () {
				this.poly.dragStart(this.index, this.getPosition());
			});
			gmaps.event.addListener(this, "drag", function (e) {
				this.poly.dragging(e.latLng);
			});
			gmaps.event.addListener(this, "dragend", function () {
				var latLng = this.poly.dragEnd();
				this.setPosition(latLng);
			});

			gmaps.event.addListener(this, "rightclick", function () {
				if (this.poly.isCurrent() || this.poly.getPath().getLength() < 2) {
					var div = $(document.createElement("div"));
					$(document.createElement("a")).attr("href", "#").text("Delete Point").addClass("polygonDelete").click(function () {
						that.setMap(null);
						that.poly.removeAt(that.index);
						return false;
					}).appendTo(div);
					if (flowUtil.isDebug()) {
						$(document.createElement("div")).html("index:" + this.index).appendTo(div);
						$(document.createElement("div")).html(this.getPosition().toString()).appendTo(div);
					}
					new gmaps.InfoWindow({
						content: div[0]
					}).open(poly.getMap(), this);
				}
			});
		}

		gmaps.event.addListener(this, "click", function (e) {
			var map = this.getMap();

			if (map.inEditMode) {
				if (this.poly.isCurrent()) {
					gmaps.event.trigger(this, "rightclick", e);
				}
				else {
					gmaps.event.trigger(map, "click", { latLng: this.getPosition() });
				}
			}
			else {
				//act as if selecting the polygon
				gmaps.event.trigger(this.poly, "click", e);
			}
		});
	}
	// inherits from g Marker
	PolyPoint.prototype = new gmaps.Marker();

	PolyPoint.prototype.StartSnapMode = function () {
		//this.setVisible(false);
		this.setDraggable(false);
		this.setIcon(PolyPoint.clearIcon);

		this.overHandle = gmaps.event.addListener(this, "mouseover", function () {
			var map = this.getMap();
			if (map && map.inEditMode) {
				if (!this.poly.isCurrent()) {
					this.setIcon(PolyPoint.snapIcon);

					if (map.currentPoly) {
						map.currentPoly.dropTarget = this;
					}
				}
			}
		});

		this.outHandle = gmaps.event.addListener(this, "mouseout", function () {
			var map = this.getMap();
			if (map && map.inEditMode) {
				if (!this.poly.isCurrent()) {
					this.setIcon(PolyPoint.clearIcon);

					if (map.currentPoly) {
						map.currentPoly.dropTarget = null;
					}
				}
			}
		});
	};

	PolyPoint.prototype.EndSnapMode = function () {
		//this.setVisible(true);
		if (this.editable) {
			this.setIcon(PolyPoint.defaultIcon);
			this.setDraggable(true);

			if (this.overHandle) {
				gmaps.event.removeListener(this.overHandle);
				this.overHandle = null;
			}

			if (this.outHandle) {
				gmaps.event.removeListener(this.outHandle);
				this.outHandle = null;
			}
		}
	};




	// pre-load polyPoint images
	var defaultImg = new Image(),
		clearImg = new Image(),
		snapImg = new Image();

	PolyPoint.defaultIcon = new gmaps.MarkerImage(
        defaultImg.src = "/img/polypoint-default.png",
        new gmaps.Size(14, 14),
        new gmaps.Point(0, 0),
        new gmaps.Point(7, 7)
    );
	PolyPoint.clearIcon = new gmaps.MarkerImage(
        clearImg.src = "/img/polypoint-clear.png",
        new gmaps.Size(12, 12),
        new gmaps.Point(0, 0),
        new gmaps.Point(6, 6)
    );
	PolyPoint.snapIcon = new gmaps.MarkerImage(
        snapImg.src = "/img/polypoint-snap.png",
        new gmaps.Size(14, 14),
        new gmaps.Point(0, 0),
        new gmaps.Point(7, 7)
    );


	return PolyPoint;
});
