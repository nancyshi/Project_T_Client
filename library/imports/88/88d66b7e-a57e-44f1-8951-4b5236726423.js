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
                } else if (value == 3) {
                    this.onDie();
                }
            }
            //STATE ENUM
            //0 default , do nothing
            //1 go to target
            //2 reach final target
            //3 die
            //4 battle

        },
        maxHealth: {
            get: function get() {
                if (this._maxHeath == null) {
                    this._maxHeath = 100;
                    return this._maxHeath;
                } else {
                    return this._maxHeath;
                }
            },
            set: function set(value) {
                this._maxHeath = value;
                var processBar = this.node.getChildByName("heathProcessBar").getComponent(cc.ProgressBar);
                processBar.progress = this.health / value;
            }
        },
        health: {
            get: function get() {
                if (this._heath == null) {
                    this._heath = 100;
                    return this._heath;
                } else {
                    return this._heath;
                }
            },
            set: function set(value) {
                this._heath = value;
                var processBar = this.node.getChildByName("heathProcessBar").getComponent(cc.ProgressBar);
                processBar.progress = value / this.maxHealth;
            }
        },
        isHeathBarHidden: {
            get: function get() {
                if (this._isHeathBarHidden == null) {
                    this._isHeathBarHidden = true;
                }
                return this._isHeathBarHidden;
            },
            set: function set(value) {
                this._isHeathBarHidden = value;
                var heathBarNode = this.node.getChildByName("heathProcessBar");

                heathBarNode.active = !value;
            }
        },
        heathBarShowLastTime: {
            get: function get() {
                return this._heathBarShowLastTime;
            },
            set: function set(value) {
                this._heathBarShowLastTime = value;
                if (value <= 0) {
                    this.isHeathBarHidden = true;
                }
            }
        },
        moveSpeed: 100,

        target: null,
        vx: null,
        vy: null,
        targetIndex: 1,
        gameMgr: null,

        //battle properties
        hurt: 10,
        attackRange: 10,
        hurtRange: -1,
        hurtDelta: 0.5,
        hurtType: 1, // while 1 indicate physical ,and 2 indicate magic
        physicalDefense: 2,
        magicDefense: 0,
        currentEnmy: null,

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
                        self.canAttack = true;
                    }, this.hurtDelta);
                }
            }
        }
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

        this.maxHealth = 100;
        this.health = 100;
        this.gameMgr = cc.find("Canvas/gameMgrNode").getComponent("gameMgr");
        this.state = 1;
        var anim = this.node.getComponent(cc.Animation);
        anim.play("walk");
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

            // for (var index in this.mapMgr.soldiers) {
            //     var oneSoldier = this.mapMgr.soldiers[index]
            //     var dis = this.getDisOfTwoPoint(this.node.position,oneSoldier.position)
            //     if (dis <= this.attackRange) {
            //         this.currentEnmy = oneSoldier
            //         this.state = 4
            //         break
            //     }
            // }

        } else if (this.state == 4) {
            if (this.canAttack == true) {
                this.canAttack = false;
                this.attackEnmy();
            }
        }

        if (this.heathBarShowLastTime > 0) {
            this.heathBarShowLastTime -= dt;
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
        }
        this.node.removeFromParent();

        var heathMinusNum = 1;
        this.gameMgr.currentHeath -= heathMinusNum;
    },
    onDie: function onDie() {

        var temp = null;
        for (var index in this.gameMgr.alivedMonstors) {
            if (this.node == this.gameMgr.alivedMonstors[index]) {
                temp = index;
                break;
            }
        }
        if (temp != null) {
            this.gameMgr.alivedMonstors.splice(index, 1);
        }

        var anime = this.node.getComponent(cc.Animation);
        var animState = anime.play("die");
        var duration = animState.duration;
        var self = this;
        cc.tween(this.node).delay(duration).call(function () {
            self.node.removeFromParent();
        }).start();
    },
    getHurt: function getHurt(hurtNum, givenType) {
        this.heathBarShowLastTime = 3;
        this.isHeathBarHidden = false;
        var acturalHurt = null;
        switch (givenType) {
            case 1:
                acturalHurt = hurtNum * hurtNum / (hurtNum + this.physicalDefense);
                break;
            case 2:
                acturalHurt = hurtNum * hurtNum / (hurtNum + this.magicDefense);
                break;
            default:
                acturalHurt = hurtNum * hurtNum / (hurtNum + this.physicalDefense);

        }

        var temp = this.health - acturalHurt;
        if (temp <= 0) {
            this.health = 0;
            this.state = 3;
        } else {
            this.health = temp;
        }
    },
    attackEnmy: function attackEnmy() {
        var anim = this.node.getComponent(cc.Animation);
        anim.play("attack");
    },
    hurtEnmy: function hurtEnmy() {
        this.currentEnmy.getHurt(this.hurt, this.hurtType);
    }
});

cc._RF.pop();