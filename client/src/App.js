import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import DetailDog from './components/DetailDog/DetailDog';
import Home from './components/Home/Home';
import LandingMain from './components/LandingMain/LandingMain.jsx';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path={'/home/createDog'} component={CreateDog} />
        <Route path={'/home/:id'} component={DetailDog} />
        <Route path={'/home'} component={Home} />
        <Route path={'/'} component={LandingMain} />
      </Switch>
    </div>  
  );
}

export default App;
