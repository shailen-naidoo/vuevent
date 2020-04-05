function createGlobalEvents(targetName, target, events) {
  Object.entries(events).forEach(([event, handler]) => {
    const newHandler = handler.bind(this)

    target.addEventListener(event, newHandler)

    this.$events = {
      ...this.$events,
      remove: {
        ...this.$events.remove,
        [targetName]: {
          ...this.$events[targetName],
          [event]: () => target.removeEventListener(event, newHandler),
        },
      },
    }

    this.$options.destroyed = [
      ...this.$options.destroyed,
      () => {
        Object.values(this.$events.remove[targetName]).forEach((cb) => cb())
      },
    ]
  })
}

const Vuevent = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const vm = this

        const { events = {} } = vm.$options
        const { document: documentEvents = {}, window: windowEvents = {} } = events

        if (!vm.$events) {
          vm.$events = {
            remove: {
              window: {},
              document: {},
            },
          }
        }

        if (!vm.$options.destroyed) {
          vm.$options.destroyed = []
        }

        createGlobalEvents.apply(vm, ['window', window, windowEvents])
        createGlobalEvents.apply(vm, ['document', document, documentEvents])
      },
    })
  },
}

export { Vuevent }
