(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/towerMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ff21eOFaElLXr6G/X3gFXv6', 'towerMgr', __filename);
// scripts/towerDefens/towerMgr.js

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
        hurt: 10,
        hurtDelta: 1, // mesured by second
        hurtRange: -1, // -1 indicate that the tower will attack only one enmy
        attackRange: 1000,
        monstors: null,
        canAttack: {
            get: function get() {
                if (this._canAttack == null) {
                    this._canAttack = true;
                }
                return this._canAttack;
            },
            set: function set(value) {
                this._canAttack = value;
                if (value == false) {
                    var self = this;
                    this.scheduleOnce(function () {
                        self._canAttack = true;
                    }, this.hurtDelta);
                }
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.monstors = cc.find("Canvas/mapNode").getComponent("mapMgr").monstors;
        this.attackRange = 300;
    },
    update: function update(dt) {
        if (this.canAttack == false) {
            return;
        }
        if (this.monstors != null && this.monstors.length > 0) {
            for (var index in this.monstors) {
                var oneMonstor = this.monstors[index];
                var dis = this.getDisOfTwoPoint(oneMonstor.position, this.node.position);
                if (dis <= this.attackRange) {
                    this.attackOneMonstor(oneMonstor);
                    break;
                }
            }
        }
    },
    getDisOfTwoPoint: function getDisOfTwoPoint(p1, p2) {
        var temp = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
        return Math.sqrt(temp);
    },
    attackOneMonstor: function attackOneMonstor(monstor) {
        this.canAttack = false;
        var monstorMgr = monstor.getComponent("monstorMgr");
        monstorMgr.getHurt(this.hurt);
    }
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
        //# sourceMappingURL=towerMgr.js.map
        