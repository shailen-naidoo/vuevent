import { createLocalVue } from '@vue/test-utils'
import { Vuevent } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(Vuevent)

describe('Test document events', () => {
  test('Check if click event fires and calls our handler', () => {
    let vmRef = null

    const documentListeners = {
      click(e) {
        vmRef = this
      }
    }
  
    const clickSpy = jest.spyOn(documentListeners, 'click')
  
    document.body.innerHTML = `<div id="app"></div>`

    const vm = new LocalVue({
      el: '#app',
      render: (h) => (<span>Hello World</span>),
      events: {
        document: {
          click: documentListeners.click
        }
      }
    })

    document.dispatchEvent(new MouseEvent('click'))

    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(vm._uid).toBe(vmRef._uid)
  })
})
