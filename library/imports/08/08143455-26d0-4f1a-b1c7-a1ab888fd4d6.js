"use strict";
cc._RF.push(module, '08143RVJtBPGrHHoauIj9TW', 'resMgr');
// scripts/towerDefens/resMgr.js

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
        isAllResesLoaded: {
            get: function get() {
                return this._isAllResesLoaded;
            },
            set: function set(value) {
                this._isAllResesLoaded = value;
                if (value == true) {
                    cc.log("COMPLET");
                    if (this.target == null) {
                        return;
                    }
                    this.target.onAllResesLoaded();
                }
            }
        },
        resesToLoad: null,
        resesNum: {
            get: function get() {
                return this._resesNum;
            },
            set: function set(value) {
                this._resesNum = value;
            }
        },
        loadedResesNum: {
            get: function get() {
                return this._loadedResesNum;
            },
            set: function set(value) {
                this._loadedResesNum = value;
                if (value == this.resesNum) {
                    this.isAllResesLoaded = true;
                }
            }
        },
        reses: {
            get: function get() {
                if (this._reses == null) {
                    this._reses = {
                        monstors: {},
                        towers: {}
                    };
                }
                return this._reses;
            },
            set: function set(value) {
                this._reses = value;
            }
        },
        target: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    loadNeededReses: function loadNeededReses() {
        var waveConfig = this.node.parent.getChildByName("gameMgrNode").getComponent("gameMgr").waveConfig.json;
        var monstorIds = [];
        for (var k in waveConfig) {
            var element = waveConfig[k];
            for (var index in element) {
                var monstorObj = element[index];
                var monstorId = monstorObj.monstorId;
                if (monstorIds.some(function (x) {
                    return x == monstorId;
                }) == false) {
                    monstorIds.push(monstorId);
                }
            }
        }

        var monstorConfig = require("monstorConfig");
        var monstorPrefabNames = {};
        for (var index in monstorIds) {
            var id = monstorIds[index];
            var prefabName = monstorConfig[id].prefabName;
            monstorPrefabNames[id] = prefabName;
        }

        var towerPrefabNames = {
            "20001": "acherTow_101_01"
        };

        this.resesNum = Object.keys(monstorPrefabNames).length + Object.keys(towerPrefabNames).length;
        this.loadedResesNum = 0;

        for (var key in monstorPrefabNames) {
            (function (key, target) {
                var prefabName = monstorPrefabNames[key];
                var url = "prefabs/monstors/" + prefabName;
                cc.loader.loadRes(url, function (err, res) {
                    cc.log(target.reses);
                    target.reses.monstors[key] = res;
                    target.loadedResesNum += 1;
                });
            })(key, this);
        }

        for (var key in towerPrefabNames) {
            (function (key, target) {
                var prefabName = towerPrefabNames[key];
                var url = "prefabs/towers/" + prefabName;
                cc.loader.loadRes(url, function (err, res) {
                    target.reses.towers[key] = res;
                    target.loadedResesNum += 1;
                });
            })(key, this);
        }
    }
}

// update (dt) {},
);

cc._RF.pop();