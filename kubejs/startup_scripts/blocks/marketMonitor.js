const getValuePrefix = (mult, isHot) => {
    if (isHot) return "§6🔥 ";
    return mult < 0 ? '§c' : '§a'
}

global.handleMarketMonitorTick = (entity, forced) => {
    const { block, level } = entity;
    let nbt = block.getEntityData();
    let plort = nbt.data.plort;
    if (!plort) return;

    plort = plort.path
    const slimeData = level.getServer().persistentData['slime_value_data']

    if (slimeData && slimeData[plort] === undefined) return
    let plortData = slimeData[plort]
    let mult = plortData.multPercent;
    let value = Number(plortData.currentValue);
    if (value !== nbt.data.value) {
        nbt.merge({ data: { value: value } });
        block.setEntityData(nbt);
        let plortText = `${getValuePrefix(mult, plortData.isHot)}${global.calculateCost(plortData.currentValue, 1, 1)} ${mult < 0 ? '↓' : '↑'}`
        
        global.clearOldDisplay(block, "market_monitor_text");
        global.clearOldDisplay(block, "market_monitor_plort");

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
    }
};

global.handleMarketMonitorRightClick = (click) => {
    const { block, item } = click;
    if (item.id.equals("splendid_slimes:plort")) {
        let nbt = block.getEntityData();
        nbt.merge({ data: { plort: item.nbt.plort.id } });
        block.setEntityData(nbt);
        global.handleMarketMonitorTick(click, true)
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
            blockInfo.initialData({ plort: undefined, value: -1 });
            blockInfo.serverTick(20, 0, (entity) => {
                global.handleMarketMonitorTick(entity);
            });
        });
});
