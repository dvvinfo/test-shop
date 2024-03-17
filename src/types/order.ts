import type { Product } from './product'
interface Order {
  id: number
  total: number
  isArchived: boolean
  products: Product[]
}

export { type Order }
