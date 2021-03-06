"use strict";
cc._RF.push(module, '6ff0bqTs6FJ659N/UPKmCbC', 'skill');
// scripts/towerDefens/skill/skill.js

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

var Skill = cc.Class({

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
        id: cc.Integer,
        skillType: 1, //while 1 indicate initiative skill , and 2 is passivity skill
        hurtType: 1, //1 is physical , 2 is magical
        owner: cc.Node,
        ownerMgr: null,
        targets: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    releaseSkill: function releaseSkill() {
        var config = require("skillConfig")[this.id.toString()];
        this.skillType = config.skillType;
        if (this.skillType == 1) {
            var skillConfig = require("skillConfig")[this.id.toString()];
            var animationName = skillConfig.animationName;
            var animComp = this.owner.getComponent(cc.Animation);
            if (animationName != null && animationName != "") {
                animComp.play(animationName);
            } else {
                cc.error("not invalid animation name");
            }
        } else if (this.skillType == 2) {
            this.produceResult();
        }
    },
    sendBullet: function sendBullet() {
        var skillConfig = require("skillConfig")[this.id.toString()];
        var bulletResId = skillConfig.bulletResourceId;
        var bulletPrefab = cc.find("Canvas/resNode").getComponent("resMgr").reses[bulletResId.toString()].prefabName;

        var offsetX = skillConfig.offsetX;
        var offsetY = skillConfig.offsetY;
        var moveSpeed = skillConfig.moveSpeed;

        for (var index in this.targets) {
            var target = this.targets[index];
            var bullet = cc.instantiate(bulletPrefab);
            var bulletMgr = bullet.getComponent("bulletMgr");
            bulletMgr.delegate = this;
            bulletMgr.moveSpeed = moveSpeed;
            bulletMgr.target = target;

            bullet.x = offsetX + this.owner.x;
            bullet.y = offsetY + this.owner.y;
            cc.find("Canvas").addChild(bullet);
        }
    },
    onHit: function onHit() {
        var skillConfig = require("skillConfig")[this.id.toString()];
        var hurtEffectResourceId = skillConfig.hurtEffectResourceId;
        if (hurtEffectResourceId != "") {
            var hurtEffectPrefab = cc.find("Canvas/resNode").getComponent("resMgr").reses[hurtEffectResourceId.toString()].prefabName;
            for (var index in this.targets) {
                var target = this.targets[index];
                var hurtEffect = cc.instantiate(hurtEffectPrefab);
                var offsetX = skillConfig.hurtEffectOffsetX;
                var offsetY = skillConfig.hurtEffectOffsetY;

                hurtEffect.x = offsetX;
                hurtEffect.y = offsetY;
                target.addChild(hurtEffect);

                var animComp = hurtEffect.getComponent(cc.Animation);
                animComp.play("getHurt");
            }
        } else {
            this.produceResult();
        }
    },
    produceResult: function produceResult() {
        var skillConfig = require("skillConfig")[this.id.toString()];
        var hurtCoefficient = skillConfig.hurtCoefficient;
        var additionalBuffId = skillConfig.additionalBuffId;
        this.hurtType = skillConfig.hurtType;
        //both tower and monstor will have the ability to release skill
        //they will both have a commponent named "battleElementMgr"
        var battleElementMgr = this.owner.getComponent("battleElementMgr");
        var hurtNum = battleElementMgr.hurt * hurtCoefficient;

        for (var index in this.targets) {
            var target = this.targets[index];
            var effectedTargets = this.getTargetsInHurtRange(target);
            for (var index in effectedTargets) {
                var oneTarget = effectedTargets[index];
                oneTarget.getComponent("battleElementMgr").getHurt(hurtNum, this.hurtType);
                oneTarget.getComponent("battleElementMgr").getBuff(additionalBuffId);
            }
        }
    },
    getTargetsInHurtRange: function getTargetsInHurtRange(givenTarget) {
        var hurtRange = require("skillConfig")[this.id.toString()].hurtRange;
        var faction = require("skillConfig")[this.id.toString()].faction;
        var targets = this.ownerMgr.getTargetsInHurtRange(givenTarget, hurtRange, faction);
        if (targets.length > 0) {
            return targets;
        } else {
            cc.error("NO TARGET IN HURT RANGE");
            return null;
        }
    }
    // update (dt) {},

});

module.exports = Skill;

cc._RF.pop();