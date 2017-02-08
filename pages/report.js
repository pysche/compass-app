'use strict';

let lib = require('../library/library.js');
let app = getApp();
Page({
    data: {
    },
    report: {
        forehead: {},
        crowsfeet: {},
        undereye: {},
        cheek: {},
        nasolabial_mouth: {}
    },
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

                    let best = '', worst, min = 1, max = 0;
                    for (let i in $data.zones) {
                        let zone = $data.zones[i].valueOf();
                        let id = zone.zone;
                        let width = parseInt(zone.weight*100)*4;

                        if (min>zone.weight) {
                            best = id;
                            min = zone.weight;
                        }

                        if (max<zone.weight) {
                            worst = id;
                            max = zone.weight;
                        }

                        zone.width = width;
                        zone.best = false;
                        zone.worst = false;

                        switch (zone.zone) {
                            case 'nasolabial_mouth':
                                zone.name = 'Mouth';
                                break;
                            case 'undereye':
                                zone.name = 'Under Eye';
                                break;
                            case 'cheek':
                                zone.name = 'Cheek';
                                break;
                            case 'crowsfeet':
                                zone.name = 'Crow\'s Feet';
                                break;
                            case 'forehead':
                                zone.name = 'Forehead';
                                break;
                        }

                        $this.report[id] = zone;
                    }

                    $this.report[best].best = true;
                    $this.report[worst].worst = true;

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
