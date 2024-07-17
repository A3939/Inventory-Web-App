
import './App.css';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import ViewInvetory from './components/ViewInvetory';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {


  const isLoggedIn = localStorage.getItem('isAuthenticated')
  console.log(isLoggedIn, 'isLoggedIn');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' index element={<Dashboard />} />
          <Route path='inventory' index element={<Inventory />} />
          <Route path='viewinventory' index element={<ViewInvetory />} />
          <Route path='editProduct' index element={<EditProduct />} />
          <Route path='login' index element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
