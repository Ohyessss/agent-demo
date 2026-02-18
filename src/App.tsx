import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CustomerProfile from './pages/CustomerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/customer" element={<CustomerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
