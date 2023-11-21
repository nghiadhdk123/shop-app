import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext";

function Navbar() {

    const { user } = useContext(AdminContext);
    
    return(
        <nav className="main-navbar py-3 bg-white">
            <div className="navbar px-3">
                <div className="navbar-toggle">
                    <ul className="list-style-none p-0 m-0 d-flex align-items-center">
                        <li className="fw-bold px-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </li>
                        <li className="fw-medium px-3">
                            <Link className="text-decoration-none text-black">
                                Sản phẩm
                            </Link>
                        </li>
                        <li className="fw-medium px-3">
                            <Link className="text-decoration-none text-black">
                                Danh mục
                            </Link>
                        </li>
                    </ul>
                    
                </div>
                <div className="navbar-user">
                    <span className="navbar-user__name fw-medium">
                        Xin chào, { user ? user.name : '' }
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default memo(Navbar);
