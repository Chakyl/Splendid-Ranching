

global.handleMarketMonitorTick = (entity) => {
    const { block, level } = entity;
    let plort = block.getEntityData().data.plort;
    if (!plort) return;

    plort = plort.path
    const slimeData = level.getServer().persistentData['slime_value_data']

    if (slimeData && slimeData[plort] === undefined) return

    let plortData = slimeData[plort]
    let cost = plortData.currentValue
    let mult = plortData.multPercent
    let plortText = `${mult < 0 ? '§c' : '§a'}${global.calculateCost(cost, 1, 1)} ${mult < 0 ? '↓' : '↑'}`

    global.clearOldTextDisplay(block, "market_monitor_text");
    global.clearOldTextDisplay(block, "market_monitor_plort");

    global.spawnDisplay(
        block,
        block.y + 0.05,
        "market_monitor_text",
        plortText,
        "text"
    );
    global.spawnDisplay(
        block,
        block.y + 0.55,
        "market_monitor_plort",
        plort,
        "item"
    );
};

global.handleMarketMonitorRightClick = (click) => {
    const { block, item, player } = click;
    if (item.id.equals("splendid_slimes:plort")) {
        let nbt = block.getEntityData();
        nbt.merge({ data: { plort: item.nbt.plort.id } });
        block.setEntityData(nbt);
        global.handleMarketMonitorTick(click)
    }
};

StartupEvents.registry("block", (e) => {
    e.create("kubejs:market_monitor", "cardinal")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .box(0, 0, 14, 16, 16, 16)
        .defaultCutout()
        .soundType("copper")
        .item((item) => {
            item.tooltip(Text.gray("Right click with a Plort to display market value"));
            item.modelJson({
                parent: "kubejs:block/market_monitor",
            });
        })
        .model("kubejs:block/market_monitor")
        .rightClick((click) => {
            if (click.hand == "OFF_HAND") return;
            global.handleMarketMonitorRightClick(click);
        })
        .blockEntity((blockInfo) => {
            blockInfo.initialData({ plort: undefined });
            blockInfo.serverTick(600, 0, (entity) => {
                global.handleMarketMonitorTick(entity);
            });
        });
});
