<template>
  <div>
    <HeaderPart />
    <router-view />
  </div>
</template>

<script>
import  HeaderPart from './components/HeaderPart.vue';


export default {
  name: 'App',
  components: {
    HeaderPart,
  },
};
</script>


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
