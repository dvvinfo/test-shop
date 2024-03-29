// store/index.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '@/types/product'
import type { Order } from '@/types/order'
import type { User } from '@/types/user'

const initialCart = localStorage.getItem('cart')
const initialUser = localStorage.getItem('user')
const initialOrders = localStorage.getItem('orders')
const initialState = {
  user: initialUser ? JSON.parse(initialUser) : (null as User | null),
  cart: initialCart ? JSON.parse(initialCart) : [],
  orders: initialOrders ? JSON.parse(initialOrders) : ([] as Order[]),
  products: [] as Product[],
  total: 0,
  loading: false
}
export const useStore = defineStore({
  id: 'main',
  state: () => initialState,
  getters: {
    getUser: (state) => state.user,
    getProducts: (state) => state.products,
    getCart: (state) => state.cart,
    getOrders: (state) => state.orders,
    getTotalPrice: (state) => state.total,
    getLoading: (state) => state.loading
  },
  actions: {
    async fetchUser(userId: number) {
      this.loading = true
      try {
        const response = await axios.get<User>(`https://api.escuelajs.co/api/v1/users/${userId}`)
        const userData = response.data
        // Добавляем поле баланса с каким-то значением по умолчанию
        userData.balance = 10000
        if (response.status === 200) {
          this.loading = false
          this.user = userData
          localStorage.setItem('user', JSON.stringify(this.user))
          console.log('Пользователь загружен:', this.user)
        }
      } catch (error) {
        console.error('Ошибка при получении пользователя:', error)
      }
    },
    async fetchBalance(balance: number) {
      if (this.user) {
        this.user.balance = balance
        localStorage.setItem('user', JSON.stringify(this.user))
        console.log('Баланс пользователя обновлен:', this.user.balance)
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
        this.products = response.data
        console.log('Products loaded:', this.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    addToCart(product: Product) {
      // Проверяем, есть ли уже продукт в корзине
      const existingProduct = this.cart.find((item: Product) => item.id === product.id)

      if (existingProduct) {
        // Если продукт уже есть в корзине, увеличиваем количество
        existingProduct.quantity++
      } else {
        // Если продукт не был добавлен ранее, добавляем его в корзину
        this.cart.push({ ...product, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }

      console.log('Product added to cart:', product)
    },
    removeFromCart(product: Product) {
      const index = this.cart.findIndex((item: Product) => item.id === product.id)

      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--
        } else {
          this.cart.splice(index, 1)
        }
        this.getTotal()
        console.log('Product removed from cart:', product)

        // Проверяем, стала ли корзина пустой
        if (this.cart.length === 0) {
          localStorage.removeItem('cart')
        } else {
          // Если корзина не пуста, обновляем локальное хранилище
          localStorage.setItem('cart', JSON.stringify(this.cart))
        }
      }
    },
    getTotal() {
      this.total = this.cart.reduce(
        (acc: number, item: Product) => acc + Number(item.price) * Number(item.quantity),
        0
      )
      return this.total
    },
    getToOrder(){
      // Проверяем, есть ли уже заказ с такими же продуктами
      const existingOrderIndex: number = this.orders.findIndex((order: Order) =>
        order.products.every((product: Product) =>
          this.cart.some((cartProduct: Product) => cartProduct.id === product.id)
        )
      );

      if (existingOrderIndex === -1) {
        // Если заказа с такими же продуктами нет, добавляем новый заказ
        const order: Order = { id: uuidv4(), products: [], total: 0, isArchived: true };
        this.cart.forEach((cartProduct: Product) => {
          if (cartProduct.quantity !== undefined) { // Проверка на существование quantity
            order.products.push({ ...cartProduct });
            order.total += cartProduct.price * cartProduct.quantity;
          }
        });
        this.orders.push(order);
      } else {
        // Если заказ с такими же продуктами уже существует, обновляем его
        const existingOrder: Order = this.orders[existingOrderIndex];
        this.cart.forEach((cartProduct: Product) => {
          if (cartProduct.quantity !== undefined) { // Проверка на существование quantity
            const existingProduct: Product | undefined = existingOrder.products.find(
              (product: Product) => product.id === cartProduct.id
            );
            if (existingProduct) {
              // existingProduct.quantity += cartProduct.quantity;
              existingProduct.quantity = Math.max(existingProduct.quantity || 0, cartProduct.quantity); // Only keep the maximum quantity
            } else {
              existingOrder.products.push({ ...cartProduct });
            }
          }
        });
        existingOrder.total += this.total;
      }

      // Очищаем корзину после оформления заказа
      

      // Сохраняем изменения в localStorage
      localStorage.setItem('orders', JSON.stringify(this.orders));

      // Опционально: переход на страницу заказов
      // this.router.push('/orders');
    },
    checkout() {
      // Проверяем, есть ли товары в корзине
      if (this.cart.length === 0) {
        console.warn('Cannot checkout: Cart is empty')
        return
      }

      // Вычисляем общую стоимость товаров в корзине
      const total = this.getTotal()

      // Проверяем, достаточно ли у пользователя средств для оплаты
      if (this.user && total > this.user.balance) {
        console.warn('Cannot checkout: Insufficient balance')
        return
      }

      // Уменьшаем баланс пользователя на общую стоимость товаров
      if (this.user) {
        this.user.balance -= total
      }

      // Добавляем заказ в список заказов
      this.getToOrder()

      // Пересчитываем общую стоимость заказов
      this.total = this.calculateTotal()

      // Очищаем корзину
      this.cart = []
      localStorage.removeItem('cart')
      this.orders = []
      localStorage.removeItem('orders')
    },
    cancelOrder(order: Order) {
      // Возвращаем деньги на баланс пользователя
      if (!isNaN(order.total) && this.user) {
        this.user.balance += order.total
      }

      // Удаляем заказ из списка заказов
      this.orders = this.orders.filter((o: Order) => o.id !== order.id)

      // Пересчитываем общую стоимость заказов
      this.total = this.calculateTotal()
      this.orders = []
      localStorage.removeItem('orders')
    },

    calculateTotal() {
      return this.orders.reduce((acc: number, order: Order) => acc + order.total, 0)
    }
  }
})
