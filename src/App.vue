<script setup>
import NavBar from './components/NavBar.vue';
import Book from './components/Book.vue';
import Hero from './components/Hero.vue';
import FetchData from './components/FetchData.vue'
</script>

<template>
  <NavBar></NavBar>
  <Book></Book>
  <FetchData></FetchData>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
