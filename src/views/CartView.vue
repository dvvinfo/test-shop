<script setup lang="ts">
import ProductCart from '@/components/ProductCart.vue';
import { useStore } from '@/stores/index'
import { computed } from 'vue';
const store = useStore()

const totalPrice = computed(() => store.getTotalPrice);

</script>

<template>
    <h1> Cart</h1>
    <div class="cart" v-if="store.getCart.length > 0">
<ProductCart v-for="product in store.getCart" :key="product.id" :product="product"  />
<el-card class="cart-total">
    <div class="cart-total-content">
    <h3>Сумма: {{ totalPrice }}$</h3>
    <el-button type="primary" @click="store.getToOrder">Place an order</el-button>
</div>
</el-card>
    </div>
    <div class="cart-block" v-else>The basket is empty</div>
</template>

<style scoped lang="scss">
.cart{
    padding: 20px 0;
}
.cart-total{
    margin-top: 20px;
}
.cart-total-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.cart-block{
    margin-top: 20px;
}

</style>