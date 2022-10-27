<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id);
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
  },
};
</script>

<template>
  <div>
    this is home
    {{ items }}
  </div>
</template>
