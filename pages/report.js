'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        console.log('Page report loaded');

        app.getUserInfo(() => {

        });
    }
});
