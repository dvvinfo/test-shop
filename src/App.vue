<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useStore } from '@/stores/index'
import NavBar from './components/NavBar.vue'
const store = useStore()

const menu = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Products',
    link: '/products'
  },
  {
    title: 'Cart',
    link: '/cart'
  },

  {
    title: 'Orders',
    link: '/orders'
  }
]
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-container">
          <router-link to="/" class="logo">Shop</router-link>
          <NavBar :menu="menu" />
        </div>

        <div class="" v-if="store.user">
          <el-avatar :size="40" class="card-avatar">
            <img :src="store.user.avatar" />
          </el-avatar>
          <div class="header-user">
            <span>{{ store.user?.name }}</span
            ><span
              ><strong>{{ store.user?.balance }}$</strong></span
            >
          </div>
        </div>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  display: inline-flex;
  min-height: 100vh;
  width: 100%;
}
.header {
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-container{
  display: flex;
  align-items: center;
}
.header-user {
  display: flex;
  gap: 10px;
}
.logo {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
}
</style>
