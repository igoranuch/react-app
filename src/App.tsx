import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/LandingPage";
import Bookings from "./pages/BookingsPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Trip from "./pages/TripPage";
import { useEffect, useState } from "react";
import { authRoutes } from "./common/authRoutes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { getAuthenticatedUser } from "./store/auth/actions";
import { StateStatus } from "./types";
import { logOut, reset } from "./store/auth/reducer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { status, token } = useSelector((state: RootState) => state.auth);

  const toggleIsAuthenticated = () => {
    isAuthenticated ? setIsAuthenticated(false) : setIsAuthenticated(true);
  };

  useEffect(() => {
    if (!isAuthenticated && !authRoutes.includes(location.pathname) && !token) {
      navigate("/sign-in");
    }

    if (token && !isAuthenticated) {
      dispatch(getAuthenticatedUser(token));
    }
  }, []);

  useEffect(() => {
    if (status === StateStatus.SUCCESS) {
      toggleIsAuthenticated();
      reset();
    }

    if (status === StateStatus.ERROR && location.pathname != "/sign-up") {
      dispatch(logOut());
      navigate("/sign-in");
    }
  }, [status]);

  return (
    <>
      <Header signOut={toggleIsAuthenticated} isAuth={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/trip/:tripId" element={<Trip />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
