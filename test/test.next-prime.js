/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/8/13
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */

var assert = require('assert')
	, nextPrime = require('./index').nextPrime
	, asyncPrime = require('./index').asyncPrime;

suite('nextPrime', function () {
	test('nextPrime should return the next prime number.', function () {
		assert.equal(11, nextPrime(7));
	});

	test('zero and one are not prime numbers', function () {
		assert.equal(2, nextPrime(0));
		assert.equal(2, nextPrime(1));
	});
});

suite('asyncPrim', function () {
	test('asyncPrime should return the next prime number.', function (done) {
		asyncPrime(128, function (n) {
			assert.equal(131, n, 'Wrong number');
			done();
		});
	});
});