/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 5:44 PM
 * To change this template use File | Settings | File Templates.
 */
define('model.mapper',
	['model'],
	function (model) {
		var
			customer = {
				getDtoId: function (dto) { return dto.CustomerId; },
				fromDto: function (dto, item) {
					item = item || new model.Customer().CustomerID(dto.CustomerID);
					return item.name(dto.name);
				}
			},
			session = {
				getDtoId: function (dto) { return dto.SessionId; },
				fromDto: function (dto, item) {
					item = item || new model.Session().SessionID(dto.SessionID);
					return item.name(dto.name);
				}
			},
			event = {
				getDtoId: function (dto) { return dto.EventID; },
				fromDto: function (dto, item) {
					item = item || new model.Event().EventID(dto.EventID);
					return item.name(dto.name);
				}
			},
			device = {
				getDtoId: function (dto) { return dto.DeviceID; },
				fromDto: function (dto, item) {
					item = item || new model.Device().DeviceID(dto.DeviceID);
					return item.name(dto.name);
				}
			},
			geoFence = {
				getDtoId: function (dto) { return dto.GeoFenceID; },
				fromDto: function (dto, item) {
					item = item || new model.GeoFence().GeoFenceID(dto.GeoFenceID);
					return item.name(dto.name);
				}
			};

		/** Return object. */
		return {
			get Customer() { return customer; },
			get Session() { return session; },
			get Device() { return device; },
			get Event() { return event; },
			get GeoFence() { return geoFence; }
		};
	});