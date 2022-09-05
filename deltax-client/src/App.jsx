
import './App.css';
import {Routes,Route} from "react-router-dom"
import { ListingPage } from './Pages/Listing Page/ListingPage';
import { SongsForm } from './Pages/SongsForm/SongsForm';
import { Home } from './Pages/Home Page/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/listPage' element={<ListingPage/>}/>
      <Route path='/songsForm' element={<SongsForm/>}/>
    </Routes>
  );
}

export default App;
