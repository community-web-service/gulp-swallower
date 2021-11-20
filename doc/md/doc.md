## Modules

<dl>
<dt><a href="#module_GulpSwallower">GulpSwallower</a> : <code>function</code></dt>
<dd><p>Create extendable gulp tasks via plugins.</p>
</dd>
<dt><a href="#module_GlobSetGetter">GlobSetGetter</a> : <code>function</code></dt>
<dd><p>Provides Gulp Swallower task templates with access to globs.
Wraps GulpSwallower.getGlobSet
Prevents access to globs until they have been fully composed.</p>
</dd>
</dl>

<a name="module_GulpSwallower"></a>

## GulpSwallower : <code>function</code>
Create extendable gulp tasks via plugins.

**Future**: Implement since, version, and require jsDoc tags.  
**Future**: Finish documenting private methods and properties.  
**Future**: Consistent variable and file names. i.e. taskName or taskId, globs or globSets, options or settings.  
**Future**: Review https://gulpjs.com/docs/en/api/task/#task-metadata  
**Future**: Consider gulp-define-module  
**Future**: Automate construction of matching copy, clean, and watch commands.  
**Future**: Consider moving requires in to tasks so they are only required when needed. Requires should be cached, so this shouldn't result in a performance hit.  
**Future**: Consider read:FALSE Gulp stream setting.  
**Future**: Use consistent error handling - write to error log and print to console.  
**Future**: Ensure that all tasks handle "File not found with singular glob". Certain tasks should trigger a warning while others should terminate silently.  
**Future**: Devise a means of automatically including dependencies in package.json  
**Future**: Devise a means of automatically including script commands in package.json  
**Future**: Make a plugin that automatically loads core modules based on platform targets (Web, Electron, Cordova, PHP, etc.)  
**Future**: Add gulp task descriptions per https://vjeko.com/2019/02/04/__trashed-4/  
**Future**: Review https://www.npmjs.com/package/gulp-task-builder  
**Future**: update how tasks are defined per the depreciation notice at https://gulpjs.com/docs/en/api/task/  
**Future**: Consider refactoring with https://github.com/community-web-service/iterative-object to reduce boilerplate.  
**Future**: Default gulp task should always be a taskSet.  
**Future**: Force namespaces for tasks, but not taskSets.  
**Future**: Add ability to load configuration, including Plugins, from a file.  
**Future**: Add ability to add and manage pipes so that tasks can be constructed.  
**Future**: Review https://steelydylan.github.io/gulp-generator/  
**Future**: Review http://quenchjs.com/  
**Future**: Convert ES5 classes to ES6 classes.  

| Param | Type | Description |
| --- | --- | --- |
| gulp | <code>object</code> | Gulp. |


* [GulpSwallower](#module_GulpSwallower) : <code>function</code>
    * [~SwallowerPlugin](#module_GulpSwallower..SwallowerPlugin)
    * [~registerTask(taskId, taskTemplate, [templateOptions])](#module_GulpSwallower..registerTask)
    * [~defineTasks(taskTemplate, taskDefinitionConstructor, [taskDefinitionOptions])](#module_GulpSwallower..defineTasks)
    * [~extendTaskSet(taskSetId, taskSetType, taskId, [errorCb], [orderPosition])](#module_GulpSwallower..extendTaskSet)
    * [~getTaskSet(taskSetId)](#module_GulpSwallower..getTaskSet) ⇒ <code>Array</code> \| <code>undefined</code>
    * [~registerGlobSet(globSetId, globSet)](#module_GulpSwallower..registerGlobSet)
    * [~registerNamedGlobSet(namedGlobSet)](#module_GulpSwallower..registerNamedGlobSet)
    * [~registerNamedGlobSets(namedGlobSets)](#module_GulpSwallower..registerNamedGlobSets)
    * [~extendGlobSet(globSetId, newGlobSet)](#module_GulpSwallower..extendGlobSet)
    * [~getGlobSet(globSetId)](#module_GulpSwallower..getGlobSet) ⇒ <code>Array</code> \| <code>undefined</code>
    * [~registerPlugin(SwallowerPlugin, [pluginOptions])](#module_GulpSwallower..registerPlugin)
    * [~run([errorCb])](#module_GulpSwallower..run)
    * [~taskTemplate](#module_GulpSwallower..taskTemplate) ⇒ <code>function</code>
    * [~taskDefinition](#module_GulpSwallower..taskDefinition) : <code>Object</code>
    * [~taskDefinitionConstructor](#module_GulpSwallower..taskDefinitionConstructor) ⇒ <code>Array.&lt;taskDefinition&gt;</code> \| <code>taskDefinition</code>
    * [~namedGlobSet](#module_GulpSwallower..namedGlobSet) : <code>Object</code>
    * [~genericErrorCb](#module_GulpSwallower..genericErrorCb) : <code>function</code>

<a name="module_GulpSwallower..SwallowerPlugin"></a>

### GulpSwallower~SwallowerPlugin
Interface for Gulp Swallower plugins.

**Kind**: inner interface of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| gulpSwallower | <code>GulpSwallower</code> | Gulp Swallower. |
| [templateOptions] | <code>object</code> | Default Swallower task template options. |

<a name="module_GulpSwallower..registerTask"></a>

### GulpSwallower~registerTask(taskId, taskTemplate, [templateOptions])
Register GULP task.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| taskId | <code>string</code> | Name of task. |
| taskTemplate | <code>taskTemplate</code> | Task template. |
| [templateOptions] | <code>object</code> | Data object passed to the template during rendering. |

<a name="module_GulpSwallower..defineTasks"></a>

### GulpSwallower~defineTasks(taskTemplate, taskDefinitionConstructor, [taskDefinitionOptions])
Register GULP tasks using a task definition constructor.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| taskTemplate | <code>taskTemplate</code> | Task Template. |
| taskDefinitionConstructor | <code>taskDefinitionConstructor</code> | Task Definition Constructor. |
| [taskDefinitionOptions] | <code>object</code> | Data object passed to the definition constructor during rendering. |

<a name="module_GulpSwallower..extendTaskSet"></a>

### GulpSwallower~extendTaskSet(taskSetId, taskSetType, taskId, [errorCb], [orderPosition])
Add a named task to a task set. If the task set doesn't already exist, create it.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Future**: taskSetTypes should be based on constants.  
**Future**: A separate method should create task sets, this method should just add tasks to the set.  
**Future**: Provide error codes with the errorCb  
**Future**: Allow tasks specified in positions to be required or optional; if a required task is not present in the task set, call an error callback.  
**Future**: Add ability to restructure task list when an item from orderPosition.before comes after an item from orderPosition.after.  

| Param | Type | Description |
| --- | --- | --- |
| taskSetId | <code>string</code> | Name of task set. |
| taskSetType | <code>string</code> | Gulp task type ("series" or "parallel"). |
| taskId | <code>string</code> | Task Name. |
| [errorCb] | <code>genericErrorCb</code> | Error callback. |
| [orderPosition] | <code>object</code> | If the requirements specified in orderPosition cannot be met, errorCb will be called. 		If a task specified in orderPosition is not found, it will be ignored. The specified tasks are optional and just used for ordering. |
| [orderPosition.before] | <code>Array.&lt;string&gt;</code> | If the specified named task is found in the task set, the new task will be placed after it. |
| [orderPosition.after] | <code>Array.&lt;string&gt;</code> | If the specified named task is found in the task set, the new task will be placed before it. |

<a name="module_GulpSwallower..getTaskSet"></a>

### GulpSwallower~getTaskSet(taskSetId) ⇒ <code>Array</code> \| <code>undefined</code>
Get array of named tasks from a registered task set.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Returns**: <code>Array</code> \| <code>undefined</code> - Task set or undefined if the task set hasn't been registered.  
**Future**: Deal with mutability.  

| Param | Type | Description |
| --- | --- | --- |
| taskSetId | <code>string</code> | Name of task set. |

<a name="module_GulpSwallower..registerGlobSet"></a>

### GulpSwallower~registerGlobSet(globSetId, globSet)
Register glob set.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| globSetId | <code>string</code> | Name of glob set. |
| globSet | <code>Array.&lt;(Array\|string)&gt;</code> \| <code>string</code> | Multi-dimensional array of arbitrary depth containing globs as strings or a single glob as a string. |

<a name="module_GulpSwallower..registerNamedGlobSet"></a>

### GulpSwallower~registerNamedGlobSet(namedGlobSet)
Register named glob sets.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| namedGlobSet | <code>namedGlobSet</code> | Named Glob Set. |

<a name="module_GulpSwallower..registerNamedGlobSets"></a>

### GulpSwallower~registerNamedGlobSets(namedGlobSets)
Register named glob sets.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| namedGlobSets | <code>Array.&lt;namedGlobSet&gt;</code> | Array of named glob sets. |

<a name="module_GulpSwallower..extendGlobSet"></a>

### GulpSwallower~extendGlobSet(globSetId, newGlobSet)
Concatenate a glob set onto a registered glob set. If the glob set doesn't already exist, create it.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Future**: Add ability to remove globs from globSets.  

| Param | Type | Description |
| --- | --- | --- |
| globSetId | <code>string</code> | Name of glob set. |
| newGlobSet | <code>Array.&lt;(Array\|string)&gt;</code> \| <code>string</code> | Multi-dimensional array of arbitrary depth containing globs as strings or a single glob as a string. |

<a name="module_GulpSwallower..getGlobSet"></a>

### GulpSwallower~getGlobSet(globSetId) ⇒ <code>Array</code> \| <code>undefined</code>
Get array of globs from a registered glob set.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Returns**: <code>Array</code> \| <code>undefined</code> - Glob set or undefined if the glob set hasn't been registered.  
**Future**: Deal with mutability.  

| Param | Type | Description |
| --- | --- | --- |
| globSetId | <code>string</code> | Name of glob set. |

<a name="module_GulpSwallower..registerPlugin"></a>

### GulpSwallower~registerPlugin(SwallowerPlugin, [pluginOptions])
Register Gulp Swallower plugin.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| SwallowerPlugin | <code>SwallowerPlugin</code> | Gulp Swallower plugin: A ES6 class or ES5 class constructor function. |
| [pluginOptions] | <code>object</code> | Data object passed to the plugin. |

<a name="module_GulpSwallower..run"></a>

### GulpSwallower~run([errorCb])
Run plugins and register tasks with Gulp.

**Kind**: inner method of [<code>GulpSwallower</code>](#module_GulpSwallower)  

| Param | Type | Description |
| --- | --- | --- |
| [errorCb] | <code>genericErrorCb</code> | Error callback. |

<a name="module_GulpSwallower..taskTemplate"></a>

### GulpSwallower~taskTemplate ⇒ <code>function</code>
Interface for taskTemplate functions.Renders a built in template to a Gulp Task function.

**Kind**: inner typedef of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Returns**: <code>function</code> - Task function to be registered with Gulp.  

| Param | Type | Description |
| --- | --- | --- |
| globSetGetter. | [<code>GlobSetGetter</code>](#module_GlobSetGetter) | Glob sets registered with Gulp Swallower must be accessed through globSetGetter. 		Glob sets will be unavailable until all glob sets have been finalized and [module:GulpSwallower#run](module:GulpSwallower#run) has been called. |
| [options] | <code>object</code> | Options passed from caller. |

<a name="module_GulpSwallower..taskDefinition"></a>

### GulpSwallower~taskDefinition : <code>Object</code>
Interface for taskDefinition objects.Provides name and options for a [taskTemplate](module:GulpSwallower#taskTemplate).

**Kind**: inner typedef of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Task Name. |
| [options] | <code>object</code> | Options passed to taskTemplate. |

<a name="module_GulpSwallower..taskDefinitionConstructor"></a>

### GulpSwallower~taskDefinitionConstructor ⇒ <code>Array.&lt;taskDefinition&gt;</code> \| <code>taskDefinition</code>
Interface for taskDefinitionConstructor functions.Provides taskDefinitions for a [taskDefinition](module:GulpSwallower#taskDefinition)

**Kind**: inner typedef of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Returns**: <code>Array.&lt;taskDefinition&gt;</code> \| <code>taskDefinition</code> - Returns an array of taskDefinitions or a single taskDefinition.  

| Param | Type | Description |
| --- | --- | --- |
| taskDefinitionOptions | <code>object</code> | Options passed from caller. |

<a name="module_GulpSwallower..namedGlobSet"></a>

### GulpSwallower~namedGlobSet : <code>Object</code>
Interface for namedGlobSet objects.Object providing name and globs for easy consumption by functions.

**Kind**: inner typedef of [<code>GulpSwallower</code>](#module_GulpSwallower)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Glob Set Name. |
| globSet | <code>Array.&lt;string&gt;</code> | Array of glob strings. |

<a name="module_GulpSwallower..genericErrorCb"></a>

### GulpSwallower~genericErrorCb : <code>function</code>
Error callback without arguments.

**Kind**: inner typedef of [<code>GulpSwallower</code>](#module_GulpSwallower)  
<a name="module_GlobSetGetter"></a>

## GlobSetGetter : <code>function</code>
Provides Gulp Swallower task templates with access to globs.Wraps GulpSwallower.getGlobSetPrevents access to globs until they have been fully composed.


| Param | Type | Description |
| --- | --- | --- |
| gulpSwallower | <code>GulpSwallower</code> | Gulp Swallower. |


* [GlobSetGetter](#module_GlobSetGetter) : <code>function</code>
    * [~getGlobSet(globSetId)](#module_GlobSetGetter..getGlobSet) ⇒ <code>Array</code> \| <code>undefined</code>
    * [~getState()](#module_GlobSetGetter..getState) ⇒ <code>boolean</code>
    * [~ready()](#module_GlobSetGetter..ready)

<a name="module_GlobSetGetter..getGlobSet"></a>

### GlobSetGetter~getGlobSet(globSetId) ⇒ <code>Array</code> \| <code>undefined</code>
Get glob set from Gulp Swallower.

**Kind**: inner method of [<code>GlobSetGetter</code>](#module_GlobSetGetter)  
**Returns**: <code>Array</code> \| <code>undefined</code> - glob set or undefined if this.ready hasn't been called.  

| Param | Type | Description |
| --- | --- | --- |
| globSetId | <code>string</code> | Name of glob set. |

<a name="module_GlobSetGetter..getState"></a>

### GlobSetGetter~getState() ⇒ <code>boolean</code>
Get ready state.

**Kind**: inner method of [<code>GlobSetGetter</code>](#module_GlobSetGetter)  
**Returns**: <code>boolean</code> - ready state.  
<a name="module_GlobSetGetter..ready"></a>

### GlobSetGetter~ready()
Set ready state to true.Signals that globs are ready for use.

**Kind**: inner method of [<code>GlobSetGetter</code>](#module_GlobSetGetter)  
