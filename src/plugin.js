const modifiersMap = new Map([
  ['once', (e, target, eventName, newHandler) => target.removeEventListener(eventName, newHandler)],
  ['prevent', (e) => e.preventDefault()],
])

function createGlobalEvents(targetName, target, events) {
  const vm = this

  Object.entries(events).forEach(([event, handler]) => {
    const [eventName, ...modifiers] = event.split('.')

    const newHandler = function newHandler(e, ...args) {
      modifiers.forEach((modifier) => {
        modifiersMap.get(modifier)(e, target, eventName, newHandler)
      })

      handler.apply(vm, [e, ...args])
    }

    target.addEventListener(eventName, newHandler)

    this.$events = {
      ...this.$events,
      remove: {
        ...this.$events.remove,
        [targetName]: {
          ...this.$events[targetName],
          [eventName]: () => target.removeEventListener(eventName, newHandler),
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
