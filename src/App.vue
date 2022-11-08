<script>
export default {
  name: 'App',
};
</script>

<template>
  <div id="app">
    <router-link to="/">Go to Home</router-link>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <router-link to="/about">Go to About</router-link>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
