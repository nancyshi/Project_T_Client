// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var dataMgr = cc.Class({
    

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
        playerData: {
            get() {
                return this._playerData
            },
            set(value) {
                this._playerData = value
                this.onPlayerDataUpdated()
                //do something else
            }
        }
        
    },

    updatePlayerData(playerId) {
        var ip = "127.0.0.1"
        var port = 8888
        var suffix = "data"
        var networkMgr = require("networkMgr")
        var self = this
        var successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)
            
            if (response.type == "success") {
                self.playerData = response.playerData
            }
            else {
                //do something for erros
            }
        }
        var message = {
            "playerId": playerId,
            "requestType": "query"
        }
        message = JSON.stringify(message)
        networkMgr.sendMessage(message,port,ip,suffix,successCallBack)
    },
    onPlayerDataUpdated () {
        cc.log("now player data is " + JSON.stringify(this.playerData))
    }

});

var shareDataMgr = new dataMgr()
module.exports = shareDataMgr
