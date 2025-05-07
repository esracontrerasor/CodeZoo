import React, {useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import ActivityManager from "./ActivityManager.jsx";
import FormForo from "./ForumAdmin.jsx"
<<<<<<< HEAD
=======
import UserManagement from "./UserManagement.jsx";
>>>>>>> 8717190 (equis de)

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
        <Route path="/libro" element={<ProtectedRoute><Libro /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/foro" element={<ProtectedRoute><Foro /></ProtectedRoute>} />
        <Route path="/ActivityManager" element={<ActivityManager />}/>
        <Route path="/ForumAdmin" element={<FormForo />}/>
        <Route path="/UserManagement" element={<UserManagement />}/>
      </Routes>
  </>
    
  );
}

export default App;
