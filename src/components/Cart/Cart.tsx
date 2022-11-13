import { Container, Typography, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import s from './cart.module.scss'
import CartItem from './CartItem/CartItem'

interface IProps {
  cart: any
  handleUpdateCartQty: Function,
  handleRemoveFromCart: Function,
  handleEmptyCart: Function,
}

const Cart = ({cart, handleRemoveFromCart, handleUpdateCartQty, handleEmptyCart}: IProps) => {

  const EmptyCard = () => (
    <Typography variant='subtitle1'>
      You have no items in the cart.
      <Link className={s.link} to='/'> Start adding some</Link>
    </Typography>
  )

  const FilledCard = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item: any) => (
          <Grid key={item.id} item xs={12} sm={4}>
            <CartItem 
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
            />
          </Grid>
        ))}
      </Grid>
      <div className={s.cardDetails}>
        <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button 
            className={s.emptyButton} 
            size='large' 
            type='button' 
            variant='contained' 
            color='secondary'
            onClick={() => handleEmptyCart()}
          >Empty Cart</Button>
          <Button 
            component={Link} 
            to="/checkout"
            className={s.checkoutButton} 
            size='large' 
            type='button' 
            variant='contained' 
            color='primary'
          >Checkout</Button>
        </div>
      </div>
    </>
  )

  if(!cart.line_items) return <p>'Loading...'</p>

  return (
    <Container>
      <div className={s.toolbar}/>
      <Typography className={s.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
      {!cart.line_items.length ? <EmptyCard/> : <FilledCard/>}
    </Container>
  )
}

export default Cart