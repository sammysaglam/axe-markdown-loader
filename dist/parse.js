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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var frontMatter = __webpack_require__(1);
var Remarkable = __webpack_require__(2);
var md = new Remarkable({ xhtmlOut: true });

var renderFenceBlock = function renderFenceBlock(tokens, idx) {

	var options = tokens[idx].params.split(/\s+/g);
	var language = options[0];

	var languageAbbreviations = {
		js: 'javascript',
		css: 'scss',
		md: 'markdown'
	};

	var languageName = languageAbbreviations[language] ? languageAbbreviations[language] : language;

	var sourceCode = tokens[idx].content;

	var sourceCodeWithTemplateStringInjectionEnabled = sourceCode.replace(/\$\{/g, '\\\${').replace(/([^\\]|^)\#{/g, '$1${');
	var sourceCodeCustomFenceBlocksReplaced = languageName === "markdown" ? sourceCodeWithTemplateStringInjectionEnabled.replace(/~~~/g, '\\`\\`\\`') : sourceCodeWithTemplateStringInjectionEnabled;
	var processedSourceCode = sourceCodeCustomFenceBlocksReplaced;

	var isRenderableLanguage = languageName === 'html' || languageName === 'jsx' || languageName === 'css' || languageName === 'scss' || languageName === 'markdown' || languageName === 'javascript';

	// get render settings
	var showSource = options.includes('show-source') || !isRenderableLanguage;
	var hideRender = options.includes('no-render') || !isRenderableLanguage;
	var hideLineNumbers = options.includes('no-line-numbers');

	return '\n\t\t<div\n\t\t\tclassName={[\n\t\t\t\t"axe-markdown__render",\n\t\t\t\t"axe-markdown__render--lang-' + languageName + '",\n\t\t\t\t' + (showSource ? '"axe-markdown__render--with-source"' : 'null') + '\n\t\t\t\t\n\t\t\t].filter(className => className).join(\' \')}\n\t\t>\n\t\t\t<ExampleRenderer\n\t\t\t\tinitialSource={`' + processedSourceCode + '`}\n\t\t\t\tlanguageName="' + languageName + '"\n\t\t\t\tshowSource={' + showSource + '}\n\t\t\t\tparentMarkdownId={id}\n\t\t\t\thideLineNumbers={' + hideLineNumbers + '}\n\t\t\t\tupdateLineNumbers={updateLineNumbers}\n\t\t\t\thideRender={' + hideRender + '}\n\t\t\t/>\n\t\t</div>\n\t';
};

md.renderer.rules.fence_custom.bash = renderFenceBlock;
md.renderer.rules.fence_custom.json = renderFenceBlock;
md.renderer.rules.fence_custom.html = renderFenceBlock;
md.renderer.rules.fence_custom.jsx = renderFenceBlock;
md.renderer.rules.fence_custom.javascript = renderFenceBlock;
md.renderer.rules.fence_custom.js = renderFenceBlock;
md.renderer.rules.fence_custom.css = renderFenceBlock;
md.renderer.rules.fence_custom.scss = renderFenceBlock;
md.renderer.rules.fence_custom.md = renderFenceBlock;
md.renderer.rules.fence_custom.markdown = renderFenceBlock;
md.renderer.rules.fence_custom.php = renderFenceBlock;

module.exports = {
	parse: function parse(markdownRaw) {
		return new Promise(function (resolve, reject) {

			var markdown = frontMatter(markdownRaw.replace(/\t/g, '   '));

			try {
				var jsx = md.render(markdown.body);
				return resolve({
					jsx: jsx,
					attributes: markdown.attributes
				});
			} catch (err) {
				return reject(err);
			}
		});
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("front-matter");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("remarkable");

/***/ })
/******/ ])));