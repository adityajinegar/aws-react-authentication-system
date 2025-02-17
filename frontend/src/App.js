import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='header'>
          <NavLink exact activeClassName='active' to='/'>
            Home
          </NavLink>
          <NavLink exact activeClassName='active' to='/register'>
            Register
          </NavLink>
          <NavLink exact activeClassName='active' to='/login'>
            Login
          </NavLink>
          <NavLink exact activeClassName='active' to='/premium-content'>
            Premium Content
          </NavLink>
        </div>
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/premium-content' element={<PremiumContent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
