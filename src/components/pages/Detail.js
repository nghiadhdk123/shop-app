import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { formatMoney } from "../../until/helper";
import "../../scss/detail.scss";
import api from "../../api";
import { CartContext } from "../../context/CartContext";

function Detail() {

    const { slug } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        api.detailProduct(slug)
            .then((res) => {
                setProduct(res.data.data);
            })
            .catch(() => { });
    }, []);

    const { addToCart } = useContext(CartContext);

    return (
        <div className="detail-page">
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
                            Sản phẩm
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                    {product && (<span className="name-product">{product.name}</span>)}

                </div>

                {
                    product ?
                        (
                            <div className="detail-product mt-3">
                                <div className="row">
                                    <div className="col-lg-6 col-12">
                                        <img src={product.image ? process.env.REACT_APP_API_URL + '/uploads/' + product.image : '/images/not-find-it.png'} alt="" className="detail-product__image" />
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="detail-product__info">
                                            <h2 className="detail-product__info-name mb-4">
                                                {product.name}
                                            </h2>
                                            <p className="detail-product__info-status fw-bold mb-4">
                                                Trạng thái: <span className="text-success">&nbsp; Còn hàng</span>
                                            </p>
                                            <p className="detail-product__info-category fw-bold mb-4">
                                                Danh mục: <span>&nbsp; {product.categoryId ? product.categoryId.name : "Không có danh mục"}</span>
                                            </p>
                                            <h4 className="detail-product__info-price color-1 mb-4">
                                                {formatMoney(product.price)} đ
                                            </h4>
                                            <p className="mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Enim exercitationem quaerat excepturi labore blanditiis
                                            </p>
                                            <button className="button-add-cart btn d-flex align-items-center"
                                                onClick={() => addToCart(product)}>
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
                        ) :
                        (
                            <div className="d-flex flex-column align-items-center">
                                <img src="/images/no-data.png" width="200" />
                                <p className="mb-0 mt-3 fst-italic">Không có dữ liệu sản phẩm</p>
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export default Detail;
