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
			};

		/** Return object. */
		return {
			customer: customer
		};
	});