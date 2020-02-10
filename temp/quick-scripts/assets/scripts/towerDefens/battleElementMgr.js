(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/battleElementMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1cf0djjBotMpZz+ralkYaqI', 'battleElementMgr', __filename);
// scripts/towerDefens/battleElementMgr.js

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
        maxHp: 100,
        currentHp: {
            get: function get() {
                if (this._currentHp == null) {
                    this._currentHp = this.maxHp;
                }
                return this._currentHp;
            },
            set: function set(value) {
                this._currentHp = value;
            }
        },
        hurt: 100,
        attckRange: 300,
        hurtRange: -1,

        physicalDefense: 100,
        magicalDefense: 200,

        hpBar: cc.ProgressBar,
        isAutoHideHpBar: true,
        hpBarContinueTime: 3 //when on attack, the hp bar will auto appear, and last for this time , mesured by second
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    getHurt: function getHurt(hurtNum, hurtType) {
        if (hurtNum > 0) {
            //hurt flow
            var actureHurt = null;
            switch (hurtType) {
                case 1:
                    //physical
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.physicalDefense));
                    break;
                case 2:
                    //magical
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.magicalDefense));
                    break;
                default:
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.physicalDefense));
            }
            if (actureHurt) {
                this.currentHp -= actureHurt;
            } else {
                cc.console.error("NOT INVALID HURT NUM OF " + actureHurt);
            }
        } else if (hurtNum < 0) {
            //cure flow
            this.currentHp += hurtNum;
        }
    },
    getBuff: function getBuff(buffId) {}
    // update (dt) {},

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
        //# sourceMappingURL=battleElementMgr.js.map
        