(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/towers/towerMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ff21eOFaElLXr6G/X3gFXv6', 'towerMgr', __filename);
// scripts/towerDefens/towers/towerMgr.js

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
        skills: null,
        commonSkillId: null,
        commonSkillConfig: null,
        commonSkillCd: null,
        isUIShowed: false,
        currentUI: null,
        towerUIPrefab: cc.Prefab,

        canAttack: {
            get: function get() {
                return this._canAttack;
            },
            set: function set(value) {
                this._canAttack = value;
            }
        },
        attackTimer: {
            get: function get() {
                return this._attackTimer;
            },
            set: function set(value) {
                this._attackTimer = value;
                if (value >= this.commonSkillCd) {
                    this.canAttack = true;
                    this.attackTimer = null;
                }
            }
        },

        gameMgr: null,
        releasingSkill: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getChildByName("touchNode").on("touchend", this.onTouchEnd, this);
        this.gameMgr = cc.find("Canvas/gameMgrNode").getComponent("gameMgr");
    },
    start: function start() {
        for (var stringSkillId in this.skills) {
            var isCommonSkill = this.skills[stringSkillId].isCommonSkill;
            if (isCommonSkill == true) {
                this.commonSkillId = parseInt(stringSkillId);
                break;
            }
        }

        if (this.commonSkillId != null) {
            this.canAttack = true;
            this.commonSkillCd = this.skills[this.commonSkillId.toString()].cd;
        }
    },
    update: function update(dt) {
        if (this.attackTimer != null) {
            this.attackTimer += dt;
        }

        if (this.canAttack == true) {
            this.tryToReleaseCommonSkill();
        }
    },
    onTouchEnd: function onTouchEnd(event) {
        if (this.isUIShowed == false) {
            this.showTowerUI();
        }
        event.stopPropagation();
    },
    onDestroy: function onDestroy() {
        this.node.getChildByName("touchNode").off("touchend", this.onTouchEnd, this);
    },
    showTowerUI: function showTowerUI() {
        var ui = cc.instantiate(this.towerUIPrefab);
        this.currentUI = ui;
        ui.scale = 0;
        ui.x = 0;
        ui.y = 26.333;
        this.isUIShowed = true;
        this.node.addChild(ui);
        cc.tween(ui).to(0.2, { scale: 1.2 }).start();
    },
    removeTowerUI: function removeTowerUI() {
        if (this.isUIShowed == true) {
            var self = this;
            cc.tween(this.currentUI).to(0.2, { scale: 0 }).call(function () {
                self.currentUI.removeFromParent();
                self.currentUI = null;
                self.isUIShowed = false;
            }).start();
        }
    },
    tryToReleaseCommonSkill: function tryToReleaseCommonSkill() {
        var config = require("skillConfig")[this.commonSkillId.toString()];
        var faction = config.faction;
        var targetNum = config.targetNum;
        var attackRange = config.attackRange;
        var targets = [];

        var possibleTargets = null;
        switch (faction) {
            case 1:
                possibleTargets = this.gameMgr.alivedMonstors;
                break;
            case 2:
                possibleTargets = this.gameMgr.towers;
                break;
        }

        if (targetNum == -1) {
            for (var index in possibleTargets) {
                var element = possibleTargets[index];
                var dis = cc.v2(element.x - this.node.x, element.y - this.node.y).mag();
                if (dis <= attackRange) {
                    targets.push(element);
                }
            }
        } else {
            var currentNum = 0;
            for (var index in possibleTargets) {
                var element = possibleTargets[index];
                var dis = cc.v2(element.x - this.node.x, element.y - this.node.y).mag();
                if (dis <= attackRange) {
                    targets.push(element);
                    currentNum += 1;
                    if (currentNum == targetNum) {
                        break;
                    }
                }
            }
        }

        if (targets.length > 0) {
            this.releaseSkill(this.commonSkillId, targets);
            this.canAttack = false;
            this.attackTimer = 0;
        }
    },
    releaseSkill: function releaseSkill(skillId, targets) {
        var Skill = require("skill");
        var skillObj = new Skill();
        skillObj.id = skillId;
        skillObj.targets = targets;
        skillObj.owner = this.node;
        skillObj.ownerMgr = this;
        this.releasingSkill = skillObj;
        skillObj.releaseSkill();
    },
    getTargetsInHurtRange: function getTargetsInHurtRange(givenTarget, hurtRange, faction) {
        if (hurtRange == -1) {
            return [givenTarget];
        }

        var possibleTargets = null;
        switch (faction) {
            case 1:
                possibleTargets = this.gameMgr.alivedMonstors;
                break;
            case 2:
                possibleTargets = this.gameMgr.towers;
                break;
        }

        var results = [];
        for (var index in possibleTargets) {
            var element = possibleTargets[index];
            var dis = cc.v2(element.x - givenTarget.x, element.y - givenTarget.y).mag();
            if (dis <= hurtRange) {
                results.push(element);
            }
        }
        return results;
    },
    sendBullet: function sendBullet() {
        this.releasingSkill.sendBullet();
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
        