/**
 * @fileoverview Exports module:GlobSetGetter
 * @copyright Robert Gaines 2020
 * @license Apache-2.0
 * @author Robert Gaines <rob@communitywebservice.com>
 */

/**
 * Provides Gulp Swallower task templates with access to globs.
 * Wraps GulpSwallower.getGlobSet
 * Prevents access to globs until they have been fully composed.
 * @module {Function} GlobSetGetter
 * @param {GulpSwallower} gulpSwallower Gulp Swallower.
 */
module.exports = function GlobSetGetter(gulpSwallower) {
	var _this = {}; // Private scope.

	_this.gulpSwallower = gulpSwallower;
	// Track ready state. Globs are not returned until all globs have been set and this.ready has been called.
	_this.state = false;

	/**
	 * Get glob set from Gulp Swallower.
	 * @method getGlobSet
	 * @param {string} globSetId Name of glob set.
	 * @returns {Array|undefined} glob set or undefined if this.ready hasn't been called.
	 */

	this.getGlobSet = function getGlobSet(globSetId) {
		var globSet;

		if (_this.state === false) {
			return undefined;
		}

		globSet = _this.gulpSwallower.getGlobSet(globSetId);

		return globSet;
	};

	/**
	 * Get ready state.
	 * @method getState
	 * @returns {boolean} ready state.
	 */

	this.getState = function getState() {
		return _this.state;
	};

	/**
	 * Set ready state to true.
	 * Signals that globs are ready for use.
	 * @method ready
	 */

	this.ready = function ready() {
		_this.state = true;
	};

};