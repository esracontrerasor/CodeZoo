import React, {useState} from "react";
import { Routes, Route, useLocation, BrowserRouter} from "react-router-dom";
import CodeZooInfo from "./Bienvenida.jsx";
import Terminos from "./Terminos.jsx"
import Home from "./Home.jsx"
import Info from "./Info.jsx";
import SopaDeLetras from "./SopaDeLetras.jsx";
import Memorama from "./Memorama.jsx"
import SafariRacing from "./SafariRacing.jsx"
import Settings from "./Settings.jsx";
import Avatar from "./Avatar.jsx";
import Libro from "./Libro.jsx";
import Libre from "./Libre.jsx";
import Perfil from "./perfilUsuario.jsx";
import Foro from "./ForoAyuda.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import LoginRegister from "./components/login/login.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import FormForo from "./ForumAdmin.jsx"
import UserManagement from "./UserManagement.jsx";
import Dashboard from "./GraficasDashboard.jsx";
import "./App.css";

const App = () => {
  return (
  <>
      <Routes>
        <Route path="/" element={<CodeZooInfo />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/home" element={ <ProtectedRoute><Home/> </ProtectedRoute>} />
        <Route path="/info" element={<Info />} />
        <Route path="/sopa-de-letras" element={<SopaDeLetras />} />
        <Route path="/memorama" element={<ProtectedRoute><Memorama/></ProtectedRoute>} />
        <Route path="/safari-racing" element={<SafariRacing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/avatar" element={<ProtectedRoute><Avatar /></ProtectedRoute>} />
        <Route path="/libre" element={<ProtectedRoute> <Libre /></ProtectedRoute>} />
        <Route path="/libro/:libroId" element={<Libro />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/foro" element={<ProtectedRoute><Foro /></ProtectedRoute>} />
        <Route path="/ForumAdmin" element={<FormForo />}/>
        <Route path="/UserManagement" element={<UserManagement />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
  </>
  );
}
export default App;
