/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3d_glo"]("main",{

/***/ "./src/modules/carousel.js":
/*!*********************************!*\
  !*** ./src/modules/carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _plugins_sliderCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/sliderCarousel */ \"./src/plugins/sliderCarousel.js\");\n\n\nvar carouselSlider = function carouselSlider() {\n  // сразу передаем параметры\n  var carousel = new _plugins_sliderCarousel__WEBPACK_IMPORTED_MODULE_0__.default({\n    main: '.companies-wrapper',\n    wrap: '.companies-hor',\n    prev: '#test-left',\n    next: '#test-right',\n    slidesToShow: 4,\n    infinity: true\n  });\n  carousel.init();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (carouselSlider);\n\n//# sourceURL=webpack://3d-glo/./src/modules/carousel.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("36c52f5af219711da074")
/******/ 	})();
/******/ 	
/******/ }
);