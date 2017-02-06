'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        console.log('Page upload loaded');

        app.getUserInfo(() => {

        });
    },
    eventTakeAPhoto: function () {
        console.log("GOGOGO");
    }
});
