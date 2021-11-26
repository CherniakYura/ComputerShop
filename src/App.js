import HomePage from "./pages/HomePage";
import Catalog from "./pages/ShopPage";
import "./styles/App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import React, { useEffect, useState } from "react";
import memory from "./data/memory";

function App() {
    const [cartActive, setCartActive] = useState(false);
    const [cartContent, setCartContent] = useState([...memory]);
    const [totalPrice, setTotalPrice] = useState(0);

const updateQuantity =  (productId, quantity) => {
    const currentCart = cartContent;

    if (quantity === 0) {
         setCartContent(
        currentCart.filter((item) => item.id !== productId)
        );
    } else {
        const product = currentCart.find((item) => item.id === productId);
        product.quantity = quantity;
        currentCart.map((item) => (item.id === productId ? product : null));
         setCartContent( currentCart );
    }

    computeTotalPrice();
};

    const computeTotalPrice = () => {
        let totalPrice = 0;
        cartContent.forEach((content) => {
            const priceTotal = content.price * content.quantity;
            totalPrice += priceTotal;
        });
        setTotalPrice(totalPrice.toFixed(2));
    };

   async function addToCart(product) {
       const sameProduct = cartContent.filter(
           (productInCart) => productInCart.id === product.id
       );
       const currentCart = cartContent;
       if (sameProduct.length === 1) {
           currentCart.map((productInCurrentCart) =>
               productInCurrentCart.id === sameProduct[0].id
                   ? (productInCurrentCart.quantity =
                         productInCurrentCart.quantity + 1)
                   : null
           );
           await setCartContent(currentCart);
       } else {
           //const currentCart = this.state.cart;
           const productObject = product;
           productObject.quantity = 1;
           await setCartContent([...currentCart, productObject]);
       }
       computeTotalPrice();
       setCartActive(true);
   }

    function activateCart() {
        setCartActive(true);
    }

    function deactivateCart() {
        setCartActive(false);
    }
    return (
        <Router>
            <div className="App">
                <Header
                    activateCart={activateCart}
                    deactivateCart={deactivateCart}
                    cartLength={cartContent.length}
                />
                <Routes>
                    <Route
                        exact
                        path="/shopping-cart/"
                        element={<HomePage />}
                    />
                    <Route
                        exact
                        path="/shopping-cart/catalog"
                        element={<Catalog />}
                    />
                    <Route
                        exact
                        path="/shopping-cart/catalog/:categoryId"
                        element={<Catalog />}
                    />
                </Routes>
                <Cart
                    active={cartActive}
                    deactivate={deactivateCart}
                    cartContent={cartContent}
                    totalPrice={totalPrice}
                    updateQuantity={updateQuantity}
                />
            </div>
        </Router>
    );
}

export default App;
