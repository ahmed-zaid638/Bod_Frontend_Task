import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login";
import UsersPage from "./pages/users";
import Dashboard from "./pages/dashboard";
import NewUserPage from "./components/users/NewUser";
import EditUserPage from "./components/users/EditUser";
import UserPage from "./components/users/UserPage";
import DataPage from "./components/data";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<NewUserPage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/data" element={<DataPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
