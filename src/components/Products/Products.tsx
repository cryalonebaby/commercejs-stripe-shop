import {Grid} from '@mui/material'
import Product from './Product/Product'
import { IProduct } from '../../models/products'
import s from './products.module.scss'

interface IProps {
  apiProducts: IProduct[],
  onAddToCart: Function
}

// export interface IProduct {
//   id: number,
//   name: string,
//   description: string,
//   price: string,
//   image: string
// }

// const products: IProduct[] = [
//   {id: 1, name: 'Shoes', description: 'Running shoes', price: '$5', image: 'https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg'},
//   {id: 2, name: 'Macbook', description: 'Apple macbook', price: '$999', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80'},
//   {id: 3, name: 'Jacket', description: 'Snake skin jacket', price: '$33', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80'},
// ]

const Products = ({apiProducts, onAddToCart}: IProps) => {
  
  return (
    <main className={s.content}>
      <div className={s.toolbar}></div>
      <Grid container justifyContent='center' spacing={4}>
        {apiProducts.map((prod: any) => {
          return (
            <Grid 
              key={prod.id} 
              xs={12}
              sm={6}
              md={4}
              lg={3}
              item
            >
            <Product
              product={prod}
              onAddToCart={onAddToCart}
            />
          </Grid>
          )
        })}
      </Grid>
    </main>
  )
}

export default Products