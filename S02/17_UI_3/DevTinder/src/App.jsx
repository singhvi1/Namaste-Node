import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./utils/store/store";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
