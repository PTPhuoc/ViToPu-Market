import { Routes, Route, useLocation } from "react-router-dom";
import OptionBar from "./Components/OptionBar";
import Home from "./Components/Home";
import Notification from "./Components/Notification";
import Cart from "./Components/Cart";
import Account from "./Components/Account";
import CreateShop from "./Components/CreateShop";
import PageShop from "./Components/PageShop";
import PageProduct from "./Components/PageProduct";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";

const App = () => {
  const location = useLocation();
  return (
    <div className="">
      <div className="relative z-0">
        <img
          className="fixed bottom-0"
          src="./Image/BackGround.jpeg"
          alt="BackGround"
        ></img>
      </div>
      <div className="absolute z-1 w-full">
        {location.pathname === "/SignIn" || location.pathname === "/SignUp" ? (
          <div></div>
        ) : (
          <OptionBar></OptionBar>
        )}
        <div>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/Notification"
              element={<Notification></Notification>}
            ></Route>
            <Route path="/Cart" element={<Cart></Cart>}></Route>
            <Route path="/Account" element={<Account></Account>}></Route>
            <Route
              path="/CreateShop"
              element={<CreateShop></CreateShop>}
            ></Route>
            <Route path="/PageShop" element={<PageShop></PageShop>}></Route>
            <Route
              path="/PageProduct"
              element={<PageProduct></PageProduct>}
            ></Route>
            <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
            <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;