"use strict";
cc._RF.push(module, 'f9e10BqBAJNxINwiSTSvJHD', 'canvasMgr');
// scripts/towerDefens/level/canvasMgr.js

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

    onLoad: function onLoad() {
        this.node.on("touchend", this.onTouchend, this);
    },
    start: function start() {},
    onTouchend: function onTouchend(event) {
        for (var index in this.node.children) {
            var oneNode = this.node.children[index];
            if (oneNode.getComponent("towerAreaMgr") != null) {
                oneNode.getComponent("towerAreaMgr").removeUI();
            } else if (oneNode.getComponent("towerMgr") != null) {
                oneNode.getComponent("towerMgr").removeTowerUI();
            }
        }
    },
    onDestroy: function onDestroy() {
        this.node.off("touchend", this.onTouchend, this);
    }
    // update (dt) {},

});

cc._RF.pop();