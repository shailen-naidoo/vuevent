<template>
  <p>Hello Mouseover event - Check your console - It works for 5 second afetr reload</p>
</template>

<script>
export default {
  events: {
    document: {
      'mouseover.once'() {
        console.log('Mouseover!')
      }
    },
    window: {
      'click'(e) {
        console.log(e)
      }
    }
  },
}
</script>
