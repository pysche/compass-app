'use strict';

let lib = require('../library/library.js');
let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        console.log('Page index loaded');

        app.getUserInfo(() => {

        });
    },
    eventStart: function () {

    },
    onShareAppMessage: function () {
        return app.config.share;
    }
});
