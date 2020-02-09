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
        target: cc.Node,
        owner: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    releaseSkill() {
        if (this.skillType == 1) {
            var skillConfig = require("skillConfig")[this.id.toString()]
            var animationName = skillConfig.animationName
            var animComp = this.owner.node.getComponent(cc.Animation)
            if (animationName != null && animationName != "") {
                animComp.play(animationName)
            }
            else{
                cc.error("not invalid animation name")
            }
        }
        else if (this.skillType == 2) {
            this.produceResult()
        }

    },
    sendBullet() {
        var skillConfig = require("skillConfig")[this.id.toString()]
        var bulletResId = skillConfig.bulletResourceId
        var bulletPrefab = cc.find("Canvas/resNode").getComponent("resMgr").reses[bulletResId.toString()].prefabName

        var offsetX = skillConfig.offsetX
        var offsetY = skillConfig.offsetY
        var moveSpeed = skillConfig.moveSpeed

        var bullet = cc.instantiate(bulletPrefab)
        var bulletMgr = bullet.getComponent("bulletMgr")
        bulletMgr.delegate = this
        bulletMgr.moveSpeed = moveSpeed
        bulletMgr.target = this.target

        bullet.x = offsetX
        bullet.y = offsetY
        this.owner.addChild(bullet)

    },
    onHit() {
        //called when it's time to play hurt effect
        var skillConfig = require("skillConfig")[this.id.toString()]
        var hurtEffectResourceId = skillConfig.hurtEffectResourceId
        var hurtEffectPrefab = cc.find("Canvas/resNode").getComponent("resMgr").reses[hurtEffectResourceId.toString()].prefabName

        var hurtEffect = cc.instantiate(hurtEffectPrefab)
        var offsetX = skillConfig.hurtEffectOffsetX
        var offsetY = skillConfig.hurtEffectOffsetY
        
        hurtEffect.x = offsetX
        hurtEffect.y = offsetY
        this.target.addChild(hurtEffect)
        
        var animComp = hurtEffect.getComponent(cc.Animation)
        animComp.play("getHurt")
    },
    
    produceResult() {
        var skillConfig = require("skillConfig")[this.id.toString()]
        var hurtCoefficient = skillConfig.hurtCoefficient
        var additionalBuffId = skillConfig.additionalBuffId

        
    }

    // update (dt) {},
});
