import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Campaigns } from './components/common/campaigns.jsx';
import { NavBar } from './components/common/navbar.jsx';

import { Home } from './pages/home.jsx';
import { Search } from './pages/search.jsx';

function App() {
  return (
    <div className="ikea-clone">
      <Campaigns />
      <header className="ikea-clone__header">
        <NavBar />
      </header>
      <main className='ikea-clone__main'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
