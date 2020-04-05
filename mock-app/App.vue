<template>
  <p>Hello Mouseover event - Check your console - It works for 5 second afetr reload</p>
</template>

<script>
export default {
  events: {
    document: {
      mouseover() {
        console.log('Mouseover!')
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$events.remove.document.mouseover()
    }, 5000)
  }
}
</script>
