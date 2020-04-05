const modifiersMap = new Map([
  ['prevent', (e) => e.preventDefault()],
  ['stop', (e) => e.stopPropagation()],
])

function createGlobalEvents(targetName, target, events) {
  const vm = this

  Object.entries(events).forEach(([event, handler]) => {
    const [eventName, ...modifiers] = event.split('.')

    const newHandler = function newHandler(e, ...args) {
      modifiers.forEach((modifier) => {
        const fn = modifiersMap.get(modifier)

        if (fn) {
          fn(e, target, eventName, newHandler)
        }
      })

      handler.apply(vm, [e, ...args])
    }

    const options = {}

    modifiers.forEach((modifier) => {
      switch (modifier) {
        case 'once':
          options.once = true
          break;
        case 'passive':
          options.passive = true
          break;
        case 'capture':
          options.capture = true
          break;
      }
    })

    target.addEventListener(eventName, newHandler, options)

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
