"use strict";
cc._RF.push(module, '88d66t+pX5E8YlRS1I2cmQj', 'monstorMgr');
// scripts/towerDefens/monstorMgr.js

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
                if (value == 2) {
                    this.onReachFinalTarget();
                }
            }
            //STATE ENUM
            //0 default , do nothing
            //1 go to target
            //2 reach final target

        },
        health: 100,
        moveSpeed: 100,

        target: null,
        vx: null,
        vy: null,
        targetIndex: 1
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
    onReachFinalTarget: function onReachFinalTarget() {}
});

cc._RF.pop();