
import './App.css';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import ViewInvetory from './components/ViewInvetory';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import NotFound from './components/NotFound';
import ProtectRoutes from './components/ProtectRoutes';

function App() {


  const isLoggedIn = localStorage.getItem('isAuthenticated')
  console.log(isLoggedIn, 'isLoggedIn');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' index element={
            <ProtectRoutes>
            <Dashboard />
            </ProtectRoutes>
            } />
          <Route path='inventory' index element={
            <ProtectRoutes>
            <AddProduct />
            </ProtectRoutes>} />
          <Route path='viewinventory' index element={
            <ProtectRoutes><ViewInvetory /></ProtectRoutes>} />
          <Route path='editProduct' index element={<ProtectRoutes> <EditProduct /> </ProtectRoutes>} />
          <Route path='login' index element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
