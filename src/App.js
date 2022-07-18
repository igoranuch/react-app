import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Homepage from "./pages/landingpage/landingpage";
import Bookings from "./pages/bookings/bookingsList";
import SignIn from "./pages/sing-in/sign-in";
import SignUp from "./pages/sign-up/sign-up";
import Trip from "./pages/tripPage/trip";

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
