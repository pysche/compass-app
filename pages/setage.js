'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        console.log('Page setage loaded');

        app.getUserInfo(() => {

        });
    },
    eventStart: function () {

    }
});
