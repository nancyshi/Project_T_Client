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
        hurtType: 1, //1 indicate physical, 2 indicate magical
        monstors: null,
        canAttack: {
            get() {
                if (this._canAttack == null) {
                    this._canAttack = true
                }
                return this._canAttack
            },
            set(value) {
                this._canAttack = value
                if (value == false) {
                    var self = this
                    this.scheduleOnce(function(){
                        self._canAttack = true
                    },this.hurtDelta)
                }
            }
        },
        bulletEffectPrefab: cc.Prefab,
        hurtEffectPrefab: cc.Prefab,
        bulletEffectOffset: cc.v2(0,0),
        currentEffect: null,   
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.monstors = cc.find("Canvas/gameMgrNode").getComponent("gameMgr").alivedMonstors
    },

    update (dt) {
        if (this.canAttack == true && this.monstors.length > 0) {
            for (var index in this.monstors) {
                var oneMonstor = this.monstors[index]
                var dis = cc.v2(oneMonstor.x - this.node.x, oneMonstor.y - this.node.y).mag()
                if (dis <= this.attackRange) {
                    this.attackOneMonstor(oneMonstor)
                    break
                }
            }
        }
    },

    attackOneMonstor(oneMonstor) {
        this.canAttack = false
        if (this.bulletEffectPrefab != null) {
            var effect = cc.instantiate(this.bulletEffectPrefab)
            effect.x = this.node.x + this.bulletEffectOffset.x
            effect.y = this.node.y + this.bulletEffectOffset.y
            var effectMgr = effect.getComponent("effectMgr")
            effectMgr.effectType = 1
            if (this.hurtEffectPrefab != null) {
                effectMgr.hurtEffectPrefab = this.hurtEffectPrefab
            }  
            effectMgr.target = oneMonstor
            effectMgr.delegate = this
            this.currentEffect = effect
        }
        else {
            if (this.hurtEffectPrefab != null) {
                var effect = cc.instantiate(this.hurtEffectPrefab)
                var effectMgr = effect.getComponent("effectMgr")
                effectMgr.effectType = 2
                effectMgr.delegate = this
                this.currentEffect = effect
            }
        }
    
        var animate = this.node.getComponent(cc.Animation)
        animate.play("attack")
    },
    playEffect() {
        // if (this.currentEffect != null) {
        //     cc.find("Canvas").addChild(this.currentEffect)
        // }
        var effectType = this.currentEffect.getComponent("effectMgr").effectType
        if (effectType == 1) {
            cc.find("Canvas").addChild(this.currentEffect)
        }
        else if (effectType == 2) {
            var target = this.currentEffect.getComponent("effectMgr").target
            target.addChild(this.currentEffect)
        }
    },
    _acturalHurt(monstor) {
        if (this.hurtRange == -1) {
            var monstorMgr = monstor.getComponent("monstorMgr")
            monstorMgr.getHurt(this.hurt,this.hurtType)
        }
        else {
            var monstorsForHurt = []
            for (var index in this.monstors) {
                var oneMonstor = this.monstors[index]
                if (oneMonstor == monstor) {
                    monstorsForHurt.push(oneMonstor)
                }
                else {
                    if (this.getDisOfTwoPoint(oneMonstor.position,monstor.position) <= this.hurtRange) {
                        monstorsForHurt.push(oneMonstor)
                    }
                }
            }
           
            if (monstorsForHurt.length > 0) {
                for (var index in monstorsForHurt) {
                    var oneMonstor = monstorsForHurt[index]
                    var monstorMgr = oneMonstor.getComponent("monstorMgr")
                    monstorMgr.getHurt(this.hurt,this.hurtType)
                }
            }
        }
    }
    
});
