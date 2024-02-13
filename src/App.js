import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Home from "./pages/Home";
import ProductTable from "./pages/Product/pages/ProductTable";
import Orders from "./pages/Orders/pages/Orders";
import UserProfile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductList from "./pages/Product/pages/ProductList";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux/es";
import { PersistGate } from "redux-persist/integration/react";
import Cart from "./pages/Cart/pages/Cart";
import AddProductForm from "./pages/Product/pages/Add_product";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/manage_products" element={<ProductTable />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/add-product" element={<AddProductForm />}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
