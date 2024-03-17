<script setup lang="ts">
import { onMounted, h } from 'vue';
import { ElNotification } from 'element-plus'
import ProductCard from '@/components/ProductCard.vue';
import { useStore } from '@/stores/index'
import type { Product } from '@/types/product';

const store = useStore()

onMounted(async() => {
    await store.fetchProducts()
})

const openNotification = () => {
  ElNotification({
    title: 'The product',
    message: h('i', { style: 'color: teal' }, 'has been added to the cart'),
  })
}
const addToCart = (product: Product) => {
  store.addToCart(product);
  openNotification()
  store.getTotal()
  console.log(product);
};
</script>

<template>
    <h1>Products</h1>
    <el-skeleton :rows="5" animated v-if="store.getProducts.length === 0" />
    <div class="products" v-if="store.getProducts.length > 0">
        <ProductCard v-for="product in store.getProducts" :key="product.id" :product="product" @add-to-cart="addToCart" />

    </div>
</template>



<style scoped>
.products{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px 0;
    
}
</style>