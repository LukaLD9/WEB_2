<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Chuck Norris Page</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      |
      <RouterLink to="/combat">Combat</RouterLink>
      |
      <RouterLink to="/about">About</RouterLink>
      |
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
    <br/>
  </header>
  <RouterView />
</template>

<style scoped>
nav a {
  font-size: 1.2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
nav a.router-link-exact-active {
  background-color: rgb(63, 8, 67);
}
</style>
