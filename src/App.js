/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Dashboard from './components/DashBoard/Dashboard';
import Employee from './components/Emloyee/Employee';
import Login from './components/Login/Login';
import Project from './components/Project/Project';

function App() {
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/employee" component={Employee} />
      </Switch>
    </Router>
  );
}

export default App;
