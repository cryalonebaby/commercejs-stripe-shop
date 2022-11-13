import { TextField, Grid } from "@mui/material"
import {useFormContext, Controller} from 'react-hook-form'

interface IProps {
  name: string,
  label: string
}

const FormInput = ({name, label}: IProps) => {
  const {control} = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({field}) => <TextField {...field} label={label} variant='standard' fullWidth required/>}
        defaultValue=''
        control={control}
        name={name}
        rules={{required: true}}
      />
    </Grid>
  )
}

export default FormInput