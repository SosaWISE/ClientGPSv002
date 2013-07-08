/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 5:44 PM
 * To change this template use File | Settings | File Templates.
 */
define('model.mapper',
	['model','utils'],
	function (model,utils) {
		var
			customer = {
				getDtoId: function (dto) { return dto.CustomerId; },
				fromDto: function (dto, item) {
					item = item || new model.Customer();
					item.customerID(dto.CustomerID);
					item.sessionID(dto.SessionID);
					item.customerTypeId(dto.CustomerTypeId);
					item.customerMasterFileId(dto.CustomerMasterFileId);
					item.dealerId(dto.DealerId);
					item.dealerName(dto.DealerName);
					item.localizationId(dto.LocalizationId);
					item.localizationName(dto.LocalizationName);
					item.prefix(dto.Prefix);
					item.firstname(dto.FirstName);
					item.middleName(dto.MiddleName);
					item.lastname(dto.LastName);
					item.postfix(dto.Postfix);
					item.gender(dto.Gender);
					item.phoneHome(dto.PhoneHome);
					item.phoneCell(dto.PhoneMobile);
					item.phoneWork(dto.PhoneWork);
					item.email(dto.Email);
					item.dob(dto.DOB);
					item.ssn(dto.SSN);
					item.username(dto.Username);
					item.password(dto.Password);
					return item;
				}
			},
			session = {
				getDtoId: function (dto) { return dto.SessionId; },
				fromDto: function (dto, item) {
					item = item || new model.Session();
					item.SessionID(dto.SessionId);
					item.ApplicationId = dto.ApplicationId;
					item.AuthCustomer = dto.AuthCustomer;
					item.CreatedOn = dto.CreatedOn;
					item.IPAddress = dto.IPAddress;
					item.LastAccessedOn = dto.LastAccessedOn;
					item.SessionTerminated = dto.SessionTerminated;
					item.UserId = dto.UserId;
					item.dirtyFlag().reset();
					item.isBrief(false);
					return item;
				}
			},
			event = {
				getDtoId: function (dto) { return dto.EventID; },
				fromDto: function (dto, item) {
					item = item || new model.Event();
					item.EventID(dto.EventID);
					item.EventTypeId(dto.EventTypeId);
					item.EventType(dto.EventType);
					item.AccountId(dto.AccountId);
					item.CustomerId(dto.CustomerId);
					item.CustomerMasterFileId(dto.CustomerMasterFileId);
					item.AccountName(dto.AccountName);
					item.EventName(dto.EventName);
					item.EventDate(dto.EventDate);
					item.Longitude(dto.Longitude);
					item.Lattitude(dto.Lattitude);

					/** Add ui stuff. */
					item.EventTypeUi(dto.EventTypeUi);
					item.EventShortDesc(dto.EventShortDesc);

					item.dirtyFlag().reset();
					item.isBrief(false);
					return item;
				}
			},
			device = {
				getDtoId: function (dto) { return dto.AccountId; },
				fromDto: function (dto, item) {
					item = item || new model.Device();
					item.DeviceID(dto.AccountId);
					item.DeviceName(dto.AccountName);
					item.CustomerID(dto.CustomerID);
					item.CustomerMasterFileId(dto.CustomerMasterFileId);
					item.Designator(dto.Designator);
					item.IndustryAccountId(dto.IndustryAccountId);
					item.IndustryNumber(dto.IndustryNunmber);
					item.InvItemId(dto.InvItemId);
					item.PanelTypeId(dto.PanelTypeId);
					item.Password(dto.Password);
					item.SubscriberNumber(dto.SubscriberNumber);
					item.SystemTypeId(dto.SystemTypeId);
					item.UnitID(dto.UnitID);
					item.Username(dto.Username);

					item.type(dto.UIName);
					item.title(dto.AccountName);
					if (dto.EventDate) item.time(utils.DateLongFormat(dto.EventDate));
					else item.time('[No Event]');

					item.dirtyFlag().reset();
					item.isBrief(false);
					return item;
				}
			},
			geoFence = {
				getDtoId: function (dto) { return dto.GeoFenceID; },
				fromDto: function (dto, item) {
					item = item || new model.GeoFence().GeoFenceID(dto.GeoFenceID);
					item.GeoFenceID(dto.GeoFenceID);
					item.AccountId(dto.AccountId);
					item.Area(dto.Area);
					item.CenterLattitude(dto.CenterLattitude);
					item.CenterLongitude(dto.CenterLongitude);
					item.Description(dto.Description);
					item.GeoFenceNameUi(dto.GeoFenceNameUi);
					item.Type(dto.GeoFenceTypeUi);
					item.TypeId(dto.GeoFenceTypeId);
					item.ReportModeId(dto.ReportModeId);
					item.ReportModeUi(dto.ReportModeUi);
					item.MaxLattitude(dto.MaxLattitude);
					item.MaxLongitude(dto.MaxLongitude);
					item.MeanLattitude(dto.MeanLattitude);
					item.MeanLongitude(dto.MeanLongitude);
					item.MinLattitude(dto.MinLattitude);
					item.MinLongitude(dto.MinLongitude);
					item.PointLattitude(dto.PointLattitude);
					item.PointLongitude(dto.PointLongitude);
					item.PolyPointsList(dto.PolyPointsList);
					item.Radius(dto.Radius);
					item.ModifiedOn(dto.ModifiedOn);

					item.dirtyFlag().reset();
					item.isBrief(false);
					return item;
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