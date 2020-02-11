(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/monstors/monstorMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88d66t+pX5E8YlRS1I2cmQj', 'monstorMgr', __filename);
// scripts/towerDefens/monstors/monstorMgr.js

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

        basePathPoints: [],
        state: {
            get: function get() {
                return this._state;
            },
            set: function set(value) {
                this._state = value;
                if (value == 1) {
                    var animComp = this.node.getComponent(cc.Animation);
                    animComp.play("walk");
                } else if (value == 2) {
                    this.onReachFinalTarget();
                } else if (value == 3) {}
            }
            //STATE ENUM
            //0 default , do nothing
            //1 go to target
            //2 reach final target
            //3 die
            //4 battle

        },

        moveSpeed: 100,
        vx: null,
        vy: null,
        targetIndex: 1,
        gameMgr: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.node.x = this.basePathPoints[0].x;
        this.node.y = this.basePathPoints[0].y;
        this.target = this.basePathPoints[this.targetIndex];
        var t = this.getDisOfTwoPoint(this.node.position, this.target) / this.moveSpeed;
        this.vx = (this.target.x - this.node.x) / t;
        this.vy = (this.target.y - this.node.y) / t;

        this.gameMgr = cc.find("Canvas/gameMgrNode").getComponent("gameMgr");
        this.state = 1;
    },
    update: function update(dt) {
        if (this.state == 1) {
            var nextX = this.node.x + this.vx * dt;
            var nextY = this.node.y + this.vy * dt;
            if (this.vx != 0) {
                if (nextX >= this.target.x && nextX > this.node.x || nextX <= this.target.x && nextX < this.node.x) {
                    nextX = this.target.x;
                    nextY = this.target.y;
                }
            } else {
                if (nextY >= this.target.y && nextY > this.node.y || nextY <= this.target.y && nextY < this.node.y) {
                    nextX = this.target.x;
                    nextY = this.target.y;
                }
            }
            this.node.x = nextX;
            this.node.y = nextY;

            if (nextX == this.target.x && nextY == this.target.y) {
                if (this.targetIndex + 1 < this.basePathPoints.length) {
                    this.targetIndex += 1;
                    this.target = this.basePathPoints[this.targetIndex];
                    var t = this.getDisOfTwoPoint(this.node.position, this.target) / this.moveSpeed;
                    this.vx = (this.target.x - this.node.x) / t;
                    this.vy = (this.target.y - this.node.y) / t;
                } else {
                    this.state = 2;
                }
            }
        }
    },
    calculatePathPoints: function calculatePathPoints() {},
    getDisOfTwoPoint: function getDisOfTwoPoint(p1, p2) {
        var temp = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
        return Math.sqrt(temp);
    },
    onReachFinalTarget: function onReachFinalTarget() {

        var temp = null;
        for (var index in this.gameMgr.alivedMonstors) {
            if (this.node == this.gameMgr.alivedMonstors[index]) {
                temp = index;
                break;
            }
        }
        if (temp != null) {
            this.gameMgr.alivedMonstors.splice(index, 1);
            this.gameMgr.alivedMonstorsNum = this.gameMgr.alivedMonstors.length;
        }
        this.node.removeFromParent();

        var heathMinusNum = 1;
        this.gameMgr.currentHp -= heathMinusNum;
    },
    onDie: function onDie() {
        this.state = 3;
        var temp = null;
        for (var index in this.gameMgr.alivedMonstors) {
            if (this.node == this.gameMgr.alivedMonstors[index]) {
                temp = index;
                break;
            }
        }
        if (temp != null) {
            this.gameMgr.alivedMonstors.splice(index, 1);
            this.gameMgr.alivedMonstorsNum = this.gameMgr.alivedMonstors.length;
        }

        var anime = this.node.getComponent(cc.Animation);
        var animState = anime.play("die");
        var duration = animState.duration;
        var self = this;
        cc.tween(this.node).delay(duration).call(function () {
            self.node.removeFromParent();
        }).start();
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
        //# sourceMappingURL=monstorMgr.js.map
        