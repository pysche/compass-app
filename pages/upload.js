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

                wx.getImageInfo({
                    src: file,
                    success: function (res) {
                        wx.previewImage({
                            urls: [ file ],
                            success: function (res) {
                                console.log(res)
                            }
                        });
                    }
                });
                console.log(file)
            }
        });
    }
});
