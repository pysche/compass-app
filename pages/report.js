'use strict';

let lib = require('../library/library.js');
let app = getApp();
Page({
    data: {},
    bindViewTap: function () {},
    onLoad: function () {
        let $this = this;

        lib.log('Page report loaded');

        wx.showToast({
            title: 'Fetching report ...',
            icon: 'loading',
            duration: 10000,
            mask: true
        });

        app.getUserInfo(() => {
            let requestUri = app.config.api+'index.php?m=Api&c=App&a=getreport';
            lib.log('fetch response from '+requestUri);

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

                    let best = '', min = 1;
                    for (let i in $data.zones) {
                        let zone = $data.zones[i];
                        let width = parseInt(zone.weight*100)*4;

                        if (min>zone.weight) {
                            best = zone.zone;
                        }

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

                    $this.setData({
                        mouthDisplay: 'none',
                        undereyeDisplay: 'none',
                        cheekDisplay: 'none',
                        crowsfeetDisplay: 'none',
                        foreheadDisplay: 'none'
                    });

                    //  set `Best Area`
                    switch (best) {
                        case 'nasolabial_mouth':
                            $this.setData({
                                mouthDisplay: 'auto'
                            });
                            break;
                        case 'undereye':
                            $this.setData({
                                undereyeDisplay: 'auto'
                            });
                            break;
                        case 'cheek':
                            $this.setData({
                                cheekDisplay: 'auto'
                            });
                            break;
                        case 'crowsfeet':
                            $this.setData({
                                crowsfeetDisplay: 'auto'
                            });
                            break;
                        case 'forehead':
                            $this.setData({
                                foreheadDisplay: 'auto'
                            });
                            break;
                    }
                }
            });
        });
    },
    onShareAppMessage: function () {
        return app.config.share;
    }
});
