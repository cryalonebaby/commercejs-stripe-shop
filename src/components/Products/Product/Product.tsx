import {Box, Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@mui/material'
import { IProduct } from '../../../models/products'
import { AddShoppingCart } from '@mui/icons-material'
import s from './product.module.scss'

interface IProps {
  product: IProduct,
  onAddToCart: Function
}

const Product = ({product, onAddToCart}: IProps) => {
  return (
    <Card className={s.root}>
      <CardMedia 
        style={{height: 0, paddingTop: '56.25%'}}
        image={product.image.url} 
        title={product.name}
      />
      <CardContent>
        <Box className={s.cardContent}>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </Box>
        <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' color='textSecondary'/>
      </CardContent>
      <CardActions className={s.cardActions} disableSpacing>
        <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product