'use strict';

let lib = require('library/library.js');

/**
 *  global app javascript
 *
 */

App({
    data: {
        userInfo: null,
        openid: '',
        sessionKey: '',
        photo: '',
        device: {}
    },
    config: {
        api: 'https://wxazuretest.shenghuojia.com/',
        appRoot: '/pages/',
        module: 'kkk',
        share: {
            title: 'Olay SkinAdvisor',
            desc: 'RIGHT PRODUCTS. RIGHT IN THE PALM OF YOUR HAND.',
            path: '/pages/index'
        }
    },
    onLaunch: function () {
        let $this = this;
        lib.log('App Launched');

        try {
            wx.getSystemInfo({
                success: function (res) {
                    $this.data.device = res;
                }
            });
        } catch (e) {}
    },
    getUserInfo: function (callback) {
        let $this = this;

        if ($this.data.userInfo) {
            typeof callback === 'function' && callback();
        } else {
            wx.login({
                success: function (res) {
                    //  Get Wechat User's openid from api
                    let requestUri = $this.config.api+'index.php?m=Api&c=App&a=code';
                    lib.log('fetch response from '+requestUri);
                    wx.request({
                        url: requestUri,
                        data: {
                            jscode: res.code
                        },
                        success: function (res) {
                            lib.log('got response from '+requestUri+JSON.stringify(res));
                            let data = res.data;
                            let skey = data.session_key;
                            let openid = data.openid;

                            $this.config.sessionKey = skey;
                            $this.config.openid = openid;

                            //  Get Wechat UserInfo
                            wx.getUserInfo({
                                success: function (res) {
                                    $this.data.userInfo = res.userInfo;
                                    lib.log('got userinfo '+JSON.stringify(res.userInfo));

                                    typeof callback === 'function' && callback();
                                }
                            });
                        }
                    });
                }
            });
        }
    }
});
