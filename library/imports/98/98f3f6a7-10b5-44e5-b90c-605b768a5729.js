"use strict";
cc._RF.push(module, '98f3fanELVE5bkMYFt2ilcp', 'temp');
// scripts/towerDefens/temp.js

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
        this.node.on("touchstart", this.onTouchBegan, this);
    },
    start: function start() {},
    onTouchBegan: function onTouchBegan(event) {
        var towerAreaMgr = this.node.parent.parent.getComponent("towerAreaMgr");
        if (towerAreaMgr.buildUI != null) {
            towerAreaMgr.removeUI();
        }
    },
    onDestroy: function onDestroy() {
        this.node.off("touchstart", this.onTouchBegan, this);
    }

    // update (dt) {},

});

cc._RF.pop();