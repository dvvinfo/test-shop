<script setup lang="ts">
import { toRefs} from 'vue'
import type { Product } from '@/types/product'
import { useStore } from '@/stores/index'
const store = useStore()

interface ProductCart {
  product:Product
}
const props = defineProps<ProductCart>()
const { product } = toRefs(props)
// const emit = defineEmits<{
//   (e: 'countPlus', product: number): void
//   (e: 'countMinus', product: number): void
// }>()

const handleClickPlus = () => {

   product.value.quantity++
   store.getTotal()
}
const handleClickMinus = () => {
  if (product.value.quantity > 0) {
    product.value.quantity--
    store.getTotal()

  }
}
const handleClickelete = (product: Product) => {
  store.removeFromCart(product)
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
        <div class="card-footer-content">
        <el-button class="card-button" type="primary" @click="handleClickPlus"> +</el-button>
        <span class="card-quantity">{{ product.quantity }}</span>
        <el-button class="card-button" type="primary" @click="handleClickMinus"> -</el-button>
      </div>
        <el-button class="card-button" type="primary" @click="handleClickelete(product)"> Delete</el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.card-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-footer-content{
  display: flex;
  align-items: center;
  gap: 15px;
}
.card-quantity {
  font-weight: 500;
}
</style>
