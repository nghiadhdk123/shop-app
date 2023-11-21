import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { formatMoney } from "../../until/helper";
import api from "../../api";
import "../../scss/category-product.scss";

function CategoryProduct() {

    const { addToCart } = useContext(CartContext);
    const { slug } = useParams();
    const [category, setCategory] = useState();
    const [products, setProduct] = useState([]);

    useEffect(() => {
        api.detailCategory(slug)
            .then((res) => {
                setCategory(res.data.category);
                setProduct(res.data.products);
            })
            .catch(() => {})
    }, []);

    return (
        <div className="category-product-page">
            <div className="container px-5 py-4">
                <div className="breadcrumbs d-flex align-items-center">
                        <Link to="/" className="d-flex align-items-center color-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                            </svg>
                        </Link>
                        <div className="d-inline-flex align-items-center px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <span className="px-2 color-1">
                                Danh mục
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                       { category && (<span className="name-category">Apple</span>) }
                </div>
            </div>

            <div className="products container py-3">
                <h2 className="products-title mb-4 w-max-content position-relative pb-2">Sản phẩm</h2>

                <div className="products-list row row-cols-lg-4 row-cols-2">
                    {
                        products.length > 0 &&
                        products.map(product => (
                            <div key={product._id} className="cols mb-3 h-auto">
                                <div className="products-item h-100 overflow-hidden">
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
        </div>
    )
}

export default CategoryProduct;
