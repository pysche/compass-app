'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        console.log('Page confirm loaded');

        app.getUserInfo(() => {

        });
    }
});
