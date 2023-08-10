import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Campaigns } from './components/common/campaigns.jsx';
import { NavBar} from './components/common/navbar.jsx';

function App() {
  return (
    <div className="ikea-clone">
      <Campaigns />
      <header className="ikea-clone__header">
        <NavBar />
      </header>
    </div>
  );
}

export default App;
