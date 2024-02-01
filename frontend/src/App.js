import './App.css';
import InventoryScreen from './components/inventory';
import MenuAppBar from './components/navigation/appbar';
import ProductsScreen from './components/products';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <ProductsScreen></ProductsScreen>
      <InventoryScreen></InventoryScreen> */}
      <Router>
        <MenuAppBar></MenuAppBar>
        <Routes>
          <Route path="/products" element={<ProductsScreen />} >
          </Route>
          <Route path="/inventory" element={<InventoryScreen />} />
          {/* <Route path="/inbound" element={<InboundTab />} /> */}
        </Routes>
      </Router>

      {/* <MenuDrawer></MenuDrawer> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
