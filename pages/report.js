'use strict';

let lib = require('../library/library.js');
let app = getApp();
Page({
    data: {
    },
    report: {},
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
                    app_openid: app.data.openid
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
                        let id = zone.zone;
                        let width = parseInt(zone.weight*100)*4;

                        if (min>zone.weight) {
                            best = id;
                        }

                        $this.report[id] = zone;
                        $this.report[id].width = width;
                        $this.report[id].best = false;

                        switch (zone.zone) {
                            case 'nasolabial_mouth':
                                $this.report[zone.zone].name = 'Mouth';
                                break;
                            case 'undereye':
                                $this.report[zone.zone].name = 'Under Eye';
                                break;
                            case 'cheek':
                                $this.report[zone.zone].name = 'Cheek';
                                break;
                            case 'crowsfeet':
                                $this.report[zone.zone].name = 'Crow\'s Feet';
                                break;
                            case 'forehead':
                                $this.report[zone.zone].name = 'Forehead';
                                break;
                        }
                    }

                    $this.report[best].best = true;

                    $this.setData({
                        report: $this.report
                    });
                }
            });
        });
    },
    onShareAppMessage: function () {
        return app.config.share;
    },
    eventShowItemDetail: function (event) {
        let $this = this;
        let itemId = event.currentTarget.id.replace('item-', '');
        let reportItem = $this.report[itemId];
        console.log(reportItem);
    }
});
