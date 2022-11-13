import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@mui/material'
import s from './cartitem.module.scss'

interface IProps {
  item: any,
  handleUpdateCartQty: Function,
  handleRemoveFromCart: Function,
}

const CartItem = ({item, handleRemoveFromCart, handleUpdateCartQty}: IProps) => {
  return (
    <Card>
      <CardMedia
        style={{height: 0, paddingTop: '56.25%'}}
        image={item.image.url}
      />
      <CardContent className={s.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={s.cardActions}>
        <div className={s.buttons}>
          <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
          <Typography className={s.buttonsQty}>{item.quantity}</Typography>
          <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
        </div>
        <Button 
          variant='contained' 
          type='button' 
          color='error'
          onClick={() => handleRemoveFromCart(item.id)}
        >Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem