import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Shop from '../containers/Shop/Shop';
import ShopDetails from '../containers/Shop-Details/ShopDetails';
import Contacts from '../containers/Contacts/Contacts';
import Error from '../containers/404Error/Error';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';
import Testimonial from '../containers/Testimonial/Testimonial';
import Headers from '../components/Headers/Headers';
import Footers from '../components/Footers/Footers';
import Counter from '../containers/Counter/Counter';
import PriceSlider from '../containers/Price-Slider/PriceSlider';
import Login from '../containers/Login/Login';
import { ThemeContext } from '../context/ThemeContext';
import OrderSuccess from '../containers/OrderSuccess';

function UserRoutes(props) {
    const theme = useContext(ThemeContext)
    return (
        <div className={theme.theme}>
            <Headers />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='shop' element={<Shop />}></Route>
                <Route path='shopDetails/:id' element={<ShopDetails />}></Route>
                <Route path='contacts' element={<Contacts />}></Route>
                <Route path='error' element={<Error />}></Route>
                <Route path='cart' element={<Cart />}></Route>
                <Route path='checkout' element={<Checkout />}></Route>
                <Route path='testimonial' element={<Testimonial />}></Route>
                <Route path='counter' element={<Counter />}></Route>
                <Route path='priceSlider' element={<PriceSlider />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='orderSuccess' element={<OrderSuccess />}></Route>

            </Routes>
            <Footers />
        </div>
    );
}

export default UserRoutes;