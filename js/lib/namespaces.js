/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/24/2013
 * Time: 09:29 AM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the function that will allow us to create hierarchy of objects as in C#.
 /********************************************************************************************************************/

/**
 * This function once called at the top of each JavaScript file will create a hierarchy of objects.  The parameter
 * <i>namespaceString</i>  must be of the format:
 * <br />[Grand Parent Object Name].[Parent Object Name].[Object Name]...[Object Name(i)]
 * <br />Objects must be separated by periods (.) in a string.
 * @param namespaceString
 * @returns {*|Object|Object}
 */
function namespace(namespaceString) {
	/** Initialize. */
	var parts = namespaceString.split('.'),
		parent = window,
		currentPart = '',
		currentNSPath = '';

	/** Loop for each space and create an object for them. */
	for(var i = 0, length = parts.length; i < length; i++) {
		// ** Get current part
		currentPart = parts[i];

		// **  Get namespacePath
		if (currentNSPath !== '') currentNSPath += '.';
		currentNSPath += currentPart;

		// ** Create the object hierarchy.
		parent[currentPart] = parent[currentPart] || {};
		parent = parent[currentPart];

		// ** Assign the namespace path to the object
		parent._namespacePath = currentNSPath;
	}
    
	return parent;
}