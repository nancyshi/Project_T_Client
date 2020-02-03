"use strict";
cc._RF.push(module, '1bc728cb/JBe5ZV2jes0Jwu', 'director');
// scripts/towerDefens/director.js

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

cc.Class({
    extends: cc.Component,

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
    onClick: function onClick() {
        var self = this;
        cc.director.preloadScene("level_01", function () {}, function (err, res) {
            var Canvas = res.scene.children[0];
            var resNode = Canvas.getChildByName("resNode");
            var resMgr = resNode.getComponent("resMgr");
            resMgr.target = self;
            resMgr.loadNeededReses();
        });
    },
    onAllResesLoaded: function onAllResesLoaded() {
        cc.director.loadScene("level_01");
    }
    // update (dt) {},

});

cc._RF.pop();