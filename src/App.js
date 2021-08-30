import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Register from './Components/register';
import TeamDetail from './Components/detail';
import PlayerDetail from './Components/player';
import AddPlayer from './Components/addPlayer';
import Footer from './Components/footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path='/detailPage/:id' component={TeamDetail} />
          <Route path='/playerPage/:id' component={PlayerDetail} />
          <Route path='/addPlayer' component={AddPlayer} />
        </Switch>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
