import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Login from './components/Login';
import Homepage from './components/Homepage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
