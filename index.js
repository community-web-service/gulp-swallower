/**
 * @fileoverview Exports module:GulpSwallower.
 * @copyright Robert Gaines 2020
 * @license Apache-2.0
 * @author Robert Gaines <rob@communitywebservice.com>
 */
"use strict";

/**
 * Create extendable gulp tasks via plugins.
 * @module {Function} GulpSwallower
 * @param {object} gulp Gulp.
 * @future Consider consolidating named/unnamed and extend/register methods.
 * @future Implement since, version, and require jsDoc tags.
 * @future Finish documenting private methods and properties.
 * @future Consistent variable and file names. i.e. taskName or taskId, globs or globSets, options or settings.
 * @future Review https://gulpjs.com/docs/en/api/task/#task-metadata
 * @future Consider gulp-define-module
 * @future Automate construction of matching copy, clean, and watch commands.
 * @future Consider moving requires in to tasks so they are only required when needed. Requires should be cached, so this shouldn't result in a performance hit.
 * @future Consider read:FALSE Gulp stream setting.
 * @future Use consistent error handling - write to error log and print to console.
 * @future Ensure that all tasks handle "File not found with singular glob". Certain tasks should trigger a warning while others should terminate silently.
 * @future Devise a means of automatically including dependencies in package.json
 * @future Devise a means of automatically including script commands in package.json
 * @future Make a plugin that automatically loads core modules based on platform targets (Web, Electron, Cordova, PHP, etc.)
 * @future Add gulp task descriptions per https://vjeko.com/2019/02/04/__trashed-4/
 * @future Review https://www.npmjs.com/package/gulp-task-builder
 * @future update how tasks are defined per the depreciation notice at https://gulpjs.com/docs/en/api/task/
 * @future Consider refactoring with https://github.com/community-web-service/iterative-object to reduce boilerplate.
 * @future Default gulp task should always be a taskSet.
 * @future Force namespaces for tasks, but not taskSets. 
 * @future Add ability to load configuration, including Plugins, from a file.
 * @future Add ability to add and manage pipes so that tasks can be constructed.
 * @future Review https://steelydylan.github.io/gulp-generator/
 * @future Review http://quenchjs.com/
 * @future Convert ES5 classes to ES6 classes.
 */

module.exports = function GulpSwallower(gulp) {
	var _this = {}; // Private scope.

	_this.gulp = gulp;
	_this.flattenArray = require("linear-array-flattener");
	_this.GlobSetGetter = require("./modules/GlobSetGetter.js");
	_this.tasks = [];
	_this.tasksByName = {};
	_this.taskSets = [];
	// @future consider consolidating this with _this.tasksByName and creating a TaskSet class.
	_this.taskSetTypes = {};
	_this.taskSetsByName = {};
	_this.globSets = {};
	_this.plugins = [];
	_this.globSetGetter = undefined;

	/**
	 * Interface for taskTemplate functions.
	 * Renders a built in template to a Gulp Task function.
	 * @callback taskTemplate
	 * @param {module:GlobSetGetter} globSetGetter.
	 * 		Glob sets registered with Gulp Swallower must be accessed through globSetGetter.
	 * 		Glob sets will be unavailable until all glob sets have been finalized and {@link module:GulpSwallower#run} has been called.
	 * @param {object} [options] Options passed from caller.
	 * @returns {function} Task function to be registered with Gulp.
	 */

	/**
	 * Interface for taskDefinition objects.
	 * Provides name and options for a [taskTemplate]{@link module:GulpSwallower#taskTemplate}.
	 * @typedef {Object} taskDefinition
	 * @property {string} name Task Name.
	 * @property {object} [options] Options passed to taskTemplate.
	 */

	/**
	 * Interface for taskDefinitionConstructor functions.
	 * Provides taskDefinitions for a [taskDefinition]{@link module:GulpSwallower#taskDefinition}
	 * @callback taskDefinitionConstructor
	 * @param {object} taskDefinitionOptions Options passed from caller.
	 * @returns {Array.<taskDefinition>|taskDefinition} Returns an array of taskDefinitions or a single taskDefinition.
	 */

	/**
	 * Interface for namedGlobSet objects.
	 * Object providing name and globs for easy consumption by functions.
	 * @typedef {Object} namedGlobSet
	 * @property {string} name Glob Set Name.
	 * @property {Array.<string>} globSet Array of glob strings.
	 */

	/**
	 * Error callback without arguments.
	 * @callback genericErrorCb
	 */

	/**
	 * Interface for Gulp Swallower plugins.
	 * @interface SwallowerPlugin
	 * @param {GulpSwallower} gulpSwallower Gulp Swallower.
	 * @param {object} [templateOptions] Default Swallower task template options.
	 */
	/**
	 * Get plugin ID.
	 * @method getId
	 * @memberof SwallowerPlugin
	 * @instance
	 * @returns {string} plugin ID.
	 */
	/**
	 * Get plugin requirements.
	 * @method getRequirements
	 * @memberof SwallowerPlugin
	 * @instance
	 * @returns {string} plugin ID.
	 */
	/**
	 * Run the plugin. Usually called internally by Gulp Swallower.
	 * @method run
	 * @memberof SwallowerPlugin
	 * @instance
	 */
	 
	/**
	 * Run registered plugins.
	 * @private
	 * @method runPlugins
	 * @param {genericErrorCb} [errorCb] Error callback.
	 * @future Improve requirement handling so that Plugins can run before or after another plugin, instead of just after.
	 * @future Allow optional requirements, that will be loaded before the plugin if present but ignored otherwise.
	 */

	_this.runPlugins = function runPlugins(errorCb) {
		var pluginCount = _this.plugins.length;
		var sanitycheck = 0;
		var completedPlugins = [];
		var pluginInstanceRequirements;
		var pluginInstanceRequirementsCount;
		var pluginInstance;
		var pluginInstanceId;
		var pluginReady;
		var i;

		errorCb = typeof errorCb !== "undefined" ? errorCb : function () {};

		// @future There are probably better ways to do this via sorting or recursion.
		if (pluginCount > 0) {

			while (_this.plugins.length) {
				pluginReady = true;
				pluginInstance = _this.plugins.shift();
				pluginInstanceId = pluginInstance.getId();
				pluginInstanceRequirements = pluginInstance.getRequirements();
				pluginInstanceRequirementsCount = pluginInstanceRequirements.length;

				for (i = 0; i < pluginInstanceRequirementsCount; i++) {
					if (completedPlugins.indexOf(pluginInstanceRequirements[i]) === -1) {
						pluginReady = false;
						_this.plugins.push(pluginInstance);
						break;
					}
				}

				if (pluginReady === true) {
					pluginInstance.run();
					sanitycheck = 0;
					completedPlugins.push(pluginInstanceId);
				}
				
				if (sanitycheck > _this.plugins.length) {
					errorCb();
					break;
				}

			}
		}
	}.bind(this);

	_this.addTaskSetToGulp = function addTaskSetToGulp(taskSetId) {
		var gulp = _this.gulp;
		var taskSet = _this.taskSetsByName[taskSetId];
		var taskType = _this.taskSetTypes[taskSetId];
		var gulpTask;

		if (taskType === "series") {
			gulpTask = gulp.series.apply(null, taskSet);
		} else if (taskType === "parallel") {
			gulpTask = gulp.parallel.apply(null, taskSet);
		}

		gulp.task(taskSetId, gulpTask);
	}.bind(this);

	_this.addTaskSetsToGulp = function addTaskSetToGulps() {
		var taskSets = _this.taskSets;
		var taskSetCount = taskSets.length;
		var i;

		for (i = 0; i < taskSetCount; i++) {
			_this.addTaskSetToGulp(taskSets[i]);
		}
	}.bind(this);

	_this.addTasksToGulp = function addTasksToGulp() {
		var gulp = _this.gulp;
		var tasks = _this.tasks;
		var tasksByName = _this.tasksByName;
		var taskCount = tasks.length;
		var taskName;
		var i;

		for (i = 0; i < taskCount; i++) {
			taskName = tasks[i];
			gulp.task(taskName, tasksByName[taskName]);
		}

		_this.addTaskSetsToGulp();
	}.bind(this);

	_this.renderTaskTemplate = function renderTaskTemplate(taskTemplate, taskDefinition) {
		var taskName = taskDefinition.name;
		var taskTemplateOptions = taskDefinition.options;

		this.registerTask(taskName, taskTemplate, taskTemplateOptions);
	}.bind(this);

	/**
	 * Register GULP task.
	 * @method registerTask
	 * @param {string} taskId Name of task.
	 * @param {taskTemplate} taskTemplate Task template.
	 * @param {object} [templateOptions] Data object passed to the template during rendering.
	 */

	this.registerTask = function registerTask(taskId, taskTemplate, templateOptions) {
		templateOptions = typeof templateOptions !== "undefined" ? templateOptions : {};

		_this.tasks.push(taskId);
		_this.tasksByName[taskId] = taskTemplate(_this.globSetGetter, templateOptions);
	};

	/**
	 * Register GULP tasks using a task definition constructor.
	 * @method defineTasks
	 * @param {taskTemplate} taskTemplate Task Template.
	 * @param {taskDefinitionConstructor} taskDefinitionConstructor Task Definition Constructor.
	 * @param {object} [taskDefinitionOptions] Data object passed to the definition constructor during rendering.
	 */

	this.defineTasks = function defineTasks(taskTemplate, taskDefinitionConstructor, taskDefinitionOptions) {
		var taskDefinitionsLength;
		var taskDefinitions;
		var taskDefinition;
		var i;

		taskDefinitions = taskDefinitionConstructor(taskDefinitionOptions);

		if (Array.isArray(taskDefinitions)) {

			taskDefinitionsLength = taskDefinitions.length;

			for (i = 0; i < taskDefinitionsLength; i++) {
				taskDefinition = taskDefinitions[i];

				_this.renderTaskTemplate(taskTemplate, taskDefinition);
			}

		} else {
			_this.renderTaskTemplate(taskTemplate, taskDefinitions);
		}
	};

	/**
	 * Add a named task to a task set. If the task set doesn't already exist, create it.
	 * @method extendTaskSet
	 * @param {string} taskSetId Name of task set.
	 * @param {string} taskSetType Gulp task type ("series" or "parallel").
	 * @param {string} taskId Task Name.
	 * @param {genericErrorCb} [errorCb] Error callback.
	 * @param {object} [orderPosition]
	 * 		If the requirements specified in orderPosition cannot be met, errorCb will be called.
	 * 		If a task specified in orderPosition is not found, it will be ignored. The specified tasks are optional and just used for ordering.
	 * @param {Array.<string>} [orderPosition.before] If the specified named task is found in the task set, the new task will be placed after it.
	 * @param {Array.<string>} [orderPosition.after]  If the specified named task is found in the task set, the new task will be placed before it.
	 * @future taskSetTypes should be based on constants.
	 * @future A separate method should create task sets, this method should just add tasks to the set.
	 * @future Provide error codes with the errorCb
	 * @future Allow tasks specified in positions to be required or optional; if a required task is not present in the task set, call an error callback.
	 * @future Add ability to restructure task list when an item from orderPosition.before comes after an item from orderPosition.after.
	 */

	this.extendTaskSet = function extendTaskSet(taskSetId, taskSetType, taskId, errorCb, orderPosition) {
		var lastBeforeRequirement;
		var firstAfterRequirement;
		var taskSetCount;
		var positionBeforeCount;
		var positionAfterCount;
		var orderPositions;
		var indexOfOrderPosition;
		var taskPosition;
		var taskSet;
		var i;
		
		errorCb = typeof errorCb !== "undefined" ? errorCb : function () {};
		orderPosition = typeof orderPosition !== "undefined" ? orderPosition : {
			before: [], // These requirements must run before the task
			after: [] // These requirements must run after the task
		};

		positionBeforeCount = orderPosition.before.length;
		positionAfterCount = orderPosition.after.length;

		_this.taskSetTypes[taskSetId] = taskSetType;

		if (Object.prototype.hasOwnProperty.call(_this.taskSetsByName, taskSetId)) {
			taskSet = _this.taskSetsByName[taskSetId];
			taskSetCount = taskSet.length;

			orderPositions = orderPosition.before;
			lastBeforeRequirement = -1;
			for (i = 0; i < positionBeforeCount; i++) {
				indexOfOrderPosition = taskSet.indexOf(orderPositions[i]);

				if (indexOfOrderPosition > lastBeforeRequirement) {
					lastBeforeRequirement = indexOfOrderPosition;
				}
			}

			orderPositions = orderPosition.after;
			firstAfterRequirement = taskSetCount;
			for (i = 0; i < positionAfterCount; i++) {
				indexOfOrderPosition = taskSet.indexOf(orderPositions[i]);

				if (indexOfOrderPosition < firstAfterRequirement) {
					firstAfterRequirement = indexOfOrderPosition;
				}
			}

			if (lastBeforeRequirement >= firstAfterRequirement) {
				errorCb();
			} else {
				taskPosition = firstAfterRequirement;
				taskSet.splice(taskPosition, 0, taskId);
				_this.taskSetsByName[taskSetId] = taskSet;
			}
		} else {
			if (positionBeforeCount === 0 && positionAfterCount === 0) {
				taskSet = [taskId];
				_this.taskSets.push(taskSetId);
				_this.taskSetsByName[taskSetId] = taskSet;
			} else {
				errorCb();
			}
		}
	};

	/**
	 * Get array of named tasks from a registered task set.
	 * @method getTaskSet
	 * @param {string} taskSetId Name of task set.
	 * @returns {Array|undefined} Task set or undefined if the task set hasn't been registered.
	 * @future Deal with mutability.
	 */

	this.getTaskSet = function getTaskSet(taskSetId) {
		if (Object.prototype.hasOwnProperty.call(_this.taskSetsByName, taskSetId)) {
			return _this.taskSetsByName[taskSetId];
		}

		return undefined;
	};

	/**
	 * Register glob set.
	 * @method registerGlobSet
	 * @param {string} globSetId Name of glob set.
	 * @param {Array.<Array|string>|string} globSet Multi-dimensional array of arbitrary depth containing globs as strings or a single glob as a string.
	 */

	this.registerGlobSet = function registerGlobSet(globSetId, globSet) {
		if (typeof globSet === "string") {
			globSet = [globSet];
		}

		globSet = _this.flattenArray(globSet, true);

		// Remove duplicate globs.
		globSet = globSet.filter(function (glob, globIndex, globSet) {
			return globSet.indexOf(glob) === globIndex;
		});

		_this.globSets[globSetId] = globSet;

	};

	/**
	 * Register named glob set.
	 * @method registerNamedGlobSet
	 * @param {namedGlobSet} namedGlobSet Named Glob Set.
	 */

	this.registerNamedGlobSet = function registerNamedGlobSet(namedGlobSet) {
		var globSetName;
		var globSet;

		globSetName = namedGlobSet.name;
		globSet = namedGlobSet.globSet;

		this.registerGlobSet(globSetName, globSet);
	};
	
	/**
	 * Extend named glob set.
	 * @method extendNamedGlobSet
	 * @param {namedGlobSet} namedGlobSet Named Glob Set.
	 */

	this.extendNamedGlobSet = function extendNamedGlobSet(namedGlobSet) {
		var globSetName;
		var globSet;

		globSetName = namedGlobSet.name;
		globSet = namedGlobSet.globSet;

		this.extendGlobSet(globSetName, globSet);
	};

	/**
	 * Register named glob sets.
	 * @method registerNamedGlobSets
	 * @param {Array.<namedGlobSet>} namedGlobSets Array of named glob sets.
	 */

	this.registerNamedGlobSets = function registerNamedGlobSets(namedGlobSets) {
		var namedGlobSetsLength = namedGlobSets.length;
		var namedGlobSet;
		var i;

		for (i = 0; i < namedGlobSetsLength; i++) {
			namedGlobSet = namedGlobSets[i];
			this.registerNamedGlobSet(namedGlobSet);
		}
	};
	
	/**
	 * Extend named glob sets.
	 * @method extendNamedGlobSets
	 * @param {Array.<namedGlobSet>} namedGlobSets Array of named glob sets.
	 */

	this.extendNamedGlobSets = function extendNamedGlobSets(namedGlobSets) {
		var namedGlobSetsLength = namedGlobSets.length;
		var namedGlobSet;
		var i;

		for (i = 0; i < namedGlobSetsLength; i++) {
			namedGlobSet = namedGlobSets[i];
			this.extendNamedGlobSet(namedGlobSet);
		}
	};

	/**
	 * Concatenate a glob set onto a registered glob set. If the glob set doesn't already exist, create it.
	 * @method extendGlobSet
	 * @param {string} globSetId Name of glob set.
	 * @param {Array.<Array|string>|string} newGlobSet Multi-dimensional array of arbitrary depth containing globs as strings or a single glob as a string.
	 * @future Add extendNamedGlobSet, extendNamedGlobSets
	 * @future Add ability to remove globs from globSets.
	 */

	this.extendGlobSet = function extendGlobSet(globSetId, newGlobSet) {
		var oldGulpGlobSet = [];

		if (typeof newGlobSet === "string") {
			newGlobSet = [newGlobSet];
		}

		if (Object.prototype.hasOwnProperty.call(_this.globSets, globSetId)) {
			oldGulpGlobSet = _this.globSets[globSetId];
		}

		this.registerGlobSet(globSetId, [oldGulpGlobSet, newGlobSet]);
	};

	/**
	 * Get array of globs from a registered glob set.
	 * @method getGlobSet
	 * @param {string} globSetId Name of glob set.
	 * @returns {Array|undefined} Glob set or undefined if the glob set hasn't been registered.
	 * @future Deal with mutability.
	 */

	this.getGlobSet = function getGlobSet(globSetId) {
		if (Object.prototype.hasOwnProperty.call(_this.globSets, globSetId)) {
			return _this.globSets[globSetId];
		}

		return undefined;
	};

	/**
	 * Register Gulp Swallower plugin.
	 * @method registerPlugin
	 * @param {SwallowerPlugin} SwallowerPlugin Gulp Swallower plugin: A ES6 class or ES5 class constructor function.
	 * @param {object} [pluginOptions] Data object passed to the plugin.
	 */

	this.registerPlugin = function registerPlugin(SwallowerPlugin, pluginOptions) {
		var pluginInstance = new SwallowerPlugin(this, pluginOptions);

		_this.plugins.push(pluginInstance);
	};

	/**
	 * Run plugins and register tasks with Gulp.
	 * @param {genericErrorCb} [errorCb] Error callback.
	 * @method run
	 */

	this.run = function run(errorCb) {
		_this.runPlugins(errorCb);
		_this.globSetGetter.ready();
		_this.addTasksToGulp();
	};

	_this.globSetGetter = new _this.GlobSetGetter(this);
};