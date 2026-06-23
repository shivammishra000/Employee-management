import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import EditEmployee from "./pages/EditEmployee";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home-Page" element={<Home />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
