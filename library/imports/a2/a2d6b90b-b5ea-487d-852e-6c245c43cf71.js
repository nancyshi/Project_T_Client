"use strict";
cc._RF.push(module, 'a2d6bkLtepIfYUubCRcQ89x', 'towerAreaMgr');
// scripts/towerDefens/towerAreaMgr.js

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
        buildUIPrefab: cc.Prefab,
        isUIShowed: false,
        buildUI: {
            get: function get() {
                return this._buildUI;
            },
            set: function set(value) {
                this._buildUI = value;
                if (value == null) {
                    return;
                }
                this.setupButtons();
            }
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},
    onClick: function onClick() {
        if (this.buildUI != null) {
            return;
        }
        var uiNode = cc.instantiate(this.buildUIPrefab);
        this.buildUI = uiNode;
        uiNode.scale = 0;
        this.node.addChild(uiNode);
        cc.tween(uiNode).to(0.2, { scale: 1 }).start();
    },
    removeUI: function removeUI() {
        if (this.buildUI == null) {
            return;
        }
        var self = this;
        cc.tween(this.buildUI).to(0.2, { scale: 0 }).call(function () {
            self.buildUI.removeFromParent();
            self.buildUI = null;
        }).start();
    },
    setupButtons: function setupButtons() {
        var children = this.buildUI.children;
        var buttons = [];
        for (var index in children) {
            var childNode = children[index];
            cc.log(childNode.name);
            if (childNode.getComponent(cc.Button) != null) {
                buttons.push(childNode);
            }
        }
        for (var index in buttons) {
            var oneButton = buttons[index];
            oneButton.name = index.toString();
            oneButton.on("click", this.onButtonClick, this);
        }
    },
    onButtonClick: function onButtonClick(button) {
        this.removeUI();
        var buttonIndex = parseInt(button.node.name);
        var towerPrefab = cc.find("Canvas/gameMgrNode").getComponent("gameMgr").testTowerPrefab;
        var tower = cc.instantiate(towerPrefab);
        tower.x = this.node.x;
        tower.y = this.node.y;
        cc.find("Canvas").addChild(tower);
        this.node.removeFromParent();
    }
});

cc._RF.pop();