import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { format } from 'date-fns'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        draw: {
            width: drawerWidth
        },
        drawPaper: {
            width: drawerWidth
        },
        root: {
            display: "flex"
        },
        active: {
            background: "#f4f4f4"
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        date: {
            flexGrow: 1
        },
        toolbar: theme.mixins.toolbar,
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

function Layout({children}) {
    const classes = useStyles()

    const history = useHistory()

    const location = useLocation()

    console.log(location.pathname)

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary'/>,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color='secondary'/>,
            path: '/create'
        }
    ]

  return (
    <div className={classes.root}>

        {/* app bar */}
        <AppBar position='fixed' className={classes.appbar} elevation={0} color='secondary'>
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>
                <Typography>
                    John Doe
                </Typography>
                <Avatar src='../images/main.jpg' className={classes.avatar} />
            </Toolbar>
        </AppBar>

        {/* side drawer */}
        <Drawer className={classes.draw} variant="permanent" anchor='left' classes={{
            paper: classes.drawPaper
        }}>
            <div>
                <Typography variant="h4" className={classes.title}>Notes</Typography>
            </div>

            {/* list / links section */}
            <List>
                {menuItems.map(item => (
                    <ListItem button key={item.text} onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>

        {/* main content */}
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div>
    </div>
  )
}

export default Layout