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
            get() {
                return this._isAllResesLoaded
            },
            set(value) {
                this._isAllResesLoaded = value
                if (value == true) {
                    cc.log("COMPLET")
                    if (this.completeCallBack != null) {
                        this.completeCallBack(this)
                    }
                    if(this.target == null) {
                        return
                    }
                    this.target.onAllResesLoaded()
                }
            }
        },
        resesNum: {
            get() {
                return this._resesNum
            },
            set(value) {
                this._resesNum = value
            }
        },
        loadedResesNum: {
            get() {
                return this._loadedResesNum
            },
            set(value) {
                this._loadedResesNum = value
                if (value == this.resesNum) {
                    this.isAllResesLoaded = true
                }
            }
        },
        reses: {
            get() {
                if (this._reses == null) {
                    this._reses = {}
                }
                return this._reses
            },
            set(value) {
                this._reses = value
            }
        },
        target: null,
        completeCallBack: null,
        enabledTowerIds: []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    loadNeededReses() {
        //load monstors and towers reses
        var refreshPlan = this.node.parent.getChildByName("gameMgrNode").getComponent("gameMgr").refreshPlan
        var monstorConfig = require("monstorConfig")

        var monstorResIds = []
        for (var key in refreshPlan) {
            var monstors = refreshPlan[key].monstorsConfig
            for (var k in monstors) {
                var monstorObj = monstors[k]
                var monstorId = monstorObj.monstorId
                var resId = monstorConfig[monstorId.toString()].resId
                var isNewId = monstorResIds.every(function(x){
                    return x != resId
                })
                if (isNewId == true) {
                    monstorResIds.push(resId)
                }
            }
        }

        var towerResIds = []
        var towerConfig = require("towerConfig")
        for (var index in this.enabledTowerIds) {
            var id = this.enabledTowerIds[index]
            var oneTowerConfig = towerConfig[id.toString()]
            for (var key in oneTowerConfig) {
                var resId = oneTowerConfig[key].resId
                var isNewId = towerResIds.every(function(x){
                    return x != resId
                })
                if (isNewId == true) {
                    towerResIds.push(resId)
                }
            }
        }

        this.resesNum = monstorResIds.length + towerResIds.length
        this.loadedResesNum = 0

        for(var index in monstorResIds) {
            var id = monstorResIds[index]
            this._loadOneRes(id)
        }
        for (var index in towerResIds) {
            var id = towerResIds[index]
            this._loadOneRes(id)
        }
    },

    _loadOneRes(givenId){
        var resConfig = require("resConfig")
        var obj = resConfig[givenId.toString()]
        this.reses[givenId.toString()] = {}

        var targetNum = Object.keys(obj).length
        var currentNum = 0
        for(var key in obj) {
            (function(key,target){
                var url = obj[key]
                if (url != ""){
                    cc.loader.loadRes(url,function(err,res){
                        target.reses[givenId.toString()][key] = res
                        currentNum += 1
                        if (targetNum == currentNum) {
                            target.loadedResesNum += 1
                        }
                    })
                }
                else {
                    target.reses[givenId.toString()][key] = null
                    currentNum += 1
                    if (targetNum == currentNum) {
                        target.loadedResesNum += 1
                    }
                }
            })(key,this)
        }
    }
    

    

    // update (dt) {},
});
