import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/containers/Category/Category';
import SubCategory from '../admin/containers/SubCategory/SubCategory';
import Products from '../admin/containers/Products/Products';
import Layout from '../admin/components/Layout/Layout';
import Coupon from '../admin/containers/Coupon/Coupon';
import ReviewData from '../admin/containers/ReviewData/ReviewData';
import OrderList from '../admin/containers/Order-List/OrderList';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path='category' element={<Category />}></Route>
                    <Route path='subcategory' element={<SubCategory />}></Route>
                    <Route path='product' element={<Products />}></Route>
                    <Route path='coupon' element={<Coupon />}></Route>
                    <Route path='reviewdata' element={<ReviewData />}></Route>
                    <Route path='orderList' element={<OrderList />}></Route>

                </Routes >
            </Layout>
        </>
    );
}

export default AdminRoutes; 