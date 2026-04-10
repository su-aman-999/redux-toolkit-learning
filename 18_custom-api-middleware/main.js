import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Headers from "./components/Headers";
import "./App.css";
import WishList from "./pages/WishList";

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
