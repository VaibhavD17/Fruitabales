import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/Slice/categories.slice';
import { getSubcategories } from '../../redux/Slice/subcategories.slice';
import { getProduct } from '../../redux/Slice/product.slice';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { addtoCart } from '../../redux/Slice/cart.slice';


function Shop(props) {
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [value1, setValue1] = React.useState([0, 1000]);

    const dispatch = useDispatch();

    const categorie = useSelector(state => state.categories)

    const product = useSelector(state => state.products)

    const theme = useContext(ThemeContext)

    const hendleCart = (data) => {
        dispatch(addtoCart(data))

        console.log(data);

    }


    const hendleSearchSort = () => {

        const fData = product.products.filter((v) => (
            v.product.toLowerCase().includes(search.toLowerCase()) ||
            v.productDesc.toLowerCase().includes(search.toLowerCase()) ||
            v.price.toString().includes(search)
        ))


        const sData = fData.sort((a, b) => {
            if (sort === 'az') {
                return a.product.localeCompare(b.product)
            } else if (sort === 'za') {
                return b.product.localeCompare(a.product)
            } else if (sort === 'lh') {
                return a.price - b.price
            } else if (sort === 'hl') {
                return b.price - a.price
            }

        })

        const pData = sData.filter((v) => (
            v.price >= value1[0] && v.price <= value1[1]
        ))

        if (selectCategory) {
            if (selectCategory === 'all') {
                return pData;
            } else {
                const cData = pData.filter((v) => (
                    v.category === selectCategory
                ))
                return cData;
            }
        }


        return pData;
    }


    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        dispatch(getCategories());
        dispatch(getSubcategories())
        dispatch(getProduct());
    }

    const finalData = hendleSearchSort();


    function valuetext(value) {
        return `${value}°C`;
    }

    const minDistance = 500;


    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };



    return (
        <div>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className={`${theme.theme}-header mb-4`}>Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" onChange={(e) => setSearch(e.target.value)} />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>
                                <div className="col-6" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits" className={`${theme.theme}-selection`}>Default Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform" onChange={(e) => setSort(e.target.value)}>
                                            <option value="0">-- Select Sort --</option>
                                            <option value="az">Title: A to Z</option>
                                            <option value="za">Title: Z to A</option>
                                            <option value="lh">Price: Low to High</option>
                                            <option value="hl">Price: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className={`${theme.theme}-header`}>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">

                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <a href="#" value={"all"} onClick={(e) => setSelectCategory("all")}><i className="fas fa-apple-alt me-2" />All Products</a>
                                                            {/* <span>(3)</span> */}
                                                        </div>
                                                    </li>
                                                    {
                                                        categorie.categories.map((v) => (
                                                            <li>
                                                                <div className="d-flex justify-content-between fruite-name">
                                                                    <a href="#" value={v.name} onClick={() => setSelectCategory(v.id)}><i className="fas fa-apple-alt me-2" />{v.name}</a>
                                                                    {/* <span>(3)</span> */}
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>


                                        <div className="col-lg-12">


                                            <div className="price-input">
                                                <div className="field">
                                                    <span>Min</span>
                                                    {/* <input type="number" className="input-min" value={value1[0]} onChange={setValue1[0]}/> */}
                                                    <input type='number' value={value1[0]} onChange={(e) => setValue1([parseInt(e.target.value), value1[1]])} />
                                                </div>
                                                <div className="separator">-</div>
                                                <div className="field">
                                                    <span>Max</span>
                                                    {/* <input type="number" className="input-max"  value={value1[1]} onChange={setValue1[1]}/> */}
                                                    <input type='number' value={value1[1]} onChange={(e) => setValue1([value1[0], parseInt(e.target.value)])} />
                                                </div>
                                            </div>



                                            <div className="mb-3">
                                                <Box sx={{ width: 300 }}>
                                                    <Slider
                                                        getAriaLabel={() => 'Minimum distance'}
                                                        value={value1}
                                                        onChange={handleChange1}
                                                        valueLabelDisplay="auto"
                                                        getAriaValueText={valuetext}
                                                        disableSwap
                                                        step={100}
                                                        min={0}
                                                        max={30000}
                                                    />
                                                </Box>

                                            </div>
                                        </div>
                                        <div className={`${theme.theme}-header col-lg-12`}>
                                            <h4 className={`${theme.theme}-header mb-3`}>Featured products</h4>
                                            <div className={`${theme.theme}-header d-flex align-items-center justify-content-start`}>
                                                <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                                    <img src="img/featur-1.jpg" className="img-fluid rounded" alt />
                                                </div>
                                                <div>
                                                    <h6 className="mb-2">Big Banana</h6>
                                                    <div className="d-flex mb-2">
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                    <div className="d-flex mb-2">
                                                        <h5 className="fw-bold me-2">2.99 $</h5>
                                                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                                    <img src="img/featur-2.jpg" className="img-fluid rounded" alt />
                                                </div>
                                                <div>
                                                    <h6 className="mb-2">Big Banana</h6>
                                                    <div className="d-flex mb-2">
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                    <div className="d-flex mb-2">
                                                        <h5 className="fw-bold me-2">2.99 $</h5>
                                                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                                    <img src="img/featur-3.jpg" className="img-fluid rounded" alt />
                                                </div>
                                                <div>
                                                    <h6 className="mb-2">Big Banana</h6>
                                                    <div className="d-flex mb-2">
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star text-secondary" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                    <div className="d-flex mb-2">
                                                        <h5 className="fw-bold me-2">2.99 $</h5>
                                                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center my-4">
                                                <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className={`${theme.theme}-shop-banner position-relative `}>
                                                <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                                                <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">

                                        {
                                            finalData.map((v) => (
                                                <div className={`${theme.theme}-header col-md-6 col-lg-6 col-xl-4`}>

                                                    <div className="rounded position-relative fruite-item shop-header">
                                                        <NavLink to={`/shopDetails/${v.id}`}>
                                                            <div className="fruite-img">
                                                                <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                                            </div>
                                                        </NavLink>
                                                        <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>{categorie.categories.find((c) => v.category === c.id)?.name}</div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h4>{v.product}</h4>
                                                            <p>{v.productDesc}</p>
                                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                                <p className=" fs-5 fw-bold mb-0">{v.price}</p>
                                                                <a onClick={() => hendleCart(v)} href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }





                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <a href="#" className="rounded">«</a>
                                                <a href="#" className="active rounded">1</a>
                                                <a href="#" className="rounded">2</a>
                                                <a href="#" className="rounded">3</a>
                                                <a href="#" className="rounded">4</a>
                                                <a href="#" className="rounded">5</a>
                                                <a href="#" className="rounded">6</a>
                                                <a href="#" className="rounded">»</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fruits Shop End*/}</div>

    );
}

export default Shop;