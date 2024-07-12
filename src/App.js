import logo from './logo.svg';
import './App.css';
import Headers from './components/Headers/Headers'
import Footers from './components/Footers/Footers';
import Home from './containers/Home/Home';
import Contacts from './containers/Contacts/Contacts';
import Shop from './containers/Shop/Shop';
import ShopDetails from './containers/Shop-Details/ShopDetails';
import Error from './containers/404Error/Error';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout';
import Testimonial from './containers/Testimonial/Testimonial';
import { Route, Routes } from 'react-router-dom';
import Category from './admin/containers/Category/Category';
import SubCategory from './admin/containers/SubCategory/SubCategory';

function App() {
  return (
    <>
    {/* <Headers /> */}
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/shop' element={<Shop />}></Route>
      <Route path='/shopDetails' element={<ShopDetails />}></Route>
      <Route path='/contacts' element={<Contacts />}></Route>
      <Route path='/error' element={<Error />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/testimonial' element={<Testimonial />}></Route>

      <Route path='/admin/category' element={<Category />}></Route>
      <Route path='/admin/subcategory' element={<SubCategory />}></Route>

    </Routes>
    {/* <Footers /> */}
    </>
  );
}

export default App;
