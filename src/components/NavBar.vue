<script setup lang="ts">
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
    menu: Menu[]
}
interface Menu {
  title: string
  link: string
}
const props = defineProps<Props>()
const { menu } = toRefs(props)
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item" v-for="item in menu" :key="item.title">
        <router-link :to="item.link" class="nav-link">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}
.nav-item {
  list-style: none;
}
.nav-link {
  text-decoration: none;
  color: #000;
  font-size: 18px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
.router-link-active {
  color: #79bbff;
}
</style>
