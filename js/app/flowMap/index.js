define(['./flowUtil','./map','./polygon','./polyPoint','./edge','./marker'],
function (flowUtil, Map, Polygon, PolyPoint, Edge, Marker) {
	"use strict";

	return {
		util: flowUtil,
		Map: Map,
		Polygon: Polygon,
		PolyPoint: PolyPoint,
		Edge: Edge,
		Marker: Marker,
	};
});
