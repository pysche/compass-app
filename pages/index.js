'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        app.getUserInfo(() => {

        });
    }
});
