<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchLevel');
  },
  computed: {
    level() {
      return this.$store.state.items.level || [];
    },
  },
};
</script>
<template>
  <div>
    <div>this is about</div>

    <div>
      <li v-for="item in level" :key="item.value">{{ item.name }}-{{ item.value }}</li>
    </div>
  </div>
</template>
