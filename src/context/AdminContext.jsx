import { createContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


export const AdminContext = createContext();

function AdminProvider({ children })
{
    const navigate = useNavigate();

     //Set info login user
     const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) ?? {};
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        api.getListUser()
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch(() => {});
    }

    // Hàm tạo mới nhân viên
    const handleCreateUser = (data) => {
        api.storeUser(data)
            .then((res) => {
                getUser();
            })
            .catch(() => {});
    }

    // Hàm logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser({});
        navigate('/admin/login');
    }

    return (
        <AdminContext.Provider value={{ user, users, handleCreateUser, handleLogout }}>
            { children }
        </AdminContext.Provider>
    )
}

export default AdminProvider