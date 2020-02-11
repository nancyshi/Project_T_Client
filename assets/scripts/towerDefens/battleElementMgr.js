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
            get() {
                if (this._currentHp == null) {
                    this._currentHp = this.maxHp
                }
                return this._currentHp
            },
            set(value) {
                if (value > this.maxHp) {
                    value = this.maxHp
                }
                else if (value < 0) {
                    value = 0
                }

                this._currentHp = value
                if (this.delegate != null && value == 0) {
                    this.delegate.onDie()
                }
                if (this.hpBar) {
                    this.hpBar.progress = this.currentHp / this.maxHp
                }
            }
        },
        hurt: 100,

        physicalDefense: 100,
        magicalDefense: 200,

        hpBar: cc.ProgressBar,
        isAutoHideHpBar: true,
        hpBarContinueTime: 3,  //when on attack, the hp bar will auto appear, and last for this time , mesured by second

        _hpBarLastTimer: {
            get() {
                return this.__hpBarLastTimer
            },
            set(value) {
                this.__hpBarLastTimer = value
                if (value >= this.hpBarContinueTime) {
                    this._hpBarLastTimer = null
                    this.hpBar.node.active = false
                }
            }
        },

        delegate: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    getHurt(hurtNum, hurtType) {
        this._appearHpBar()
        if (hurtNum > 0) {
            //hurt flow
            var actureHurt = null
            switch (hurtType) {
                case 1: //physical
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.physicalDefense))
                    break
                case 2: //magical
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.magicalDefense))
                    break
                default:
                    actureHurt = Math.floor(hurtNum * hurtNum / (hurtNum + this.physicalDefense))
            }
            if (actureHurt) {
                this.currentHp -= actureHurt
            }
            else {
                cc.console.error("NOT INVALID HURT NUM OF " + actureHurt);
            }
        }
        else if (hurtNum < 0) {
            //cure flow
            this.currentHp += hurtNum
        }
    },

    getBuff(buffId) {

    },
    update (dt) {
        if (this.isAutoHideHpBar == true && this._hpBarLastTimer != null) {
            this._hpBarLastTimer += dt
        }
    },

    _appearHpBar() {
        if (this.hpBar.node.active == false) {
            this.hpBar.node.active = true
            if (this.isAutoHideHpBar == true) {
                this._hpBarLastTimer = 0
            }
        }
    }
});
