import { createLocalVue } from '@vue/test-utils'
import { Vuevent } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(Vuevent)

describe('Test window events', () => {
  test('Check if keydown event fires and calls our handler', () => {
    let vmRef = null

    const windowListeners = {
      keydown(e) {
        vmRef = this
      }
    }
  
    const keydownSpy = jest.spyOn(windowListeners, 'keydown')
  
    document.body.innerHTML = `<div id="app"></div>`

    const vm = new LocalVue({
      el: '#app',
      render: (h) => (<span>Hello World</span>),
      events: {
        window: {
          keydown: windowListeners.keydown
        }
      }
    })

    window.dispatchEvent(new KeyboardEvent('keydown'))
    window.dispatchEvent(new KeyboardEvent('keydown'))

    expect(keydownSpy).toHaveBeenCalledTimes(2)
    expect(vm._uid).toBe(vmRef._uid)

    vm.$destroy()
  })
})
