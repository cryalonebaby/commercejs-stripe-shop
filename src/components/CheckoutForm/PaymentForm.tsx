import { Typography, Button, Divider } from '@mui/material'
import { Elements, ElementsConsumer, CardElement} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

interface IProps {
  shippingData: any,
  checkoutToken: any,
  backStep: Function,
  nextStep: Function,
  handleCaptureCheckout: Function,
  timeout: Function
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ? process.env.REACT_APP_STRIPE_PUBLIC_KEY : '')

const PaymentForm = ({shippingData, checkoutToken, backStep, nextStep, handleCaptureCheckout, timeout}: IProps) => {

  const handleSubmit = async (e: any, elements: any, stripe: any) => {
    e.preventDefault()

    if(!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})

    if(error) {
      console.log(error);
    } else {
      console.log('payment', paymentMethod);
      
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: {shipping_method: shippingData.shippingOption},
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }

      handleCaptureCheckout(checkoutToken.id, orderData)

      // set delay
      timeout()

      nextStep()
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement/>
              <br/><br/>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={() => backStep( )}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm