import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import api from "../../api";
import "../../scss/header.scss"

function Header() {

    const { cart } = useContext(CartContext);
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        api.getListCategories()
            .then((res) => {
                setCategory(res.data.data);
            })
            .catch(() => { })
    }, [])

    useEffect(() => {
        let header = document.querySelector("header");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                header.classList.add("header-fix");
            } else {
                header.classList.remove("header-fix");
            }
        });
    }, [])

    return (
        <header>
            <div className="header-top container d-flex justify-content-between align-items-center px-5">
                <div className="header-top-left">
                    <div className="header-top-left__logo">
                        <img src="/images/logo.jpg" className="logo" alt="" />
                    </div>
                </div>
                <div className="header-top-middle">
                    <ul className="header-top-middle__menu d-flex jusitify-content-start align-items-center m-0 p-0">
                        <Link to="/" className="text-decoration-none text-black">
                            <li className="item mx-3 fw-medium">Trang chủ</li>
                        </Link>
                        <Link to="/" className="text-decoration-none text-black">
                            <li className="item mx-3 fw-medium">Xin chào</li>
                        </Link>
                        <Link to="/" className="text-decoration-none text-black">
                            <li className="item mx-3 fw-medium">Liên hệ</li>
                        </Link>
                        <Link to="/" className="text-decoration-none text-black">
                            <li className="item mx-3 fw-medium">Giới thiệu</li>
                        </Link>
                    </ul>
                </div>
                <div className="header-top-right">
                    <div className="d-flex jusitify-content-between align-items-center">
                        <div className="header-top-right__action-auth mx-3">
                            <Link to="#" className="fw-medium text-decoration-none text-black">Đăng nhập</Link> / <Link to="#" className="fw-medium text-decoration-none text-black">Đăng ký</Link>
                        </div>

                        <div className="header-top-right__language dropdown mx-3">
                            <span className="dropdown-toggle d-flex align-items-center fs-7 cursor-pointer" data-bs-toggle="dropdown">Ngôn ngữ</span>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Tiếng Việt</Link></li>
                                <li><Link className="dropdown-item" to="#">Tiếng Anh</Link></li>
                                <li><Link className="dropdown-item" to="#">Tiếng Nhật</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container d-flex justify-content-between align-items-center px-5">
                    <div className="header-bottom__categories d-flex align-items-center cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                        <span className="ms-2">Danh mục</span>
                        {
                            categories.length > 0 && (
                                <div className="list-categories">
                                    <ul className="p-0 m-0 list-style-none">
                                        { 
                                            categories.map(value => (
                                                <li key={value._id} className="category-item ps-1">
                                                    <Link to={"/cat/" + value.slug} className="category-item__link text-decoration-none color-1 ps-4 d-inline-block w-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                                                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                                                        </svg>
                                                        <span className="category-item__name text-black ms-3 fw-normal">
                                                            { value.name }
                                                        </span>
                                                    </Link>
                                                </li>
                                            )) 
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <div className="header-bottom__search">
                        <form className="d-flex">
                            <input type="text" placeholder="Tìm kiếm sản phẩm....." />
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="header-bottom__action d-flex justify-content-between align-items-center">
                        <div className="header-bottom__action-handle me-3">
                            <Link to="/cart" className="text-decoration-none text-white d-flex flex-column justify-content-between align-items-center">
                                <div>
                                    <svg width="28" height="28" viewBox="0 0 256 256">
                                        <path fill="currentColor" d="M94 216a14 14 0 1 1-14-14a14 14 0 0 1 14 14Zm90-14a14 14 0 1 0 14 14a14 14 0 0 0-14-14Zm43.5-128.4L201.1 166a22.2 22.2 0 0 1-21.2 16H84.1a22.2 22.2 0 0 1-21.2-16L36.5 73.8v-.3l-9.8-34a1.9 1.9 0 0 0-1.9-1.5H8a6 6 0 0 1 0-12h16.8a14.1 14.1 0 0 1 13.5 10.2L46.8 66h174.9a6 6 0 0 1 4.8 2.4a6 6 0 0 1 1 5.2ZM213.8 78H50.2l24.3 84.7a10 10 0 0 0 9.6 7.3h95.8a10 10 0 0 0 9.6-7.3Z"></path>
                                    </svg>
                                    <sup className="number-product">{cart.length}</sup>
                                </div>
                                <span className="fs-8 fw-normal">
                                    Giỏ hàng
                                </span>
                            </Link>

                        </div>
                        <div className="header-bottom__action-handle">
                            <Link to="#" className="text-decoration-none text-white d-flex flex-column justify-content-center align-items-center">
                                <svg width="28" height="28" viewBox="0 0 256 256">
                                    <path fill="currentColor" d="M230.2 213a118.3 118.3 0 0 0-70.5-54.6a70 70 0 1 0-63.4 0A118.3 118.3 0 0 0 25.8 213a5.9 5.9 0 0 0 2.2 8.2a6 6 0 0 0 8.2-2.2a106 106 0 0 1 183.6 0a6 6 0 0 0 5.2 3a6.4 6.4 0 0 0 3-.8a5.9 5.9 0 0 0 2.2-8.2ZM70 96a58 58 0 1 1 58 58a58 58 0 0 1-58-58Z"></path>
                                </svg>
                                <span className="fs-8 fw-normal">
                                    Tài khoản
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
