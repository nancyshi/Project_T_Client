"use strict";
cc._RF.push(module, '1552bGIYiVCypKdQfaxDM3E', 'loginMgr');
// scripts/loginMgr.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var LoginType = {
    ACCOUNT: 1,
    WE_CHAT_GAME: 2,
    DEVICE_ID: 3
};

cc.Class({
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        playerId: {
            get: function get() {
                return this._playerId;
            },
            set: function set(value) {
                this._playerId = value;
                if (value) {
                    this.onPlayerIdSet();
                }
            }
        }

    },

    /**
     * 
     * @param {LoginType} loginType 
     */
    login: function login(loginType) {
        this._getPlayerId(loginType);
    },
    onPlayerIdSet: function onPlayerIdSet() {
        this.updatePlayerData(this.playerId);
    },
    updatePlayerData: function updatePlayerData(playerId) {
        var dataMgr = require("dataMgr");
        dataMgr.updatePlayerData(playerId);
    },
    _genarateUUID: function _genarateUUID() {
        var time = cc.sys.now();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        uuid = uuid + time.toString();
        return uuid;
    },


    /**
     * 
     * @param {LoginType} loginType 
     */
    _getPlayerId: function _getPlayerId(loginType) {
        var message = null;
        switch (loginType) {
            case LoginType.ACCOUNT:
                break;
            case LoginType.WE_CHAT_GAME:
                break;
            case LoginType.DEVICE_ID:
                var deviceId = cc.sys.localStorage.getItem("deviceId");
                if (deviceId == null) {
                    var uuid = this._genarateUUID();
                    cc.sys.localStorage.setItem("deviceId", uuid);
                    deviceId = uuid;
                }
                message = {
                    "code": deviceId,
                    "codeType": LoginType.DEVICE_ID
                };
                break;
            default:
                cc.log("Login type erro: now it's " + loginType);
        }
        if (message) {
            var networkMgr = require("networkMgr");
            var self = this;
            cc.loader.loadRes("configs/serverConfig", function (err, res) {
                var port = res.json[0].port;
                var ip = res.json[0].ip;
                var suffix = "login";
                message = JSON.stringify(message);
                networkMgr.sendMessage(message, port, ip, suffix, function (xhr) {
                    var response = xhr.responseText;
                    response = JSON.parse(response);
                    if (response.type == "login_success") {
                        var playerId = response.playerId;
                        self.playerId = playerId;
                    } else if (response.type == "login_fail") {}
                });
            });
        }
    }
});

cc._RF.pop();