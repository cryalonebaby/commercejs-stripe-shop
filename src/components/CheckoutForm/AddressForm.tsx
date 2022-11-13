import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material"
import { useForm, FormProvider } from 'react-hook-form'
import { useState, useEffect } from 'react'
import FormInput from "./CustomTextField"
import { Link } from "react-router-dom"
import { commerce } from "../../lib/commerce"

interface IProps {
  checkoutToken: any,
  next: Function
}

interface ISelect {
  id: string,
  label: string
}

const AddressForm = ({ checkoutToken, next }: IProps) => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')

  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')

  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')

  const methods = useForm()

  const countries: ISelect[] = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
  const subdivisions: ISelect[] = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
  const options: ISelect[] = shippingOptions.map((opt: any) => ({ id: opt.id, label: `${opt.description} - (${opt.price.formatted_with_symbol})` }))

  const fetchCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
    
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchOptions = async (checkoutTokenId: string, country: string, region: string) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First Name' />
            <FormInput name='lastName' label='Last Name' />
            <FormInput name='address1' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='ZIP / Postal code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} onChange={e => setShippingCountry(e.target.value)} fullWidth>
                {countries.map((country: ISelect) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}

              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} onChange={e => setShippingSubdivision(e.target.value)} fullWidth>
                {subdivisions.map((subdiv: ISelect) => (
                  <MenuItem key={subdiv.id} value={subdiv.id}>
                    {subdiv.label}
                  </MenuItem>
                ))}

              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} onChange={e => setShippingOption(e.target.value)} fullWidth>
                {options.map((opt: ISelect) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </MenuItem>
                ))}

              </Select>
            </Grid>
          </Grid>
          <br/>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
            <Button type='submit' variant='contained' color='primary'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm