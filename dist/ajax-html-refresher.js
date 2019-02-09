/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AjaxRefresher.js":
/*!******************************!*\
  !*** ./src/AjaxRefresher.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass AjaxRefresher {\r\n    /**\r\n     * Create a new AjaxRefresher object.\r\n     * @param object The jQuery element bound to this object.\r\n     * @param options An object of options.\r\n     */\r\n    constructor(object, options) {\r\n        object.data('AjaxRefresher', this);\r\n\r\n        this.fresh = true;\r\n        this.running = true;\r\n        this.url = object.data('ar-url');\r\n        this.action = object.data('ar-action') || 'replace';\r\n        this.interval = object.data('ar-interval') || 1000; // 1 second default.\r\n        this.target = object;\r\n        this.setOptions(options);\r\n\r\n        this.start();\r\n    }\r\n\r\n    /**\r\n     * Sets the JavaScript options such as handlers and processors.\r\n     * @param options An object of options.\r\n     */\r\n    setOptions(options) {\r\n        if (typeof options === 'undefined') {\r\n            return;\r\n        }\r\n\r\n        this.processor = options.processor;\r\n        this.handler = options.handler;\r\n    }\r\n\r\n    /**\r\n     * Starts the fetching of data.\r\n     */\r\n    start() {\r\n        this.running = true;\r\n        this.fetchData();\r\n    }\r\n\r\n    /**\r\n     * Stops the fetching of data.\r\n     */\r\n    stop() {\r\n        this.running = false;\r\n    }\r\n\r\n    /**\r\n     * Starts fetching the data and setting an interval after the first execution.\r\n     */\r\n    fetchData() {\r\n        if (this.running) {\r\n            let self = this;\r\n\r\n            $.ajax({\r\n                url: self.url,\r\n                type: 'get',\r\n                dataType: 'html'\r\n            }).done(function (data) {\r\n                self.handleData(data);\r\n            });\r\n\r\n            setTimeout(this.fetchData.bind(this), this.interval);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Checks if user has defined processor or handler, otherwise acts as default.\r\n     * @param data The data retrieved from the request.\r\n     */\r\n    handleData(data) {\r\n        let $data = $(data);\r\n\r\n        // Let user processor alter data.\r\n        if (typeof this.processor !== 'undefined') {\r\n            this.processor($data);\r\n        }\r\n\r\n        // Place the data in the DOM.\r\n        if (typeof this.handler !== 'undefined') {\r\n            this.handler(this.target, $data, this.action);\r\n        } else {\r\n            this.placeData($data);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Place the HTML data in the DOM.\r\n     * @param $data The HTML element.\r\n     */\r\n    placeData($data) {\r\n        switch (this.action) {\r\n            case 'replace':\r\n                this.target.html($data);\r\n                break;\r\n            case 'append':\r\n                this.target.append($data);\r\n                break;\r\n            case 'prepend':\r\n                this.target.prepend($data);\r\n                break;\r\n            case 'replace-append':\r\n                if (this.fresh) {\r\n                    this.target.html($data);\r\n                    this.fresh = false;\r\n                } else {\r\n                    this.target.append($data);\r\n                }\r\n                break;\r\n            case 'replace-prepend':\r\n                if (this.fresh) {\r\n                    this.target.html($data);\r\n                    this.fresh = false;\r\n                } else {\r\n                    this.target.prepend($data);\r\n                }\r\n                break;\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AjaxRefresher);\n\n//# sourceURL=webpack:///./src/AjaxRefresher.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AjaxRefresher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AjaxRefresher */ \"./src/AjaxRefresher.js\");\n\r\n\r\n(function ($) {\r\n    /**\r\n     * jQuery plugin entrypoint.\r\n     * @param options\r\n     * @returns {*|jQuery}\r\n     * @constructor\r\n     */\r\n    $.fn.AjaxRefresher = function (options) {\r\n        return this.each(function () {\r\n            new _AjaxRefresher__WEBPACK_IMPORTED_MODULE_0__[\"default\"]($(this), options);\r\n        });\r\n    };\r\n}(jQuery));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });