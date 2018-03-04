(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var path = __webpack_require__(5);

var reduce = __webpack_require__(7);

var moduleImports = 'import React from \'react\';\nimport ReactDOM from \'react-dom\';\n\nimport \'prismjs\';\nimport \'prismjs/components/prism-jsx\';\nimport \'prismjs/components/prism-bash\';\nimport \'prismjs/components/prism-scss\';\nimport \'prismjs/components/prism-php\';\nimport \'prismjs/components/prism-markdown\';\n\nconst Remarkable = require(\'remarkable\');\nconst md = new Remarkable({ xhtmlOut: true });\n\nconst highlightFenceBlock = (tokens, idx) => {\n\n\tconst options = tokens[idx].params.split(/\\s+/g);\n\tconst language = options[0];\n\n\tconst { content } = tokens[idx];\n\n\tconst prismLanguagesConverter = {\n\t\tjs: \'javascript\'\n\t};\n\n\treturn `<pre class="language-${language}"><code>${Prism.highlight(content, Prism.languages[language])}</code></pre>`;\n\n};\n\nmd.renderer.rules.fence_custom.bash = highlightFenceBlock;\nmd.renderer.rules.fence_custom.json = highlightFenceBlock;\nmd.renderer.rules.fence_custom.html = highlightFenceBlock;\nmd.renderer.rules.fence_custom.jsx = highlightFenceBlock;\nmd.renderer.rules.fence_custom.javascript = highlightFenceBlock;\nmd.renderer.rules.fence_custom.js = highlightFenceBlock;\nmd.renderer.rules.fence_custom.css = highlightFenceBlock;\nmd.renderer.rules.fence_custom.scss = highlightFenceBlock;' + '\n\n';
var Component = 'export default class MarkdownComponent extends React.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\n\t\tthis.addLineNumbers = this.addLineNumbers.bind(this);\n\t}\n\n\tcomponentDidMount() {\n\t\twindow.addEventListener(\'resize\', this.addLineNumbers);\n\t\tthis.addLineNumbers();\n\t}\n\n\tcomponentWillUnmout() {\n\t\twindow.removeEventListener(\'resize\', this.addLineNumbers);\n\t}\n\n\tcomponentDidUpdate() {\n\t\tthis.addLineNumbers();\n\t}\n\n\taddLineNumbers() {\n\n\t\tsetTimeout(() => {\n\n\t\t\tif ( !this.rootElement ) return false;\n\n\t\t\tconst NEW_LINE_EXP = /\\n(?!$)/g;\n\n\t\t\tconst elements = [...this.rootElement.querySelectorAll(\'.axe-markdown__render-source--with-line-numbers\')];\n\n\t\t\telements.forEach(element => {\n\n\t\t\t\tconst lines = element.textContent.split(NEW_LINE_EXP);\n\t\t\t\tconst lineCount = (lines.length + 1) || 0;\n\n\t\t\t\tconst newLineNumbersWrapper = document.createElement(\'span\');\n\t\t\t\tnewLineNumbersWrapper.setAttribute(\'aria-hidden\', \'true\');\n\t\t\t\tnewLineNumbersWrapper.className = \'line-numbers-rows\';\n\t\t\t\tnewLineNumbersWrapper.innerHTML = new Array(lineCount).join(\'<span></span>\');\n\n\t\t\t\tif (element.querySelectorAll(\'.line-numbers-rows\').length === 0) {\n\t\t\t\t\telement.getElementsByTagName(\'code\')[0].appendChild(newLineNumbersWrapper);\n\t\t\t\t}\n\n\t\t\t\tconst lineNumbersWrapper = element.querySelector(\'.line-numbers-rows\');\n\n\t\t\t\tif (element.querySelectorAll(\'.line-numbers-sizer\').length === 0) {\n\t\t\t\t\tconst newLineNumberSizer = document.createElement(\'span\');\n\t\t\t\t\tnewLineNumberSizer.className = \'line-numbers-sizer\';\n\t\t\t\t\telement.getElementsByTagName(\'code\')[0].appendChild(newLineNumberSizer);\n\t\t\t\t}\n\n\t\t\t\tconst lineNumberSizer = element.querySelector(\'.line-numbers-sizer\');\n\t\t\t\tlineNumberSizer.style.display = \'block\';\n\n\t\t\t\tlines.forEach((line, lineNumber) => {\n\n\t\t\t\t\tlineNumberSizer.textContent = line || \'\\n\';\n\t\t\t\t\tconst lineSize = lineNumberSizer.getBoundingClientRect().height;\n\n\t\t\t\t\tlineNumbersWrapper.children[lineNumber].style.height = lineSize + \'px\';\n\t\t\t\t});\n\n\t\t\t\tlineNumberSizer.textContent = \'\';\n\t\t\t\tlineNumberSizer.style.display = \'none\';\n\t\t\t});\n\t\t}, 1);\n\t}\n\n\trender() {\n\t\tconst props = this.props;\n\n\t\treturn (\n\t\t\t<div className="axe-markdown" ref={rootElement => this.rootElement = rootElement}>\n\t\t\t\t[__GET_MARKDOWN_JSX__]\n\t\t\t</div>\n\t\t);\n\t}\n}' + '\n\n';
var HtmlStyleTag = 'class HtmlStyleTag extends React.Component {\n\trender() {\n\n\t\tconst {content} = this.props;\n\n\t\treturn ReactDOM.createPortal(\n\t\t\t<style dangerouslySetInnerHTML={{__html:content}}/> ,\n\t\t\tdocument.head\n\t\t);\n\t}\n}' + '\n\n';

var destructureNonDefaultImports = function destructureNonDefaultImports(imports) {
	return imports.replace(/({[^}]+})/g, '...($1)');
};
var aliasImports = function aliasImports(imports) {
	return imports.replace(/[^,{]+as\s+([^\s]+)/g, ' $1');
};

module.exports = {
	buildComponent: function buildComponent(component) {
		var _component$attributes = component.attributes,
		    imports = _component$attributes.imports,
		    attributes = _objectWithoutProperties(_component$attributes, ['imports']);

		var userImportsString = reduce(imports, function (concatenated, packageName, moduleName) {
			return concatenated + ('import ' + moduleName + ' from \'' + packageName + '\';\n');
		}, '') + ('const importedComponents = {\n' + reduce(imports, function (concatenated, packageName, moduleName) {
			return concatenated + ('\t' + aliasImports(destructureNonDefaultImports(moduleName)) + ' ,\n');
		}, '') + '};');

		return moduleImports + userImportsString + Component.replace(/\[__GET_MARKDOWN_JSX__]/, component.jsx) + HtmlStyleTag;
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("reduce-object");

/***/ })
/******/ ])));