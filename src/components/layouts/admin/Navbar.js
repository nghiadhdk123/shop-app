import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav className="main-navbar py-3 bg-white">
            <div className="navbar">
                <div className="navbar-toggle">
                    <ul className="list-style-none p-0 m-0 text-black d-flex align-items-center">
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
            </div>
        </nav>
    )
}

export default Navbar;
