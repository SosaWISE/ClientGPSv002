/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/9/13
 * Time: 10:45 AM
 * To change this template use File | Settings | File Templates.
 */
/** Declarations. */
load("Services/ClientAPI");

suite('Does this work Suite', function () {
	test('Some Test that is about to go off....', function () {
		assert.equals(11, function () { return 121; });
	});
});