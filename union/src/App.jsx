import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import { CustomTokenContextProvider } from "./utils/TokenContext";

import Menu from "./components/menu/Menu";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/user/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import SendEmailPage from "./pages/SendEmailPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";


export default function App() {
  return (
    <>
      <Layout>
      <CustomTokenContextProvider>
      <Menu />
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta de usuarios */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registered" element={<SendEmailPage />} />
          <Route path="/account/:token" element={<LoginPage />} />
          {/* Rutas Privadas*/}
          <Route element={<PrivateRoutes />}>
            <Route path="/account/myprofile" element={<ProfilePage />} />
          </Route>
          {/* Ruta para cuando el usuario pone una ruta que no existe falta por crear un componente para que se muestre el mensaje */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </CustomTokenContextProvider>
      </Layout>
    </>
  );
}