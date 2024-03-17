import type { Product } from './product'
interface Order {
  id: string
  total: number
  isArchived: boolean
  products: Product[]
}

export { type Order }
