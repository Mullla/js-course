'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImgs from './modules/changeImgs';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validation from './modules/validation';
import carousel from './modules/carousel';

    // timer
    countTimer('22 march 2021');

    // menu
    toggleMenu();

    // popup
    togglePopup();

    // tabs
    tabs();

    // slider
    slider();

    // change dataset-img
    changeImgs();

    validation();

    // калькулятор
    calc();

    //send ajax fetch
    sendForm();

    carousel();