import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './Page/Main/Main';
import SignIn from './Page/SignIn/SignIn';
import { Context } from './context/Context';


function App() {
  const{user} = useContext(Context)

  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
        {user ? <Main/> :<SignIn /> }
          </Route>

        <Route path='/writer'>
        {user ? <Main /> :<SignIn /> }
        </Route>


    
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
