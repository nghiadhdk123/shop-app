import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "../../scss/home.scss";
import api from "../../api";
import { formatMoney } from "../../until/helper";

function Home() {
    const getProducts = async () => {
        api.getListProduct()
            .then((res) => {
                setProduct(res.data.data);
            })
            .catch(() => { })
    }

    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const { addToCart } = useContext(CartContext);

    return (
        <div className="home-page">
            <div className="banner"></div>

            <div className="feature container px-5 py-5">
                <div className="row row-cols-lg-3 flex-nowrap px-5">
                    <div className=" feature-single cols d-flex justify-content-center align-items-center px-3 py-4 mx-2">
                        <div className="feature-single__icon">
                            <img src="/images/icon-1.svg" alt="" />
                        </div>
                        <div className="feature-single__content ms-3">
                            <h4 className="fs-6 mb-2">Miễn phí vận chuyển</h4>
                            <p className="fs-8 mb-0">Đơn hàng từ 200.000đ trở nên</p>
                        </div>
                    </div>
                    <div className=" feature-single cols d-flex justify-content-center align-items-center px-3 py-4 mx-2">
                        <div className="feature-single__icon">
                            <img src="/images/icon-2.svg" alt="" />
                        </div>
                        <div className="feature-single__content ms-3">
                            <h4 className="fs-6 mb-2">Hoàn lại tiền</h4>
                            <p className="fs-8 mb-0">Hoàn lại tiền trong vòng 30 ngày</p>
                        </div>
                    </div>
                    <div className=" feature-single cols d-flex justify-content-center align-items-center px-3 py-4 mx-2">
                        <div className="feature-single__icon">
                            <img src="/images/icon-3.svg" alt="" />
                        </div>
                        <div className="feature-single__content ms-3">
                            <h4 className="fs-6 mb-2">Hỗ trợ 24/7</h4>
                            <p className="fs-8 mb-0">Hỗ trợ khách hàng 24/7</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="products container py-3">
                <h2 className="products-title mb-4 w-max-content position-relative pb-2">Sản phẩm</h2>

                <div className="products-list row row-cols-lg-4 row-cols-2">
                    {
                        products.length > 0 &&
                        products.map(product => (
                            <div key={product._id} className="cols mb-3">
                                <div className="products-item overflow-hidden">
                                    <Link to={"/detail/" + product.slug} className="text-decoration-none text-black">
                                        <div className="products-item__image position-relative">
                                            <img src={product.image ? process.env.REACT_APP_API_URL + '/uploads/' + product.image : '/images/not-find-it.png'} alt="" className="w-100 object-fit-contain" />
                                            <span className="tag position-absolute fs-7">Hot</span>
                                        </div>
                                    </Link>
                                    <div className="products-item__info position-relative">
                                        <Link to={"/detail/" + product.slug} className="text-decoration-none text-black">
                                            <div className="products-item__info-name">
                                                <h5>
                                                    {product.name}
                                                </h5>
                                            </div>
                                            <div className="products-item__info-price fs-7">
                                                <span className="fw-medium">{formatMoney(product.price)} đ</span>
                                            </div>
                                        </Link>
                                        <div className="products-item__action position-absolute">
                                            <button className="button-add-cart btn d-flex align-items-center" 
                                                    onClick={ () => addToCart(product) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                </svg>
                                                <span className="ps-2">
                                                    Thêm giỏ hàng
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className="dowload container mt-3">
                <div className="dowload-app">
                    <div className="row">
                        <div className="col-6">
                            <div className="dowload-app-left">
                                <img src="/images/banner-dowload.png" alt="" />
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="dowload-app-right h-100">
                                <div className="dowload-app-right__content h-100 d-flex flex-column justify-content-center">
                                    <h4 className="fs-3 fw-medium mb-4">
                                        Tải App Liên Quân Mobile ngay!
                                    </h4>
                                    <p className="fs-7">
                                        Liên Quân Mobile thắng bại tại kỹ năng, trang phục, wifi. Tải ngay tại AppStore và CH Play.
                                    </p>
                                    <form className="d-flex mb-4">
                                        <input type="text" placeholder="Vui lòng nhập gì đó......" />
                                        <button>Gửi</button>
                                    </form>
                                    <div className="dowload-links">
                                        <Link to="#" className="me-3">
                                            <img src="/images/dowload-chplay.png" alt="dowload" loading="lazy" />
                                        </Link>
                                        <Link to="#">
                                            <img src="/images/dowload-appstore.png" alt="dowload" loading="lazy" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;
