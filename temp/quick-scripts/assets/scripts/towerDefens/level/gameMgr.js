(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/level/gameMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dcf0e8LyYNOtqJNPn3l0Tom', 'gameMgr', __filename);
// scripts/towerDefens/level/gameMgr.js

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

        refreshPlanId: {
            get: function get() {
                return this._refreshPlanId;
            },
            set: function set(value) {
                this._refreshPlanId = value;
                this.refreshPlan = require("refreshConfig")[this.refreshPlanId.toString()];
            }
        },
        refreshPlan: null,
        currentWaveIndex: {
            get: function get() {
                return this._currentWaveIndex;
            },
            set: function set(value) {
                this._currentWaveIndex = value;
                this.onWaveIndexChange();
            }
        },
        currentMonstorIndex: {
            get: function get() {
                return this._currentMonstorIndex;
            },
            set: function set(value) {
                this._currentMonstorIndex = value;
                this.onMonstorIndexChange();
            }
        },

        resMgr: null,
        mapMgr: null,

        wavesNum: {
            get: function get() {
                var num = null;
                if (this.refreshPlan != null) {
                    num = Object.keys(this.refreshPlan).length;
                }
                return num;
            }
        },

        monstorsNumOfCurrentWave: {
            get: function get() {
                var num = null;
                if (this.refreshPlan != null) {
                    //num = Object.keys(this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig).length
                    var monstorsConfig = this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig;
                    num = Object.keys(monstorsConfig).length;
                }
                return num;
            }
        },

        alivedMonstors: [],
        alivedMonstorsNum: {
            get: function get() {
                return this._alivedMonstorsNum;
            },
            set: function set(value) {
                this._alivedMonstorsNum = value;
                if (value == 0) {
                    this.onMonstorsOfCurrentWaveCleared();
                }
            }
        },

        maxHp: 10,
        currentHp: {
            get: function get() {
                return this._currentHp;
            },
            set: function set(value) {
                this._currentHp = value;
                this.hpLabel.string = value.toString() + " / " + this.maxHp.toString();
                if (value == 0) {
                    this.onFail();
                }
            }
        },

        waveLabel: cc.Label,
        hpLabel: cc.Label,
        resourceLabel: cc.Label,
        resourceProcessBar: cc.ProgressBar,
        resourceNum: {
            get: function get() {
                return this._resourceNum;
            },
            set: function set(value) {
                this._resourceNum = value;
                this.resourceLabel.string = this.resourceNum.toString();
                if (value < this.maxResourceNum) {
                    this.isResourceIncreased = true;
                }
            }
        },
        maxResourceNum: 10,
        resourceIncreaseSpeed: 3,

        resourceNumTimer: {
            get: function get() {
                if (this._resourceNumTimer == null) {
                    this._resourceNumTimer = 0;
                }
                return this._resourceNumTimer;
            },
            set: function set(value) {
                this._resourceNumTimer = value;
                var tempProgressValue = value / this.resourceIncreaseSpeed;
                if (tempProgressValue > 1) {
                    tempProgressValue = 1;
                }
                this.resourceProcessBar.progress = tempProgressValue;
                if (value >= this.resourceIncreaseSpeed) {
                    if (this.resourceNum < this.maxResourceNum) {
                        this.resourceNum += 1;
                        this.resourceNumTimer = 0;
                    } else {
                        this.isResourceIncreased = false;
                    }
                }
            }
        },

        isResourceIncreased: false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.resMgr = cc.find("Canvas/resNode").getComponent("resMgr");
        this.mapMgr = cc.find("Canvas/mapNode").getComponent("mapMgr");
        this.currentHp = this.maxHp;
        this.waveLabel.string = "0 / " + this.wavesNum.toString();

        //test
        var self = this;
        cc.tween(this.node).delay(2).call(function () {
            self.startRefresh();
        }).start();
    },
    update: function update(dt) {
        if (this.isResourceIncreased == true) {
            this.resourceNumTimer += dt;
        }
    },
    startRefresh: function startRefresh() {
        this.currentWaveIndex = 1;
    },
    onWaveIndexChange: function onWaveIndexChange() {
        this.waveLabel.string = this.currentWaveIndex.toString() + " / " + this.wavesNum.toString();
        this.currentMonstorIndex = 1;
    },
    onMonstorIndexChange: function onMonstorIndexChange() {
        var monstorConfig = this.refreshPlan[this.currentWaveIndex.toString()].monstorsConfig[this.currentMonstorIndex.toString()];
        var monstorId = monstorConfig.monstorId;
        var prefab = this.getMonstorPrefabById(monstorId);
        var monstor = cc.instantiate(prefab);
        var pathId = monstorConfig.pathId;
        var timeDelta = monstorConfig.timeDelta;

        monstor.x = -1000;
        monstor.y = -1000;
        this.alivedMonstors.push(monstor);
        this.alivedMonstorsNum = this.alivedMonstors.length;

        var monstorMgr = monstor.getComponent("monstorMgr");
        monstorMgr.basePathPoints = this.mapMgr.pathes[pathId.toString()];

        cc.find("Canvas").addChild(monstor);
        if (this.currentMonstorIndex < this.monstorsNumOfCurrentWave) {
            var self = this;
            this.scheduleOnce(function () {
                self.currentMonstorIndex += 1;
            }, timeDelta);
        } else {
            this.onMonstorsOfCurrentWaveRefreshComplete();
        }
    },
    onMonstorsOfCurrentWaveRefreshComplete: function onMonstorsOfCurrentWaveRefreshComplete() {},
    onMonstorsOfCurrentWaveCleared: function onMonstorsOfCurrentWaveCleared() {
        if (this.currentWaveIndex < this.wavesNum) {
            var waveDelta = this.refreshPlan[this.currentWaveIndex.toString()].waveDelta;
            var self = this;
            this.scheduleOnce(function () {
                self.currentWaveIndex += 1;
            }, waveDelta);
        } else {
            this.onWin();
        }
    },
    getMonstorPrefabById: function getMonstorPrefabById(givenId) {
        var monstorConfig = require("monstorConfig");
        var monstorObj = monstorConfig[givenId.toString()];
        var resId = monstorObj.resId;
        var prefab = this.resMgr.reses[resId.toString()]["prefabName"];
        return prefab;
    },
    onWin: function onWin() {},
    onFail: function onFail() {
        cc.director.pause();
        cc.log("YOU LOSE");
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
        //# sourceMappingURL=gameMgr.js.map
        