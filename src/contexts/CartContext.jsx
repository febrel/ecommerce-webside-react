import { createContext, useState, useContext } from "react";
import { getProductById, getProducts } from "../data/products";


const CartContext = createContext(null);

function CartProviderWrapper(props) {
    // Variables - Estado
    const [cartItems, setCartItems] = useState([]);

    // Funciones
    const addToCart = (productId) => {
        const existing = cartItems.find((item) => {
            return item.id === productId;
        });

        if (existing) {
            const currentQuantity = existing.quantity;
            const updateCartItems = cartItems.map((item) => {

                return item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item;
            });

            setCartItems(updateCartItems);

        } else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }

    }

    const getCartItemsWithProducts = () => {
        return cartItems.map(item => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product);
    }

    const removeFromCart = (productId) => {
        setCartItems(
            cartItems.filter((item) => {
                return item.id !== productId;
            })
        )

    }

    const updateQuantity = (productId, quantity) => {

        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(
            cartItems.map((item) => {
                return item.id === productId ? { ...item, quantity } : item;
            })
        )
    }


    const getCartTotal = () => {

        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0)

        return total;
    }


    const cleanCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ addToCart, cartItems, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, cleanCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProviderWrapper };

// Forma de crear un HOOK propio 
export function useCart() {
    const context = useContext(CartContext);

    return context;
}