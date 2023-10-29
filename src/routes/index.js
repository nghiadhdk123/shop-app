import AdminLayout from "../components/layouts/admin/AdminLayout";
import Home from "../components/pages/Home";
import Detail from "../components/pages/Detail";
import Cart from "../components/pages/Cart";
import AdminHome from "../components/pages/admin/Home";
import Category from "../components/pages/admin/Category";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/detail/:slug', component: Detail},
    {path: '/cart', component: Cart},

    //admin
    {path: '/admin', component: AdminHome, layout: AdminLayout},
    {path: '/admin/category', component: Category, layout: AdminLayout},
];

export { publicRoutes };
