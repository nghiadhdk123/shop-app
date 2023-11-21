import AdminLayout from "../components/layouts/admin/AdminLayout";
import Home from "../components/pages/Home";
import Detail from "../components/pages/Detail";
import CategoryProduct from "../components/pages/CategoryProduct";
import Cart from "../components/pages/Cart";
import AdminHome from "../components/pages/admin/Home";
import Category from "../components/pages/admin/Category";
import User from "../components/pages/admin/User";
import Login from "../components/pages/admin/auth/Login";
import NotFoundPage from "../components/pages/404/NotFoundPage";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/detail/:slug', component: Detail},
    {path: '/cart', component: Cart},
    {path: '/cat/:slug', component: CategoryProduct},

    //admin
    {path: '/admin', component: AdminHome, layout: AdminLayout},
    {path: '/admin/category', component: Category, layout: AdminLayout},
    {path: '/admin/user', component: User, layout: AdminLayout},
    {path: '/admin/login', component: Login, layout: null},

    //Not page
    {path: '*', component: NotFoundPage, layout: null},
];

export { publicRoutes };
