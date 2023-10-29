import CartProvider from "../../context/CartContext";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../scss/global.scss"

import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({  children })
{
    return (
        <CartProvider>
            <div>
                <Header />
                
                { children }

                <Footer />
            </div>
        </CartProvider>
    )
}

export default DefaultLayout;
