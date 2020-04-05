// Import vue component
import { Vuevent } from './plugin'

// install function executed by Vue.use()

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(Vuevent)
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()

// Export component by default
export { Vuevent }

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
