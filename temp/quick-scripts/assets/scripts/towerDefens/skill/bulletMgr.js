(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/towerDefens/skill/bulletMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e0d7beBYB9PUJEPWjzZ2dmw', 'bulletMgr', __filename);
// scripts/towerDefens/skill/bulletMgr.js

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
        moveSpeed: 0,
        delegate: null,
        target: cc.Node,
        targetLastPosition: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.targetLastPosition = cc.v2(this.target.x, this.target.y);
    },
    update: function update(dt) {
        var originDirection = null;
        if (this.target.getComponent("battleElementMgr").currentHp > 0) {
            originDirection = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);
            this.targetLastPosition = cc.v2(this.target.x, this.target.y);
        } else {
            originDirection = cc.v2(this.targetLastPosition.x - this.node.x, this.targetLastPosition.y - this.node.y);
        }

        var direction = originDirection.normalize();
        var vx = direction.x * this.moveSpeed;
        var vy = direction.y * this.moveSpeed;
        var dis1 = originDirection.mag();

        this.node.x = this.node.x + vx * dt;
        this.node.y = this.node.y + vy * dt;
        var angle = direction.signAngle(cc.v2(1, 0));
        var degree = angle / Math.PI * 180;
        this.node.angle = -1 * degree;
        var dis2 = cc.v2(vx * dt, vy * dt).mag();

        if (dis2 >= dis1) {
            this.node.removeFromParent();
        }
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node == this.target) {
            this.delegate.onHit();
            this.node.removeFromParent();
        }
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
        //# sourceMappingURL=bulletMgr.js.map
        