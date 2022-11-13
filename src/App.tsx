import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { IProduct } from './models/products';
import './App.css';

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<any>({})
  const [order, setOrder] = useState<any>({})
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list<IProduct[]>()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    const cart = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleUpdateCartQty = async (productId: string, quantity: number) => {
    const cart = await commerce.cart.update(productId, {quantity})
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId: string) => {
    const cart = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const cart = await commerce.cart.refresh()
    console.log('Refresh', cart);
    
    setCart(cart)
  }

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: any) => {
    try {
      setErrorMessage('')
      setOrder({})
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (e: any) {
      setErrorMessage(e.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={
            <Products 
              apiProducts={products} 
              onAddToCart={handleAddToCart}
            />}
          />
          <Route 
            path='/cart' 
            element={
              <Cart 
                cart={cart} 
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path='/checkout'
            element={
              <Checkout 
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
