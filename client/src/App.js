import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import Home from './components/Home/Home';
import LandingMain from './components/LandingMain/LandingMain.jsx';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path={'/home'} component={Home} />
        <Route exact path={'/createDog'} component={CreateDog} />
        <Route exact path={'/'} component={LandingMain} />
      </Switch>
    </div>
  );
}

export default App;
