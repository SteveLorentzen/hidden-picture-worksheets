import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import WorksheetCreator from './components/WorksheetCreator/WorksheetCreator';
import Logout from './components/Auth/Logout/Logout';
import { useAuth0 } from '@auth0/auth0-react'

function App() {

  const { isAuthenticated } = useAuth0();

  // const logoutHandler = () => {
  //   setIsAuth(false);
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('expiration');
  // }

  // const setAutoLogout = milliseconds => {
  //   setTimeout(() => {
  //     logoutHandler();
  //   }, milliseconds)
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const expiration = localStorage.getItem('expiration');
  //   if (!token || !expiration) {
  //     return;
  //   }
  //   if (new Date(expiration) <= new Date()) {
  //     logoutHandler();
  //     return;
  //   }
  //   const userId = localStorage.getItem('userId');
  //   const remainingMilliseconds = new Date(expiration).getTime() - new Date().getTime();
  //   setIsAuth(true);
  //   setUser({
  //     userId,
  //     token,
  //   })
  //   setAutoLogout(remainingMilliseconds);
  // }, [])

  return (
    <div className="App">
      <header>
        <nav>
          <ul style={{
            display: 'flex',
          }}>
            {isAuthenticated ? <li><Logout /></li> : null}
            {/* <li>
              {isAuth ? <Link to='/worksheets'>Worksheets</Link> : null}
            </li> */}
          </ul>
        </nav>
      </header>


      <Route path='/' exact render={props => <Auth />} />
      <Route path='/logout' render={props => <Logout />} />
      {isAuthenticated ? <Route path='/worksheets' render={props => <WorksheetCreator />} /> : null}

    </div>
  );
}

export default App;
