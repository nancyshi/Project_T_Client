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
        target: cc.Node,
        moveSpeed: 500,
        effectType: 1, //1 indicate that it's a bullet effect
        hurtEffectPrefab: cc.Prefab,
        delegate: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (this.effectType == 1) {
            var manager = cc.director.getCollisionManager()
            manager.enabled = true            
        }
    },

    update (dt) {
        if (this.effectType == 1) {
            if (this.target.getComponent("monstorMgr").state == 3) {
                this.node.removeFromParent()
            }
            else {
                var direction = cc.v2(this.target.position.x - this.node.x, this.target.position.y - this.node.y).normalizeSelf()
                var vx = direction.x * this.moveSpeed
                var vy = direction.y * this.moveSpeed
                this.node.x = this.node.x + vx * dt
                this.node.y = this.node.y + vy * dt
                
                var angle = direction.signAngle(cc.v2(1,0))
                var degree = angle / Math.PI * 180
                this.node.angle = -1 * degree
            }
        }
    },
    onCollisionEnter(other,self) {
        //only bullet effect can triger this method
        if (other.node == this.target) {
            if (this.hurtEffectPrefab != null) {
                var effect = cc.instantiate(this.hurtEffectPrefab)
                var effectMgr = effect.getComponent("effectMgr")
                effectMgr.target = this.target
                effectMgr.effectType = 2
                effectMgr.delegate = this.delegate
                this.target.addChild(effect)
            }
            else {
                this.delegate._acturalHurt(this.target)
            }
            this.node.removeFromParent()
        }
    },
    acturalHurt() {
        this.delegate._acturalHurt(this.target)
    }
    
});
