import { DeleteOutlined } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { blue, green, pink, yellow } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if (note.category === 'work')
                return yellow[700]
            if (note.category === 'money') 
                return green[500]
            if (note.category === 'reminders') 
                return blue[500]
            return pink[500]
        }
    }
})

function NoteCard({note, handleDelete}) {
    const classes = useStyles(note)

  return (
    <div>
        <Card elevation={1}>
            <CardHeader
            avatar={
                <Avatar className={classes.avatar}>
                    {note.category[0].toUpperCase()}
                </Avatar>
            }
            action={
                <IconButton onClick={() => handleDelete(note.id)}>
                    <DeleteOutlined />
                </IconButton>
            }
            title={note.title}
            subheader={note.category} />
            <CardContent>
                <Typography variant='body2' color="textSecondary">
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}

export default NoteCard