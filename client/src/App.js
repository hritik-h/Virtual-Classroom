
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeComponent from './Home'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={HomeComponent} />
          <Route path='/login' component={LoginComponent} />
          <Route path='/register' component={RegisterComponent} />
          <Route exact path='/' component={LandingPage} />
          <Route path='*' component={LandingPage} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
