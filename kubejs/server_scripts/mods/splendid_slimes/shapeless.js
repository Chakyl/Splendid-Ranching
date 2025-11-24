ServerEvents.recipes(e => {
    e.remove({ output: 'splendid_slimes:corral_pane' })
    e.shapeless('splendid_slimes:corral_pane', ['splendid_slimes:corral_block'])
})