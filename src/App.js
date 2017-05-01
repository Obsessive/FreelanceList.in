import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProjectList from './containers/ProjectList'
import store from './store';
import AppBar from 'material-ui/AppBar';

// For Tap events on touch devices
injectTapEventPlugin();


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
            <div className="App">
              <AppBar title="FreelancerList"/>
              <div className="App-body">
                <Route exact path="/" component={ProjectList}/>
              </div>
            </div>
          </MuiThemeProvider>
        </Router>  
      </Provider>
    );
  }
}

export default App;
