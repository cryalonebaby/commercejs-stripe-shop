import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import s from './checkout.module.scss'

interface IProps {
  cart: any,
  order: any,
  handleCaptureCheckout: Function,
  error: string
}

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, handleCaptureCheckout, error }: IProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  const navigate = useNavigate()

  // EXAMPLE OF GETTING DYNAMICALLY DATA
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

        setCheckoutToken(token)
      } catch (e) {
        navigate('/')
      }
    }
    generateToken()
  }, [cart])

  const nextStep = () => setActiveStep(prev => prev + 1)
  const backStep = () => setActiveStep(prev => prev - 1)

  const next = (data: any) => {
    setShippingData(data)
    nextStep()
  }

  // set finished state after timeout
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }

  const Confirmation = () => order.customer 
  ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider />
        <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for your purchase</Typography>
        <Divider />
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  ) : (
    <div>
      <CircularProgress />
    </div>
  )

  const Error = () => (
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  )

  // CHECK IF TOKEN EXISTS
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      backStep={backStep}
      nextStep={nextStep}
      handleCaptureCheckout={handleCaptureCheckout}
      timeout={timeout}
    />

  const Bill = () => error
    ? <Error/>
    : <Confirmation/>

  return (
    <>
      <CssBaseline/>
      <div className={s.toolbar}></div>
      <main className={s.layout}>
        <Paper className={s.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={s.stepper}>
            {steps.map((step: string) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Bill /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout