import './App.css';
import Home from './components/home';
import InventoryScreen from './components/inventory';
import Login from './components/login';
import ProductsScreen from './components/products';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CsrfErrorHandler from './CsrfErrorHandler';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <CsrfErrorHandler /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsScreen />} >
          </Route>
          <Route path="/inventory" element={<InventoryScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
