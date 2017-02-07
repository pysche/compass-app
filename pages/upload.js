'use strict';

let lib = require('../library/library.js');
let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        lib.log('Page upload loaded');

        app.getUserInfo(() => {

        });
    },
    eventTakeAPhoto: function () {
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['camera'],
            success: function (res) {
                let file = res.tempFilePaths[0];
                app.data.photo = file;

                wx.showToast({
                    title: 'Uploading ...',
                    icon: 'loading',
                    duration: 10000,
                    mask: true
                });

                setTimeout(() => {
                    wx.navigateTo({
                        url: 'report'
                    });
                }, 5000);

                /*
                wx.uploadFile({
                    url: app.config.api+'index.php?m=Api&c=App&a=uploadimage',
                    filePath: file,
                    name: 'photo',
                    formData: {},
                    success: function (res) {

                    }
                });*/
                lib.log(file)
            }
        });
    }
});
