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
                console.log(file)
            }
        });
    }
});
