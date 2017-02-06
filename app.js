'use strict';

/**
 *  global app javascript
 *
 */

App({
    data: {
        userInfo: null
    },
    onLaunch: function () {
        this.getUserInfo();
    },
    getUserInfo: function (callback) {
        let $this = this;

        if ($this.data.userInfo) {
            typeof callback === 'function' && callback();
        } else {
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            $this.data.userInfo = res.userInfo;
                            typeof callback === 'function' && callback();
                        }
                    });
                }
            });
        }
    }
});
