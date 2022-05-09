import React, { useEffect, useState } from "react";
import styles from "../styles/ShopPage.module.css";
import categories from "../data/categories";
import allProducts from "../data/allProducts";
import { Link, Route, Routes, useParams } from "react-router-dom";

const ShopPage = ({ match }) => {
    const { categoryId } = useParams();
   
    const [productsByCategory, setProductsByCategory] = useState(allProducts);
    const [categoryId2,setCategoryId2]=useState("processors");
    const category = categories.find((category) => category.id === categoryId2);

    useEffect(() => {
        setCategoryId2(!categoryId ? "processors" : categoryId);
        if (category) {
            const productsByCategory = allProducts.filter(
                (product) => product.categoryId === categoryId2
            );
            console.log(match);
            setProductsByCategory(productsByCategory);
        }
    }, [categoryId, category]);

    
    const format = (amount) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

        return formatter.format(amount);
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    // const AllProductstext = () => {
    //     return <div>All Products</div>;
    // };

    // const CategoryName = () => {
    //     return <div>{productsByCategory[0].category}</div>;
    // };


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <aside className={styles.side}>
                    <div className={styles.sideTitleContainer}>
                        <div className={styles.sideTitleShop}>Shop /</div>
                        <h1 className={styles.sideTitle}>
                            <Routes>
                                <Route
                                    exact
                                    path="/"
                                    element={capitalizeFirstLetter(categoryId2)}
                                />
                                {/* <Route
                                    exact
                                    path="/"
                                    element={"All Products"}
                                /> */}
                            </Routes>
                        </h1>
                    </div>
                    <ul className={styles.categories}>
                        {categories.map((category) => (
                            <Link
                                to={`/catalog/${category.id}`}
                                className={styles.categoryLink}
                                key={category.id}
                            >
                                <li className={styles.category}>
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </aside>
                <main className={styles.main}>
                    <ul className={styles.productList}>
                        <Routes>
                            

                            <Route
                                exact
                                path="/"
                                element={
                                    productsByCategory &&
                                    productsByCategory.map((product) => (
                                        <li
                                            key={product.id}
                                            className={styles.product}
                                        >
                                            <Link
                                                to={`/products/${product.id}`}
                                                className={styles.productLink}
                                            >
                                                <div
                                                    className={
                                                        styles.productImage
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            styles.frontImage
                                                        }
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                    <img
                                                        className={
                                                            styles.backImage
                                                        }
                                                        src={
                                                            product.previewImage
                                                        }
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.productName
                                                    }
                                                >
                                                    {product.name}
                                                </div>
                                                <div
                                                    className={
                                                        styles.productPrice
                                                    }
                                                >
                                                    {format(product.price)}
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }
                            />
                        </Routes>
                    </ul>
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
