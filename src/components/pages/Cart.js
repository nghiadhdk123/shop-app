import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { formatMoney } from "../../until/helper";
import "../../scss/cart.scss";

function Cart() {
    const { cart, handleDecrease, handleIncrease, handleDeleteCart, handleDestroyCart } = useContext(CartContext);

    const totalMoney = useMemo(() => {
        const result = cart.reduce((total, item) => {
            return total + (item.price * item.qty);
        }, 0);

        return result;
    }, [cart])

    const totalQty = useMemo(() => {
        const result = cart.reduce((total, item) => {
            return total + item.qty;
        }, 0);

        return result;
    }, [cart])

    return (
        <div className="cart-page">
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
                            Giỏ hàng
                        </span>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-lg-9 col-12">
                        <table className="table w-100">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="text-center">Sản phẩm</th>
                                    <th className="text-center">Giá</th>
                                    <th className="text-center">Số lượng</th>
                                    <th className="text-center">Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.length > 0 ?
                                        (
                                            cart.map(value => (
                                                <tr key={value._id}>
                                                    <td className="align-middle text-center">
                                                        <img src={value.image ? process.env.REACT_APP_API_URL + '/uploads/' + value.image : '/images/not-find-it.png'} alt="" width="50" height="50" className="object-fit-cover" />
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        {value.name}
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        {formatMoney(value.price)} đ
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="cart-qty d-flex justify-content-between align-items-center">
                                                            <button className="btn-decrease btn" onClick={() => handleDecrease(value._id)}> - </button>
                                                            {value.qty}
                                                            <button className="btn-increase btn" onClick={() => handleIncrease(value._id)}> + </button>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        {formatMoney(value.qty * value.price)} đ
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteCart(value._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) :
                                        (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <img src="/images/no-data.png" alt="No Data" width="100" height="100" />
                                                    <span className="d-block text-center mt-4 py-2 fw-bold fst-italic">Bạn chưa có sản phẩm nào trong giỏ hàng. <Link to="/">Mua hàng</Link></span>
                                                </td>
                                            </tr>
                                        )
                                }
                                {cart.length > 0 && (
                                    <tr>
                                        <td colSpan={6} align="right">
                                            <button className="btn btn-primary" onClick={handleDestroyCart}>
                                                Xóa tất cả
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-3 col-12">
                        <div className="cart-summary px-4 py-3">
                            <h5 className="fw-bold">Tổng hóa đơn</h5>
                            <div className="cart-summary__qty d-flex justify-content-between w-100 my-2">
                                <span>Số lượng: </span> <span>{totalQty}</span>
                            </div>
                            <div className="cart-summary__ship d-flex justify-content-between w-100">
                                <span>Vận chuyển: </span> <span>Free</span>
                            </div>
                            <div className="cart-summary__total d-flex justify-content-between w-100 mt-3 fw-bold fs-6">
                                <span>Thành tiền: </span> <span>{formatMoney(totalMoney)} đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
