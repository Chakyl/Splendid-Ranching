// priority: -20
// Borrowed from society
const $Numismatics = Java.loadClass("dev.ithundxr.createnumismatics.Numismatics")
global.GLOBAL_BANK = $Numismatics.BANK

global.showPonderLayer = (scene, speed, height, exclude) => {
    for (let x = 0; x <= 5; x++) {
        for (let z = 0; z <= 5; z++) {
            if (!exclude || !(x == exclude.x && z == exclude.z))
                scene.world.showSection([x, height, z], Facing.DOWN)
        }
        if (speed > 0) scene.idle(speed)
    }
};

global.coinObj = {
    "numismatics:sun": 4096,
    "numismatics:crown": 512,
    "numismatics:cog": 64,
    "numismatics:sprocket": 16,
    "numismatics:bevel": 8,
    "numismatics:spur": 1
}

global.formatPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

global.formatNumber = (number, quality) => {
    let value;
    if (quality) {
        if (quality == 1.0) value = Math.round(number * 1.25)
        if (quality == 2.0) value = Math.round(number * 1.5)
        if (quality == 3.0) value = Math.round(number * 2)
    } else {
        value = number;
    }
    return global.formatPrice(value)
};

global.calculateCost = (value, count, stackSize) => {
    return global.formatNumber(value * count * (stackSize || 1))
};

global.formatName = (name) => {
    if (name.length === 0) return "";
    return name.charAt(0).toUpperCase() + name.slice(1)
};

global.coinMap = [
    { coin: "numismatics:sun", value: 4096 },
    { coin: "numismatics:crown", value: 512 },
    { coin: "numismatics:cog", value: 64 },
    { coin: "numismatics:sprocket", value: 16 },
    { coin: "numismatics:bevel", value: 8 },
    { coin: "numismatics:spur", value: 1 },
]

// For cases where prices are auto-generated, round
const roundPrice = (price) => {
    for (let i = 0; i < global.coinMap.length; i++) {
        let { value } = global.coinMap[i]

        if (price % value === 0) {
            for (let k = 0; k < global.coinMap.length; k++) {
                if (price / global.coinMap[i - k].value <= 64) {
                    return global.coinMap[i - k].value * Math.round(price / global.coinMap[i - k].value)
                }
            }
        }
    }
    return price;
};

global.calculateCoinValue = (coin) => {
    let value = 0;
    switch (coin.id.split(":")[1]) {
    case "spur":
        value = 1
        break
    case "bevel":
        value = 8
        break
    case "sprocket":
        value = 16
        break
    case "cog":
        value = 64
        break
    case "crown":
        value = 512
        break
    case "sun":
        value = 4096
        break
    default:
        console.log(`Invalid coin`)
    }
    return value * coin.count
};

/**
*    @param {number} price
*    @param {Array} output
*    @returns {Array}
*/
global.calculateCoinsFromValue = (price, output) => {
    for (let i = 0; i < global.coinMap.length; i++) {
        let { coin, value } = global.coinMap[i]
        if (value <= price) {
            if (price % value === 0) {
                output.push({ id: coin, count: price / value })
                return output
            } else {
                output.push({ id: coin, count: Math.floor(price / value) })
                global.calculateCoinsFromValue(price % value, output)
            }
            return output;
        }
    }
}

global.getSellCoins = (price) => {
    let coinItems = []
    let coinsObj = global.calculateCoinsFromValue(price, [])
    for (let coin of coinsObj) {
        coinItems.push(Item.of(coin.id, coin.count))
    }
    return coinItems
}

// Text display utils
global.clearOldTextDisplay = (block, id) => {
    const { x, y, z } = block;
    block
        .getLevel()
        .getServer()
        .getEntities()
        .forEach((entity) => {
            entity.getTags().forEach((tag) => {
                if (tag === `${id}-${x}-${y}-${z}`) {
                    entity.kill();
                }
            });
        });
};

global.rotationFromFacing = (facing) => {
    switch (facing) {
        case "north":
            return 180;
        case "east":
            return 270;
        case "south":
            return 360;
        default:
        case "west":
            return 90;
    }
};

global.spawnDisplay = (block, y, id, textOrItem, type) => {
    let entity;
    const { x, z } = block;
    entity = block.createEntity(`minecraft:${type}_display`);
    let newNbt = entity.getNbt();
    if (type === "text") {
        newNbt.text = `{"text":"${textOrItem}"}`;
        newNbt.transformation.scale = [NBT.f(0.8), NBT.f(0.8), NBT.f(0.8)]
    } else {
        newNbt.item = { id: Item.of("splendid_slimes:plort").id, Count: NBT.b(1), tag: NBT.compoundTag({ plort: { id: "splendid_slimes:" + textOrItem } }) }
        newNbt.transformation.scale = [NBT.f(0.5), NBT.f(0.5), NBT.f(0.5)]
    }
    newNbt.background = 0;
    newNbt.Rotation = [NBT.f(global.rotationFromFacing(block.properties.get("facing"))), NBT.f(0)];
    entity.setNbt(newNbt);
    entity.setX(x + 0.86);
    entity.setY(y);
    entity.setZ(z + 0.5);
    entity.addTag(`${id}-${x}-${block.y}-${z}`);
    entity.spawn();
};

