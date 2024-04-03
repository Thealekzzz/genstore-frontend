import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { SERVER_PORT, SERVER_URL } from "./config";

import './App.css';
import Main from './pages/Main/Main';
import Evaluate from './pages/Evaluate/Evaluate';
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import Profile from "./pages/Profile/Profile";
// import EditProfile from "./pages/EditProfile/EditProfile";
import Evaluations from "./pages/Evaluations/Evaluations";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Search from "./pages/Search/Search";

import Header from "./components/Header/Header";

import AuthorizedContext from "./contexts/AuthorizedContext";
import TokenContext from "./contexts/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Calculator from "./pages/Calculator/Calculator";
import Orders from "./pages/Orders";
import Animals from "./pages/Animals";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${SERVER_URL}:${SERVER_PORT}/api/users/me`, {
      credentials: "same-origin",
      headers: {
        authorization: token ? ("Bearer " + token) : "",
      }
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthorized(true);
        }

        return res.json()
      })
      .then((res) => {
        setUserData(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <AuthorizedContext.Provider value={isAuthorized}>
      <TokenContext.Provider value={localStorage.getItem("token")}>
        <Header userData={userData} />

        <div className='content'>
          <Routes>
            <Route
              path="/"
              element={<Main userData={userData} />} />

            <Route
              path="/login"
              element={<Login setUserData={setUserData} setIsAuthorized={setIsAuthorized} />} />
            <Route
              path="/registration"
              element={<Registration />} />

            <Route
              path="/howitworks"
              element={<HowItWorks />} />
            <Route
              path="/calculator"
              element={<Calculator userData={userData} />} />

            <Route
              path="/createrequest"
              element={<ProtectedRoute element={CreateOrder} isLogged={isAuthorized} />} />
            <Route
              path="/search"
              element={<ProtectedRoute element={Search} userData={userData} isLogged={isAuthorized} />} />

            <Route
              path="/evaluate"
              element={<ProtectedRoute element={Evaluate} allowedRoles={["manager"]} userData={userData} isLogged={isAuthorized} />} />
            <Route
              path="/managerpage"
              element={<ProtectedRoute element={Evaluations} isLogged={isAuthorized} allowedRoles={["manager"]} userData={userData} setIsAuthorized={setIsAuthorized} />} />
            <Route
              path="/profile"
              element={<ProtectedRoute element={Profile} isLogged={isAuthorized} userData={userData} setUserData={setUserData} setIsAuthorized={setIsAuthorized} />} />

            <Route
              path="/orders"
              element={<ProtectedRoute element={Orders} isLogged={isAuthorized} userData={userData} setUserData={setUserData} setIsAuthorized={setIsAuthorized} />} />
            <Route
              path="/animals"
              element={<ProtectedRoute element={Animals} isLogged={isAuthorized} userData={userData} setUserData={setUserData} setIsAuthorized={setIsAuthorized} />} />

            <Route
              path="*"
              element={<PageNotFound />} />
          </Routes>

        </div>
      </TokenContext.Provider>
    </AuthorizedContext.Provider>
  );
}

export default App;
