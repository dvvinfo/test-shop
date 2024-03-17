<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { ElNotification } from 'element-plus'
const store = useStore()
import { useStore } from '@/stores/index'
import type { Order } from '@/types/order'

onBeforeMount(async () => {
  await store.fetchProducts()
  store.getTotal()
})

const placeOrder = () => {
  store.checkout()
  checkoutSuccess()
}
const cancelOrder = (order: Order) => {
  store.cancelOrder(order)
}

const checkoutSuccess = () => {
  ElNotification.success({
    title: 'Success',
    message: 'The order has been successfully placed',
    showClose: false
  })
}
</script>

<template>
  <h1>Orders</h1>
  <div class="cart" v-if="store.getOrders.length > 0">
    <div class="cart-list">
      <el-card class="cart-item" v-for="order in store.getOrders" :key="order.id">
        <div class="cart-item-body" v-for="(product, i) in order.products" :key="i">
          <h3>{{ product.title }}</h3>
          <p>{{ product.price }}$</p>
        </div>
      </el-card>
    </div>
    <el-card class="cart-total">
      <div class="cart-total-content">
        <div class="">
          <el-button type="primary" @click="placeOrder">Place an order</el-button>
          <el-button type="primary" @click="cancelOrder">Cancel</el-button>
        </div>
        <h3>Сумма: {{ store.getTotalPrice }}$</h3>
      </div>
    </el-card>
  </div>
  <div class="cart-block" v-else>There are no orders</div>
</template>

<style scoped lang="scss">
.cart {
  padding: 20px 0;
}
.cart-total {
  margin-top: 20px;
}
.cart-total-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-block {
  margin-top: 20px;
}
.cart-item-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
