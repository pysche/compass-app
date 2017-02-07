'use strict';

let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        let $this = this;

        console.log('Page report loaded');

        wx.showToast({
            title: 'Fetching report ...',
            icon: 'loading',
            duration: 10000,
            mask: true
        });

        app.getUserInfo(() => {
            let requestUri = app.config.api+'index.php?m=Api&c=App&a=getreport';
            console.log('fetch response from '+requestUri);

            wx.request({
                url: requestUri,
                data: {

                },
                success: function (res) {
                    wx.hideToast();

                    let $data = res.data;

                    $this.setData({
                        skinAge: $data.skinAge
                    });

                    for (let i in $data.zones) {
                        let zone = $data.zones[i];
                        let width = parseInt(zone.weight*100)*4;

                        switch (zone.zone) {
                            case 'nasolabial_mouth':
                                $this.setData({
                                    mouthWidth: width
                                });
                                break;
                            case 'undereye':
                                $this.setData({
                                    undereyeWidth: width
                                });
                                break;
                            case 'cheek':
                                $this.setData({
                                    cheekWidth: width
                                });
                                break;
                            case 'crowsfeet':
                                $this.setData({
                                    crowsfeetWidth: width
                                });
                                break;
                            case 'forehead':
                                $this.setData({
                                    foreheadWidth: width
                                });
                                break;
                        }
                    }
                }
            });
        });
    }
});
