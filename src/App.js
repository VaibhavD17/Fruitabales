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

function App() {
  return (
    <>
    <Headers />
    {/* <Home /> */}
    {/* <Contacts /> */}
    {/* <Shop /> */}
    {/* <ShopDetails /> */}
    {/* <Error /> */}
    {/* <Cart /> */}
    {/* <Checkout /> */}
    <Testimonial />
    <Footers />
    </>
  );
}

export default App;
