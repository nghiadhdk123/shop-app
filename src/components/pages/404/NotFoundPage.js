import { useLocation } from "react-router-dom";
import AdminLayout from "../../layouts/admin/AdminLayout";

function NotFoundPage() {
    
    const location = useLocation();
    let page = false;

    const checkLocation = () => {
        if(location.pathname.includes('admin')) {
            page = true;
        }
    }

    checkLocation();
    return(
        <>
            { page ? 
                <AdminLayout>
                    <h1>Not Found Page Admin</h1>
                </AdminLayout>
                :
                <div>
                    Not Found Page Client
                </div>

            }
        </>
    )
}

export default NotFoundPage;