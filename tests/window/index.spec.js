import { createLocalVue } from '@vue/test-utils'
import { Vuevent } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(Vuevent)

describe('Test window events', () => {
  test('Check if keypress event fires and keypress our handler', () => {
    let vmRef = null

    const windowListeners = {
      keypress(e) {
        vmRef = this
      }
    }
  
    const keypressSpy = jest.spyOn(windowListeners, 'keypress')
  
    document.body.innerHTML = `<div id="app"></div>`

    const vm = new LocalVue({
      el: '#app',
      render: (h) => (<span>Hello World</span>),
      events: {
        window: {
          keypress: windowListeners.keypress
        }
      }
    })

    window.dispatchEvent(new KeyboardEvent('keypress'))

    expect(keypressSpy).toHaveBeenCalledTimes(1)
    expect(vm._uid).toBe(vmRef._uid)
  })
})
