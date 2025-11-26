BlockEvents.broken("kubejs:market_monitor", (e) => {
  global.clearOldTextDisplay(e.block, "market_monitor_text");
  global.clearOldTextDisplay(e.block, "market_monitor_plort");
});
