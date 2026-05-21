import React from "react";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

function HomePage() {
    // Funciones
    const products = getProducts();



    return (
        <div className="page">
            <div className="home-hero">
                <h1>Welcome to ShopHub</h1>
                <p className="home-subtitle">Discober amazing products at great prices</p>
            </div>

            <div className="container">
                <h2 className="page-title">Our Products</h2>

                <div className="product-grid">
                    {products.map((item) => (
                        <ProductCard product={item} key={item.id} />
                    ))}

                </div>
            </div>


        </div>
    )
}

export default HomePage;