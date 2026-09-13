import Login from "./pages/Login";
import { useEffect } from "react";
import Register from "./pages/Register";
import { supabase } from "./lib/supabase";
import Dashboard from "./pages/Dashboard";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // verifica se o usuário está logado
  useEffect(() => {
    const verificarSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("dashboard");
      } else {
        navigate("/login");
      }
    };
    verificarSession();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
