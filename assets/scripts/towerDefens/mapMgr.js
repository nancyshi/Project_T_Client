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

    onLoad () {
        this.initProperties()
        
    },

    start () {

    },

    initProperties() {
        this.tileMap = this.node.getComponent(cc.TiledMap)
        this.mapSize = this.tileMap.getMapSize()
        this.tileSize = this.tileMap.getTileSize()
        this.mapSizeInPix = cc.size(this.mapSize.width * this.tileSize.width, this.mapSize.height * this.tileSize.height)
        this.roadLayer = this.tileMap.getLayer("road")
        var pathesObjGroup = this.tileMap.getObjectGroup("pathes")
        var pathObjects = pathesObjGroup.getObjects()

        this.pathes = {}
        for (var index in pathObjects) {
            var onePathObj = pathObjects[index]
            var position = cc.v2(onePathObj.x,onePathObj.y)
            var points = onePathObj.polylinePoints
            for (var i in points) {
                var onePoint = points[i]
                onePoint.x = position.x + onePoint.x
                onePoint.y = position.y + onePoint.y
                var nodePosition = this.convertMapCodiToNodeCodi(onePoint.x,onePoint.y)
                onePoint.x = nodePosition.x
                onePoint.y = nodePosition.y
            }
            let key = onePathObj.name
            
            this.pathes[key] = points
        }
    },

    convertMapCodiToNodeCodi(x,y) {
        var mapOrigin = cc.v2(-1 * this.mapSizeInPix.width /2 , -1 * this.mapSizeInPix.height / 2)
        var resultx = mapOrigin.x + x
        var resulty = mapOrigin.y + y
        return cc.v2(resultx,resulty)
    }

    // update (dt) {},
});
