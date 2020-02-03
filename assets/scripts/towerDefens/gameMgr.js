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
        refreshConfig: cc.JsonAsset,
        waveConfig: cc.JsonAsset,
        refresPlanId: 10001,
        maxHeath: {
            get() {
                if (this._maxHeath == null) {
                    this._maxHeath = 10
                }
                return this._maxHeath
            },
            set(value) {
                this._maxHeath = value
            }
        },
        currentHeath: {
            get() {
                if (this._currentHeath == null) {
                    this._currentHeath = 10
                }
                return this._currentHeath
            },
            set(value) {
                this._currentHeath = value
                if (value >= 0 ) {
                    this.setupLabels()
                }
                else {
                    this.onFail()
                }
            }
        },
        isRefreshStarted: {
            get() {
                return this._isRefreshStarted
            },
            set(value) {
                this._isRefreshStarted = value
                if (value == true) {
                    this.onRefreshStart()
                }
            }
        },

        currentWaveIndex: {
            get() {
                return this._currentWaveIndex
            },
            set(value) {
                this._currentWaveIndex = value
                this.setupLabels()
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
        waveTimer: {
            get() {
                if (this._waveTimer == null) {
                    this._waveTimer = {
                        currentTime: null,
                        targetTime: null
                    }
                }
                return this._waveTimer
            },
            set(value) {
                this._waveTimer = value
                if (value.currentTime >= value.targetTime) {
                    var tempIndex = this.currentWaveIndex + 1
                    if (tempIndex <= this.refreshConfig.json.length - 1) {
                        this.waveTimer.currentTime = null
                        this.currentWaveIndex += 1
                    }
                }
            }
        },
        monstorTimer: {
            get() {
                if (this._monstorTimer == null) {
                    this._monstorTimer = {
                        currentTime: null,
                        targetTime: null
                    }
                }
                return this._monstorTimer
            },
            set(value) {
                this._monstorTimer = value
                if (value.currentTime >= value.targetTime) {
                    var tempIndex = this.currentMonstorIndex + 1
                    if (tempIndex <= this.currentMonstorConfig.length - 1) {
                        this.monstorTimer.currentTime = null
                        this.currentMonstorIndex += 1
                    }

                }
            }
        },
        currentWaveConfig: null,
        currentMonstorConfig: null,
        mapMgr: null,
        testPrefab: cc.Prefab,
        testTowerPrefab: cc.Prefab,

        waveLabel: cc.Label,
        heathLabel: cc.Label,
        alivedMonstors: []
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.maxHeath = 10
        this.currentHeath = 10
        this.mapMgr = cc.find("Canvas/mapNode").getComponent("mapMgr")
        this.isRefreshStarted = true  
    },

    update (dt) {
        if (this.waveTimer.currentTime != null) {
            var tempTime = this.waveTimer.currentTime + dt
            var targetTime = this.waveTimer.targetTime
            this.waveTimer = {
                currentTime: tempTime,
                targetTime: targetTime
            }
        }
        if (this.monstorTimer.currentTime != null) {
            var tempTime = this.monstorTimer.currentTime + dt
            var targetTime = this.monstorTimer.targetTime
            this.monstorTimer = {
                currentTime: tempTime,
                targetTime: targetTime
            }
        }
    },

    onRefreshStart() {
        this.currentWaveIndex = 0
    },

    onWaveIndexChange() {
        this.currentWaveConfig = this.refreshConfig.json[this.currentWaveIndex]
        var waveId = this.currentWaveConfig.waveId
        this.currentMonstorConfig = this.waveConfig.json[waveId.toString()]
        if (this.currentMonstorConfig.length > 0) {
            this.currentMonstorIndex = 0
        }
    },
    onMonstorIndexChange() {
        var monstorId = this.currentMonstorConfig[this.currentMonstorIndex].monstorId

        var monstorPrefab = this.getMonstorPrefabById(monstorId)
        var oneMonstor = cc.instantiate(monstorPrefab)
        var monstorMgr = oneMonstor.getComponent("monstorMgr")
        var pathId = this.currentMonstorConfig[this.currentMonstorIndex].pathId
        
        monstorMgr.basePathPoints = this.mapMgr.pathes[pathId.toString()]

        oneMonstor.x = -1000
        oneMonstor.y = -1000
        this.alivedMonstors.push(oneMonstor)
        cc.find("Canvas").addChild(oneMonstor)

        if (this.currentMonstorIndex < this.currentMonstorConfig.length - 1) {
            var timeDelta = this.currentMonstorConfig[this.currentMonstorIndex].timeDelta
            this.monstorTimer = {
                currentTime: 0,
                targetTime: timeDelta
            }
        }
        else {
            this.onMonstorRefreshCompelete()
        }
    },
    getMonstorPrefabById(givenId) {
        var resMgr = cc.find("Canvas/resNode").getComponent("resMgr")
        var monstorRes = resMgr.reses.monstors
        var prefab = monstorRes[givenId.toString()]
        return prefab
    },

    onMonstorRefreshCompelete() {
        if (this.currentWaveIndex < this.refreshConfig.json.length - 1) {
            var timeDelta = this.currentWaveConfig.waveDelta
            this.waveTimer = {
                currentTime: 0,
                targetTime: timeDelta
            }
        }
    },
    
    setupLabels() {
        this.waveLabel.string = (this.currentWaveIndex + 1).toString() + " / " + this.refreshConfig.json.length.toString()
        this.heathLabel.string = this.currentHeath.toString() + " / " + this.maxHeath.toString()
    },

    onFail() {

    }
});
