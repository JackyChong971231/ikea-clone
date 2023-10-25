import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Campaigns } from './components/common/campaigns.jsx';
import { NavBar } from './components/common/navbar.jsx';
import PopUp from './components/popUp/popUp.jsx';

import { Home } from './pages/home.jsx';
import { Search } from './pages/search.jsx';
import { SignIn } from './pages/signIn.jsx';
import { SignUp } from './pages/signUp.jsx';
import { Wishlist } from './pages/wishlist.jsx';

import { SharedProvider } from './SharedContext';

function App() {

  return (
    <SharedProvider>
      <div className="ikea-clone">
        <Campaigns />
        <header className="ikea-clone__header">
          <NavBar />
        </header>
        <main className='ikea-clone__main'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Search />} />
              <Route path='/search' element={<Search />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/wishlist' element={<Wishlist />} />
            </Routes>
          </BrowserRouter>
          <PopUp />
        </main>
      </div>
    </SharedProvider>
  );
}

export default App;
