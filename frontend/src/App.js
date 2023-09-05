import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Campaigns } from './components/common/campaigns.jsx';
import { NavBar } from './components/common/navbar.jsx';
import { ProfileDropdown } from './components/common/profileDropdown.jsx';

import { Home } from './pages/home.jsx';
import { Search } from './pages/search.jsx';
import { SignIn } from './pages/signIn.jsx';

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
              <Route path='/sign-in' element={<SignIn />} />
              {/* <Route path='/search' element={<Search />} /> */}
            </Routes>
          </BrowserRouter>
          <ProfileDropdown />
        </main>
      </div>
    </SharedProvider>
  );
}

export default App;
