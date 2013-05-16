/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */
define("dataservice",
[
	'dataservice.session',
	'dataservice.customer'
],
function (session, customer) {
	return {
		session: session,
		customer: customer
	};
});