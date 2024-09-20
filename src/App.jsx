import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { navigateHistory } from "./util/setting";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import "./css/main.css";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Carts/Cart";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <HistoryRouter history={navigateHistory}>
      <Provider store={Store}>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route index element={<Index />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="carts" element={<Cart />}></Route>
            <Route path="detail">
              <Route path=":prodID" element={<Detail />}></Route>
            </Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="search" element={<Search />}></Route>
          </Route>
        </Routes>
      </Provider>
    </HistoryRouter>
  );
}

export default App;
