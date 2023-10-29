import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../../scss/global.scss";
import "../../../scss/admin/layout.scss";

function AdminLayout({children}) {
    return (
        <div className="wrapper">
            <Sidebar />
            
            <div className="wrapper-content">
                <Navbar />

                <div className="main-content px-3 pt-2">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;
