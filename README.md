---
sidebar: true
---

# Vuevent

🔥 A nifty way of handling global events in Vue components. Under *3kb* in size!

![](https://img.shields.io/npm/v/vueventjs)
![](https://img.shields.io/npm/dw/vueventjs)
[![codecov](https://codecov.io/gh/ShailenNaidoo/vuevent/branch/master/graph/badge.svg)](https://codecov.io/gh/ShailenNaidoo/vuevent)
![](https://img.shields.io/github/issues/ShailenNaidoo/vuevent)

## Installation

#### Via CDN

```html
<script src="https://unpkg.com/vueventjs@1.1.0/dist/vuevent.min.js"></script>
```

The plugin will automatically register itself using `Vue.use()`

#### Via NPM

```shell
$ npm install vueventjs --save-dev
```

```javascript
import Vue from 'vue'
import { Vuevent } from 'vueventjs'

Vue.use(Vuevent)
```

## Demo

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="Naidoo" data-slug-hash="xxGMzvB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue Plugin">
  <span>See the Pen <a href="https://codepen.io/Naidoo/pen/xxGMzvB">
  Vue Plugin</a> by Shailen (<a href="https://codepen.io/Naidoo">@Naidoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Motivation

In Vue we have very easy access to events on **Elements** but it's not so easy to listen to global events within the context of Vue, if we wanted to add a event listener for *pause* we would have to do this:

```vue
<script>
export default {
  methods: {
    onPause() {
      console.log('Vue instance', this)
    }
  },
  mounted() {
    document.addEventListener('pause', this.onPause)
  },
  destroyed() {
    document.removeEventListener('pause', this.onPause)
  }
}
</script>
```

For some reason, I just do not think that this looks and feels like a Vue way to add global event listeners and that's why I came up with **Vuevent**

## How to use

### Add listeners

Vuevent allows you to add a `event` property to any Vue component and you can target either the `document` or `window` globals, you just create a function with the same name as the event you want to listen to

```vue
<script>
export default {
  events: {
    document: {
      click(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      },
    },
    window: {
      resize(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      }
    }
  }
}
</script>
```

### Remove listeners

Vuevent wouldn't be as cool if it did not allow you to remove event listeners, you can do this:

```vue
<script>
export default {
  events: {
    document: {
      click(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      },
    },
    window: {
      resize(e) {
        console.log('Event data', e)
        console.log('Vue instance', this)
      }
    }
  },
  mounted() {
    this.$events.remove.document.click()
    this.$events.remove.window.resize()
  }
}
</script>
```

:::tip
Vuevent automatically removes all listeners that we registered in a component when the component is destroyed
:::

### Modifiers <Badge text="+v1.1.0" />

Just like you can do on HTML tags in Vue, you can now use [Event Modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers) with Vuevent. Here are the list of supported modifiers:

* `.once`
* `.passive`
* `.capture`
* `.prevent`
* `.stop`

```vue
<script>
export default {
  events: {
    document: {
      'click.once'(e) {
        // This event listener is only called once
      },
    },
  },
}
</script>
```
