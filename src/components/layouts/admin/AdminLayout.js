import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Chat from "./Chat";
import AdminProvider from "../../../context/AdminContext";
import "../../../scss/global.scss";
import "../../../scss/admin/layout.scss";
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../../api";

function AdminLayout({ children }) {
    const navigate = useNavigate();
    
    apiAxios.interceptors.response.use(undefined, (error) => {
        if (error) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate("/admin/login");
            }
        }
        return Promise.reject(error);
    });

    apiAxios.interceptors.response.use(undefined, (error) => {
        if (error) {
            if (error.response.status === 403) {
                navigate("/admin");
            }
        }
        return Promise.reject(error);
    });

    return (
        <AdminProvider>
            <div className="wrapper">
                <Sidebar />

                <div className="wrapper-content">
                    <Navbar />

                    <div className="main-content px-3 pt-2">
                        {children}
                    </div>
                </div>

                    <Chat />
            </div>
        </AdminProvider>
    )
}

export default AdminLayout;
