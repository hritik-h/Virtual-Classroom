import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/home' component={HomeComponent} />
        <Route path='/login' component={LoginComponent} />
        <Route path='/register' component={RegisterComponent} />
        <Route exact path='/' component={LandingPage} />
      </BrowserRouter>

    </div>
  );
}

export default App;
