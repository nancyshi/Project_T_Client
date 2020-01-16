"use strict";
cc._RF.push(module, '26886qZG21CFKSkgIvhUSHl', 'networkMgr');
// scripts/libs/networkMgr.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Networkmgr = cc.Class({

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},

    sendMessage: function sendMessage(msg, port, ip, suffix, successCallBack) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                successCallBack(xhr);
            }
        };
        var url = "http://" + ip + ":" + port.toString() + "/" + suffix.toString();
        xhr.open("POST", url);
        xhr.send(msg);
    },
    makeMessageObj: function makeMessageObj(moduleName, messageTypeName) {
        var gloableConfig = require("gloableConfig");

        var netWorkMessageConfigs = gloableConfig.netWorkMessageConfigs;
        var moduleObj = netWorkMessageConfigs[moduleName];

        if (moduleObj != null) {
            var ip = gloableConfig.basicIp;
            var port = gloableConfig.basicPort;
            if (moduleObj.ip != null) {
                ip = moduleObj.ip;
            }
            if (moduleObj.port != null) {
                port = moduleObj.port;
            }

            var suffix = moduleObj.suffix;

            var message = moduleObj[messageTypeName];
            var successCallBack = function successCallBack(xhr) {};
            var obj = {
                ip: ip,
                port: port,
                suffix: suffix,
                message: message,
                successCallBack: successCallBack
            };
            return obj;
        } else {
            cc.error("no such module name of " + moduleName);
            return null;
        }
    },
    sendMessageByMsgObj: function sendMessageByMsgObj(msgObj) {
        var url = "http://" + msgObj.ip + ":" + msgObj.port.toString() + "/" + msgObj.suffix;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                msgObj.successCallBack(xhr);
            }
        };
        xhr.open("POST", url);
        var msgForSend = JSON.stringify(msgObj.message);
        xhr.send(msgForSend);
    }
});

var sharedMgr = new Networkmgr();
module.exports = sharedMgr;

cc._RF.pop();