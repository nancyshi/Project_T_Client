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

        refreshPlanId: {
            get() {
                return this._refreshPlanId
            },
            set(value) {
                this._refreshPlanId = value
                this.refreshPlan = require("refreshConfig")[this.refreshPlanId.toString()]
            }
        },
        refreshPlan: null,
        currentWaveIndex: {
            get() {
                return this._currentWaveIndex
            },
            set(value) {
                this._currentWaveIndex = value
                this.onWaveIndexChange()
            }
        },
        currentMonstorIndex: {
            get() {
                return this._currentMonstorIndex 
            },
            set(value) {
                this._currentMonstorIndex = value
                this.onMonstorIndexChange()
            }
        },

        resMgr: null,
        mapMgr: null,

        wavesNum: {
            get(){
                var num = null
                if (this.refreshPlan != null) {
                    num = Object.keys(this.refreshPlan).length
                }
                return num
            }
        },

        monstorsNumOfCurrentWave: {
            get() {
                var num = null
                if (this.refreshPlan != null) {
                    //num = Object.keys(this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig).length
                    var monstorsConfig = this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig
                    num = Object.keys(monstorsConfig).length
                }
                return num
            }
        },

        alivedMonstors: [],
        alivedMonstorsNum: {
            get() {
                return this._alivedMonstorsNum
            },
            set(value) {
                this._alivedMonstorsNum = value
                if (value == 0) {
                    this.onMonstorsOfCurrentWaveCleared()
                }
            }
        },

        maxHp: 10,
        currentHp: {
            get() {
                return this._currentHp
            },
            set(value) {
                this._currentHp = value
                this.hpLabel.string = value.toString() + " / " + this.maxHp.toString()
                if (value == 0) {
                    this.onFail()
                }
            }
        },

        waveLabel: cc.Label,
        hpLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (this.refreshPlanId == null) {
            this.refreshPlanId = 1001
        }
        this.resMgr = cc.find("Canvas/resNode").getComponent("resMgr")
        this.mapMgr = cc.find("Canvas/mapNode").getComponent("mapMgr")
        this.currentHp = this.maxHp
    },

    update (dt) {
        if (this.monstorTimer_Target != null && this.monstorTimer_Current != null) {
            this.monstorTimer_Current += dt
        }

        if (this.waveTimer_Target != null && this.waveTimer_Current != null) {
            this.waveTimer_Current += dt
        }
    },

    startRefresh() {
        this.currentWaveIndex = 1
    },

    onWaveIndexChange() {
        this.waveLabel.string = this.currentWaveIndex.toString() + " / " + this.wavesNum.toString()
        this.currentMonstorIndex = 1
    },

    onMonstorIndexChange() {
        var monstorConfig = this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig[this.currentMonstorIndex.toString()]
        var monstorId = monstorConfig.monstorId
        var prefab = this.getMonstorPrefabById(monstorId)
        var monstor = cc.instantiate(prefab)
        var pathId = monstorConfig.pathId
        var timeDelta = monstorConfig.timeDelta

        monstor.x = -1000
        monstor.y = -1000
        this.alivedMonstors.push(monstor)
        this.alivedMonstorsNum = this.alivedMonstors.length
        
        var monstorMgr = monstor.getComponent("monstorMgr")
        monstorMgr.basePathPoints = this.mapMgr.pathes[pathId.toString()]

        cc.find("Canvas").addChild(monstor)
        if (this.currentMonstorIndex < this.monstorsNumOfCurrentWave) {
            var self = this
            this.scheduleOnce(function(){
                self.currentMonstorIndex += 1
            },timeDelta)
        }
        else {
            this.onMonstorsOfCurrentWaveRefreshComplete()
        }
    },

    onMonstorsOfCurrentWaveRefreshComplete() {

    },

    onMonstorsOfCurrentWaveCleared(){
        if (this.currentWaveIndex < this.wavesNum) {
            var waveDelta = this.refreshPlan[this.currentWaveIndex.toString()].waveDelta
            var self = this
            this.scheduleOnce(function(){
                self.currentWaveIndex += 1
            },waveDelta)
        }

        else {
            this.onWin()
        }
    },

    getMonstorPrefabById(givenId) {
        return this.resMgr.reses.monstors[givenId.toString()]
    },

    onWin() {

    },

    onFail() {
        cc.director.pause()
        cc.log("YOU LOSE")
    }

});
