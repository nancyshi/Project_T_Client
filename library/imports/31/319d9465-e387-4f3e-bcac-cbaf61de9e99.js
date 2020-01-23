"use strict";
cc._RF.push(module, '319d9Rl44dPPrysy69h3p6Z', 'soldierMgr');
// scripts/towerDefens/soldierMgr.js

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
        state: 0,
        //STATE ENUMS
        //0 Idle,
        //1 walk to target
        //2 die
        //3 battle
        moveSpeed: 10,
        hurt: 10,
        attackRange: 10,
        hurtRange: -1,
        hurtDelta: 0.5,
        hurtType: 1, // while 1 indicate physical ,and 2 indicate magic
        physicalDefense: 2,
        magicDefense: 0,
        findEnmyRange: 100,
        targetEnmy: null,

        health: {
            get: function get() {
                if (this._health == null) {
                    this._health = 100;
                }
                return this._health;
            },
            set: function set(value) {
                this._health = value;
            }
        },
        maxHealth: {
            get: function get() {
                if (this._maxHealth == null) {
                    this._maxHealth = 100;
                }
                return this._maxHealth;
            },
            set: function set(value) {
                this._maxHealth = value;
            }
        },
        mapMgr: null

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.mapMgr = cc.find("Canvas/mapNode").getComponent("mapMgr");
    },
    update: function update(dt) {
        if (this.state == 0) {
            for (var index in this.mapMgr.monstors) {
                var oneMonstor = this.mapMgr.monstors[index];
                var monstorMgr = oneMonstor.getComponent("monstorMgr");
                var dis = monstorMgr.getDisOfTwoPoint(this.node.position, oneMonstor.position);
                if (dis <= this.findEnmyRange) {
                    this.targetEnmy = oneMonstor;
                    this.state = 1;
                    break;
                }
            }
        } else if (this.state == 1) {}
    },
    getHurt: function getHurt(hurtNum, givenType) {
        var actralHurt = null;
        switch (givenType) {
            case 1:
                actralHurt = hurtNum / (1 + this.physicalDefense);
                break;
            case 2:
                actralHurt = hurtNum / (1 + this.magicDefense);
                break;
            default:
                actralHurt = hurtNum / (1 + this.physicalDefense);
        }

        var temp = this.health - actralHurt;
        if (temp <= 0) {
            this.health = 0;
            this.state = 3;
        } else {
            this.health = temp;
        }
    }
});

cc._RF.pop();