"use strict";
cc._RF.push(module, '626a8aWWcpLkKl5Wdwml2ih', 'mapMgr');
// scripts/towerDefens/mapMgr.js

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
        tileMap: cc.TiledMap,
        mapSize: cc.Size,
        tileSize: cc.Size,
        mapSizeInPix: cc.Size,
        roadLayer: cc.TiledLayer,
        pathes: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.initProperties();
        //for a test
        var baseLinePoints = this.pathes["testPath"];
        var p1 = baseLinePoints[0];
        var p2 = baseLinePoints[1];
        var pointPara = cc.v2(0, 0);
        var givenPoint = p1;
        var result = this.getCorrespondingPointInParraline(p1, p2, pointPara, givenPoint);
        var result1 = this.getCorrespondingPointInParraline(p1, p2, pointPara, p2);
        cc.log(result.x, result.y);
        cc.log(result1.x, result1.y);
        cc.log(p1.x, p1.y);
        cc.log(p2.x, p2.y);
    },
    start: function start() {},
    initProperties: function initProperties() {
        this.tileMap = this.node.getComponent(cc.TiledMap);
        this.mapSize = this.tileMap.getMapSize();
        this.tileSize = this.tileMap.getTileSize();
        this.mapSizeInPix = cc.size(this.mapSize.width * this.tileSize.width, this.mapSize.height * this.tileSize.height);
        this.roadLayer = this.tileMap.getLayer("road");
        var pathesObjGroup = this.tileMap.getObjectGroup("pathes");
        var pathObjects = pathesObjGroup.getObjects();

        this.pathes = {};
        for (var index in pathObjects) {
            var onePathObj = pathObjects[index];
            var position = cc.v2(onePathObj.x, onePathObj.y);
            var points = onePathObj.polylinePoints;
            for (var i in points) {
                var onePoint = points[i];
                onePoint.x = position.x + onePoint.x;
                onePoint.y = position.y + onePoint.y;
                var nodePosition = this.convertMapCodiToNodeCodi(onePoint.x, onePoint.y);
                onePoint.x = nodePosition.x;
                onePoint.y = nodePosition.y;
            }
            var key = onePathObj.name;

            this.pathes[key] = points;
        }
    },
    convertMapCodiToNodeCodi: function convertMapCodiToNodeCodi(x, y) {
        var mapOrigin = cc.v2(-1 * this.mapSizeInPix.width / 2, -1 * this.mapSizeInPix.height / 2);
        var resultx = mapOrigin.x + x;
        var resulty = mapOrigin.y + y;
        return cc.v2(resultx, resulty);
    },
    getCorrespondingPointInParraline: function getCorrespondingPointInParraline(point1, point2, pointPara, givenPointInBaseLine) {
        var x1 = point1.x;
        var y1 = point1.y;
        var x2 = point2.x;
        var y2 = point2.y;
        var xp = pointPara.x;
        var yp = pointPara.y;
        var x = givenPointInBaseLine.x;
        var y = givenPointInBaseLine.y;
        var resultx = null;
        var resulty = null;
        if (x2 == x1) {
            resultx = xp;
            resulty = y;
        } else if (y1 == y2) {
            resultx = x;
            resulty = yp;
        } else {
            var k = (y2 - y1) / (x2 - x1);
            var p = yp - k * xp;
            var v = y + 1 / k * x;
            resultx = (v - p) / (k + 1 / k);
            resulty = k * resultx + p;
        }
        if (resultx != null && resulty != null) {
            return cc.v2(resultx, resulty);
        }
    }

    // update (dt) {},

});

cc._RF.pop();