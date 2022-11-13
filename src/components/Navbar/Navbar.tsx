import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import s from './navbar.module.scss'

interface IProps {
  totalItems: number
}

const Navbar = ({ totalItems }: IProps) => {
  const location = useLocation()

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={s.navbar}>
          <Typography className={s.logo} component={Link} to='/' variant='h6'>
            Commerce.js
          </Typography>
          {/* Grow */}
          <div className={s.grow}></div>
          {location.pathname === '/' && (
            <div>
              <IconButton component={Link} to='/cart' aria-label='Show cart items'>
                <Badge badgeContent={totalItems} color='error'>
                  <ShoppingCart className={s.cart} />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar