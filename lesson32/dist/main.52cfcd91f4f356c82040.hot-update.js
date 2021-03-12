/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3d_glo"]("main",{

/***/ "./src/plugins/sliderCarousel.js":
/*!***************************************!*\
  !*** ./src/plugins/sliderCarousel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar SliderCarousel = /*#__PURE__*/function () {\n  // пользователь обязательно должен передать эти настройки\n  // их достаточно, чтобы слайдер уже работал\n  // использовали деструктцризацию\n  function SliderCarousel(_ref) {\n    var main = _ref.main,\n        wrap = _ref.wrap,\n        next = _ref.next,\n        prev = _ref.prev,\n        _ref$infinity = _ref.infinity,\n        infinity = _ref$infinity === void 0 ? false : _ref$infinity,\n        _ref$position = _ref.position,\n        position = _ref$position === void 0 ? 0 : _ref$position,\n        _ref$slidesToShow = _ref.slidesToShow,\n        slidesToShow = _ref$slidesToShow === void 0 ? 3 : _ref$slidesToShow,\n        _ref$responsive = _ref.responsive,\n        responsive = _ref$responsive === void 0 ? [] : _ref$responsive;\n\n    _classCallCheck(this, SliderCarousel);\n\n    if (!main || !wrap) {\n      console.warn('slider-carousel: Необходимо два селектора: \"main\" и \"wrap\"!');\n    } // ищем на странице то, что передал пользователь\n    // обертка всего блока слайдера, где слайды, кнопки\n\n\n    this.main = document.querySelector(main); // обертка самого слайдера\n\n    this.wrap = document.querySelector(wrap); // обертка каждого слайда\n\n    this.slides = document.querySelector(wrap).children; // стрелки слайдера\n\n    this.next = document.querySelector(next);\n    this.prev = document.querySelector(prev);\n    this.slidesToShow = slidesToShow;\n    this.options = {\n      // с какой позиции (какого слайда начинается слайдер)\n      position: position,\n      infinity: infinity,\n      // чтобы регулировать ширину слайдов в стилях\n      slideWidth: Math.floor(100 / this.slidesToShow),\n      maxPosition: this.slides.length - this.slidesToShow\n    };\n    this.responsive = responsive;\n  }\n\n  _createClass(SliderCarousel, [{\n    key: \"init\",\n    value: function init() {\n      console.log('initialized');\n      this.addGloClasses();\n      this.addStyles(); // если кнопки-стрелки были переданы пользователем\n\n      if (this.prev && this.next) {\n        this.controlSlider(); // если поьзователь не передал, то мы добавляем свои\n      } else {\n        this.addArrows();\n      }\n\n      if (this.responsive) {\n        this.responsiveInit();\n      }\n    } // должны добавить свои стили слайдера, а не переписать\n\n  }, {\n    key: \"addGloClasses\",\n    value: function addGloClasses() {\n      this.main.classList.add('glo-slider');\n      this.wrap.classList.add('glo-slider__wrap');\n\n      var _iterator = _createForOfIteratorHelper(this.slides),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var item = _step.value;\n          item.classList.add('glo-slider__item');\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    } // прописываем свои стили (или можно через css-документ добпвлять)\n\n  }, {\n    key: \"addStyles\",\n    value: function addStyles() {\n      var style = document.getElementById('sliderCarousel-style');\n\n      if (!style) {\n        // создаем элемент тольк если его нет\n        style = document.createElement('style');\n        style.id = 'sliderCarousel-style';\n      } // will-change - предупредить браузер, что какое-то свойство будет меняться\n\n\n      style.textContent = \"\\n            .glo-slider{\\n                overflow: hidden;\\n                position: relative;\\n            }\\n            .glo-slider__wrap{\\n                display: flex;\\n                transition: transform .3s;\\n                will-change: transform;\\n                \\n            }\\n            .glo-slider__item{\\n                flex: 0 0 \".concat(this.options.slideWidth, \"% !important;\\n                margin: auto 0 !important;\\n                display: flex !important;\\n                align-items: center;\\n                justify-content: center;\\n            }\\n            .glo-slider__prev,\\n            .glo-slider__next {\\n                top: 50%;\\n                transform: translateY(-50%);\\n                position: absolute;\\n                margin: 0 10px;\\n                border: 20px solid transparent;\\n                background: transparent;\\n            }\\n            .glo-slider__next{\\n                right: 0;\\n                border-left-color: #19b5fe;\\n            }\\n            .glo-slider__prev{\\n                left: 0;\\n                border-right-color: #19b5fe;\\n            }\\n            .glo-slider__prev:hover, \\n            .glo-slider__next:hover, \\n            .glo-slider__next:focus, \\n            .glo-slider__prev:focus{\\n                background: transparent;\\n                outline: transparent;\\n            }\\n        \");\n      document.head.append(style);\n    }\n  }, {\n    key: \"controlSlider\",\n    value: function controlSlider() {\n      // биндим объект, потому что по умолчанию this - это кнопки\n      // можно переписать функцию на стрелочную, тогда не нужно биндить\n      this.prev.addEventListener('click', this.prevSlider.bind(this));\n      this.next.addEventListener('click', this.nextSlider.bind(this));\n    }\n  }, {\n    key: \"prevSlider\",\n    value: function prevSlider() {\n      if (this.options.infinity || this.options.position > 0) {\n        --this.options.position;\n\n        if (this.options.position < 0) {\n          this.options.position = this.options.maxPosition;\n        }\n\n        this.wrap.style.transform = \"translateX(-\".concat(this.options.position * this.options.slideWidth, \"%)\");\n      }\n    }\n  }, {\n    key: \"nextSlider\",\n    value: function nextSlider() {\n      if (this.options.infinity || this.options.position < this.options.maxPosition) {\n        ++this.options.position;\n\n        if (this.options.position > this.options.maxPosition) {\n          this.options.position = 0;\n        }\n\n        this.wrap.style.transform = \"translateX(-\".concat(this.options.position * this.options.slideWidth, \"%)\");\n      }\n    }\n  }, {\n    key: \"addArrows\",\n    value: function addArrows() {\n      this.prev = document.createElement('button');\n      this.next = document.createElement('button');\n      this.prev.className = 'glo-slider__prev';\n      this.next.className = 'glo-slider__next';\n      this.main.append(this.prev, this.next);\n      this.controlSlider();\n    }\n  }, {\n    key: \"responsiveInit\",\n    value: function responsiveInit() {\n      var _this = this;\n\n      var slidesToShowDefault = this.slidesToShow; // получаю в массив все значения брейкпоинтов\n\n      var allResponses = this.responsive.map(function (item) {\n        return item.breakpoint;\n      }); // получаем максимальное разрешение\n\n      var maxResponsive = Math.max.apply(Math, _toConsumableArray(allResponses));\n\n      var checkResponse = function checkResponse() {\n        // получаем пользовательскую ширину экрана\n        var widthWindow = document.documentElement.clientWidth;\n\n        if (widthWindow < maxResponsive) {\n          for (var i = 0; i < allResponses.length; i++) {\n            if (widthWindow < allResponses[i]) {\n              _this.slidesToShow = _this.responsive[i].slideToShow;\n              _this.options.slideWidth = Math.floor(100 / _this.slidesToShow);\n\n              _this.addStyles();\n            } else {\n              _this.slidesToShow = slidesToShowDefault;\n              _this.options.slideWidth = Math.floor(100 / _this.slidesToShow);\n\n              _this.addStyles();\n            }\n          }\n        }\n      };\n\n      checkResponse();\n      window.addEventListener('resize', checkResponse);\n    }\n  }]);\n\n  return SliderCarousel;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SliderCarousel);\n\n//# sourceURL=webpack://3d-glo/./src/plugins/sliderCarousel.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("f6e398976180ebf28e1c")
/******/ 	})();
/******/ 	
/******/ }
);