<script>
import { getName } from '@/api';
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id);
  },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    test() {
      return this.$store.state.items.test;
    },
  },
  methods: {
    hc() {
      getName().then((res) => {
        this.name = res.data.name;
      });
    },
  },
};
</script>

<template>
  <div>
    <div>this is home</div>
    <div>
      {{ test }}
    </div>
    <button @click="hc">click me</button>
    <div>name: {{ name }}</div>
  </div>
</template>
