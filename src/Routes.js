import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Order from './admin/Order';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/shop' exact component={Shop} />
          <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
          <AdminRoute
            path='/admin/dashboard'
            exact
            component={AdminDashboard}
          />
          <AdminRoute path='/create/category' exact component={AddCategory} />
          <AdminRoute path='/create/product' exact component={AddProduct} />
          <Route path='/product/:productId' exact component={Product} />
          <Route path='/cart' exact component={Cart} />
          <AdminRoute path='/admin/orders' exact component={Order} />
          <PrivateRoute path='/profile/:userId' exact component={Profile} />
          <PrivateRoute
            path='/admin/products'
            exact
            component={ManageProducts}
          />
          <AdminRoute
            path='/admin/product/update/:productId'
            exact
            component={UpdateProduct}
          />
          <AdminRoute
            path='/admin/category/update/:categoryId'
            exact
            component={UpdateCategory}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;