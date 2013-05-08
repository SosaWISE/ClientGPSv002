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
	test('nextPrime should return the next prime number', function () {
		assert.equal(11, nextPrime(7));
	});

	test('zero and one are not prime numbers', function () {
		assert(2, nextPrime(0));
		assert(2, nextPrime(1));
	});
});