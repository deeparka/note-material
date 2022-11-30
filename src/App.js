import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './components/Notes'
import Create from './components/Create'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    secondary: teal
  },
  typography: {
    fontFamily: "Lato",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
