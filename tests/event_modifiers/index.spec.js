import { createLocalVue } from '@vue/test-utils'
import { Vuevent } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(Vuevent)

describe('Test Event Modifiers', () => {
  test('Check if [ once ] modifier works', () => {
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
          'keydown.once': windowListeners.keydown
        }
      }
    })

    window.dispatchEvent(new KeyboardEvent('keydown'))
    window.dispatchEvent(new KeyboardEvent('keydown'))

    expect(keydownSpy).toHaveBeenCalledTimes(1)
    expect(vm._uid).toBe(vmRef._uid)

    vm.$destroy()
  })

  test('Check if [ prevent ] modifier works', () => {
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
          'keydown.prevent': windowListeners.keydown
        }
      }
    })

    const keydownEvent = new KeyboardEvent('keydown')

    const keydownEventSpy = jest.spyOn(keydownEvent, 'preventDefault')

    window.dispatchEvent(keydownEvent)
    window.dispatchEvent(keydownEvent)

    expect(keydownSpy).toHaveBeenCalledTimes(2)
    expect(keydownEventSpy).toBeCalledTimes(2)
    expect(vm._uid).toBe(vmRef._uid)

    vm.$destroy()
  })
})