import { Product } from "@/interface/interfaces"

import styles from './ProductCard.module.css'
import placeholder from '../../../public/placeholder.png'

interface ProductCardProps {
  product: Product,
  onClick: () => void
}

export function ProductCard({ product, onClick}: ProductCardProps){
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgCont}>
        <img src={product.data.image_url ?? placeholder.src} className={styles.image}/>
      </div>
      <div className={styles.information}>
        <span className={styles.title}>{product.value}</span>
        <span className={styles.sku}>{product.data.sku}</span>
      </div>
    </div>
  )
}