define([
], function() {
	"use strict";

	function Route(regx, parts, defaultParams, controller) {
		this.regx = regx;
		this.parts = parts;
		this.defaultParams = defaultParams;
		this.controller = controller;
	}
	Route.create = function(routePath, defaultParams, controller) {
		// make regx and parts from routePath
		var regxParts = [],
			parts = [],
			hasColon = false;
		routePath.split('/').forEach(function(name) {
			if (!name) {
				// starting slash makes an empty name
				return;
			}
			if (name[0] === ':') {
				// starts with colon
				hasColon = true;
				name = name.substr(1); // remove colon
				regxParts.push('(\/[^\/]*)?');
			} else if (hasColon) {
				throw new Error(':name cannot come before non-colon name');
			} else {
				// literal match
				regxParts.push('(\/' + name + ')');
			}
			parts.push({
				name: name,
				isColon: hasColon,
			});
		});

		return new Route(new RegExp(regxParts.join('')), parts, defaultParams, controller);
	};
	Route.prototype.getParams = function(path) {
		var match = this.regx.exec(path),
			params;
		if (match) {
			params = {};
			this.parts.some(function(part, index) {
				if (!part.isColon) {
					return;
				}
				params[part.name] = match[index + 1].substr(1);
			});
			return params;
		}
	};
	Route.prototype.toPath = function(params) {
		var pathParts = [],
			defaultParams = this.defaultParams;

		// add an empty string to prefix the path with a slash
		pathParts.push('');
		this.parts.some(function(part) {
			if (part.isColon) {
				var val = params[part.name];
				if (isNullOrEmpty(val)) {
					// try to use use default value
					val = defaultParams[part.name];
					if (isNullOrEmpty(val)) {
						// break out of loop when no value is found
						return true;
					}
				}
				// add val to path
				pathParts.push(val);
			} else {
				pathParts.push(part.name);
			}
		});

		return pathParts.join('/');
	};

	function isNullOrEmpty(str) {
		return str === null || typeof(str) === 'undefined' || str.length === 0;
	}


	return Route;
});
