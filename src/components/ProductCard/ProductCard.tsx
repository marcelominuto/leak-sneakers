import { Product } from "@/interface/interfaces"

import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product,
  onClick: () => void
}

export function ProductCard({ product, onClick}: ProductCardProps){
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgCont}>
        <img src={product.data.image_url} />
      </div>
      <div className={styles.information}>
        <span className={styles.title}>{product.value}</span>
        <span className={styles.sku}>{product.data.sku}</span>
      </div>
    </div>
  )
}