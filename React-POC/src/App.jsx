import Login from "./components/auth/Login";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./components/common/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import useRole from "./hooks/useRole";
import ManageTeachers from "./pages/ManageTeachers";

function App() {
  const [role] = useRole();
  const isTokenPresent = !!localStorage.getItem("authToken");
  const isLoggedIn = isTokenPresent;

  return (
    <>
      {isLoggedIn ? <Sidebar role={role} /> : null}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard role={role} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Dashboard role={role} />}
        />
        
        <Route
          path="/teachers"
          element={isLoggedIn ? <ManageTeachers /> : <Dashboard role={role} />}
        />
      </Routes>
    </>
  );
}

export default App;
