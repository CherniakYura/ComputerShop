import React from "react";
import { Link } from "react-router-dom";
import  "../styles/HomePage.css";
import HomeImage from "../images/rtx-3090.jpg";

const HomePage = () => {
    return (
        <div className="">
            <main>
                <section
                    style={{ backgroundImage: `url(${HomeImage})` }}
                    className="HomeSection"
                >
                    <h1 className="homeTitle">Nvidia GeForce RTX 3090</h1>
                    <p className="homeDesc" >
                        Now available for preorder, shipping December, 2020.
                    </p>
                    <Link className="homeLink" to="/catalog">
                        Shop now
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
