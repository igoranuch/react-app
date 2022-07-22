import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/LandingPage";
import Bookings from "./pages/BookingsPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Trip from "./pages/TripPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Homepage />}></Route>
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
