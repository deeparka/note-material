import React from 'react'
import { Button, Typography, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, Container } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()

  const [title, setTitle] = useState(``)
  const [details, setDetails] = useState(``)
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState(``)

  function handleSubmit(event) {
    event.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if (title === '') {
      setTitleError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      // console.log(title, details, category)
      fetch(`http://localhost:8000/notes`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title, details, category})
      })
      .then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography variant='h6' component="h2" gutterBottom color="textSecondary">
        Create a new Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          onChange={event => setTitle(event.target.value)}
          error={titleError}
        />

        <TextField
          className={classes.field}
          label='Details'
          variant='outlined'
          color='secondary'
          fullWidth
          multiline
          rows={4}
          required
          onChange={event => setDetails(event.target.value)}
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={event => setCategory(event.target.value)}>
            <FormControlLabel value ="money" control={<Radio/>} label="Money" />
            <FormControlLabel value ="todos" control={<Radio/>} label="Todos" />
            <FormControlLabel value ="reminders" control={<Radio/>} label="Reminders" />
            <FormControlLabel value ="work" control={<Radio/>} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button type='submit' variant='contained' color='secondary' endIcon={<SendIcon />}>Submit</Button>
      </form>
    </Container>
  )
}
