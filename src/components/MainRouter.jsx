import React from "react";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./user/LoginPage";
import JoinPage from "./user/JoinPage";
import CartPage from "./user/CartPage";
import PostRouter from "./PostRouter";

const MainRouter = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path='/post/*' element={<PostRouter/>}/>
            </Routes>
        </Container>
    );
};

export default MainRouter;
