<script setup lang="ts">
import { toRefs } from 'vue'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}
// interface Product {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: {
//     id: number
//     name: string
//     image: string
//   }
//   images: [string]
// }

const props = defineProps<Props>()
const { product } = toRefs(props)
const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

const handleClick = () => {
  emit('add-to-cart', product.value)
}
</script>

<template>
  <el-card class="product">
    <template #header>
      <div class="card-header" v-if="Array.isArray(product.images) && product.images.length > 0">
        <img :src="product.images[0]" alt="" />
      </div>
    </template>
    <div class="card-body">
      <h3>{{ product.title }}</h3>
      <div class="card-text" ref="card-text">{{ product.description }}</div>
      <div>{{ product.price }}$</div>
    </div>

    <template #footer>
      <div class="card-footer">
        <el-button class="card-button" type="primary" @click="handleClick">
          Добавить в корзину</el-button
        >
      </div>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-footer {
  padding: 20px 0 0 0;
}
.card-button {
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
}
</style>
