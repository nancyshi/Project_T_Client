(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/towers/buildTowerUIMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3afd3rudOFJQaUzP1UuM04l', 'buildTowerUIMgr', __filename);
// scripts/towerDefens/towers/buildTowerUIMgr.js

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
        buttonsConfig: null,
        btnPrefab: cc.Prefab,

        gameMgr: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.gameMgr = cc.find("Canvas/gameMgrNode").getComponent("gameMgr");
    },
    start: function start() {
        var enabledTowerIds = cc.find("Canvas/resNode").getComponent("resMgr").enabledTowerIds;
        for (var index in enabledTowerIds) {
            var towerId = enabledTowerIds[index];
            var btnIndex = parseInt(index) + 1;
            var btnName = "btn_0" + btnIndex.toString();

            var btn = this.node.getChildByName(btnName).getComponent(cc.Button);

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "buildTowerUIMgr";
            clickEventHandler.handler = "buildTower";
            clickEventHandler.customEventData = towerId;

            btn.clickEvents.push(clickEventHandler);
        }
    },
    buildTower: function buildTower(event, towerId) {
        var towerConfig = require("towerConfig");
        var oneTowerConfig = towerConfig[towerId.toString()];
        var towerLevel = 1; //for now use a fixed level
        var towerObj = oneTowerConfig[towerLevel.toString()];
        var buildExpand = towerObj.buildExpend;

        var currentResourceNum = this.gameMgr.resourceNum;
        if (buildExpand > currentResourceNum) {
            return;
        }

        this.gameMgr.resourceNum -= buildExpand;
        var resId = towerObj.resId;
        var prefab = cc.find("Canvas/resNode").getComponent("resMgr").reses[resId.toString()].prefabName;

        var tower = cc.instantiate(prefab);
        tower.x = this.node.parent.x;
        tower.y = this.node.parent.y;

        var towerMgr = tower.getComponent("towerMgr");
        towerMgr.hurt = towerObj.hurt;
        towerMgr.hurtType = towerObj.hurtType;
        towerMgr.hurtDelta = towerObj.hurtDelta;
        towerMgr.attackRange = towerObj.attackRange;
        towerMgr.hurtRange = towerObj.hurtRange;

        var parentNode = this.node.parent;
        this.node.parent.getComponent("towerAreaMgr").removeUI();

        cc.tween(window).delay(0.2).call(function () {
            parentNode.removeFromParent();
            cc.find("Canvas").addChild(tower);
        }).start();
    },
    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=buildTowerUIMgr.js.map
        