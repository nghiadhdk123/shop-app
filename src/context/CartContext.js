import { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) ?? [];
    });

    const addToCart = (product) => {
        let data = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
        };

        setCart((preCart) => {

            let newCart = [...preCart];

            if (checkCart(data._id)) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i]._id === data._id) {
                        cart[i].qty++;
                    }
                }

            } else {
                newCart = [...preCart, data];
            }

            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });

        toast.success('Đã thêm vào giỏ hàng!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "dark",
        });
    }

    const checkCart = (_id) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === _id) {
                return true;
            }
        }
        return false;
    }

    return (
        <CartContext.Provider value={{ addToCart, cart }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}

export default CartProvider;
