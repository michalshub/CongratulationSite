import React from 'react';
import './App.css';
import Picture from './components/Picture/Picture';
import Register from './components/Register/Register';
import { Route, Switch, Redirect } from 'react-router-dom';
import Menu from './components/menu/menu';
import Contactus from './components/Contactus/Contactus';
import { connect } from 'react-redux';
import SubCategory from './components/SubCategory/SubCategory';
import UpdatePrivateCongratulation from './components/UpdatePrivateCongratulation/UpdatePrivateCongratulation';
import AddPrivateCongratulation from './components/AddPrivateCongratulation/AddPrivateCongratulation';
import DeletePrivateCongratulation from './components/DeletePrivateCongratulation/DeletePrivateCongratulation';
import PrivateCongratulation from './components/PrivateCongratulation/PrivateCongratulation';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ForgetPasswordVerify from './components/ForgetPasswordVerify/ForgetPasswordVerify';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ManagerNavBar from './components/ManagerNavBar/ManagerNavBar';
import AddCategory from './components/AddCategory/AddCategory';
import UpdateCategory from './components/UpdateCategory/UpdateCategory';
import DeleteCategory from './components/DeleteCategory/DeleteCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
import UpdateSubCategory from './components/UpdateSubCategory/UpdateSubCategory';
import DeleteSubCategory from './components/DeleteSubCategory/DeleteSubCategory';
import Categories from './components/Categories/Categories';
import UserCongratulation from './components/UserCongratulation/UserCongratulation';
import Modal from './components/modal/modal';
import AddWallpaper from './components/AddWallpaper/AddWallpaper';
import PaymentPageResult from './components/PaymentPageResult/PaymentPageResult';
import ReportOfUser from './components/ReportOfUser/ReportOfUser';
import ReportOfIncomes from './components/ReportOfIncomes/ReportOfIncomes';


function App(props) {

  return (
    <div className="App">
      <div>
        <Switch>
          <Route component={Register} path="/register" />
          <Route component={Menu} path="/menu" />
          <Route component={Contactus} path="/contactus" />
          <Route component={Picture} path="/picture" />
          <Route component={Categories} path="/categories" />
          <Route component={SubCategory} path="/subCategory" />
          <Route component={PrivateCongratulation} path="/privateCongratulation" />
          <Route component={Login} path="/login" />
          <Route component={Home} path="/home" />
          <Route component={UserCongratulation} path="/userCongratulation" />
          <Route component={PaymentPageResult} path="/paymentPageResult" />
          <Route component={ForgetPassword} path="/forgetPassword" />
          <Route component={ForgetPasswordVerify} path="/forgetPasswordVerify" />
          <Route component={UpdatePassword} path="/updatePassword" />

          {props.myUser.email === process.env.REACT_APP_MANAGER_MAIL ?
            <>
              <Route style={{ "position": "fixed" }} component={ManagerNavBar} path="/managerNavBar" />
              <Route component={AddCategory} path="/addCategory" />
              <Route component={UpdateCategory} path="/updateCategory" />
              <Route component={DeleteCategory} path="/deleteCategory" />
              <Route component={AddSubCategory} path="/addSubCategory" />
              <Route component={UpdateSubCategory} path="/updateSubCategory" />
              <Route component={DeleteSubCategory} path="/deleteSubCategory" />
              <Route component={AddWallpaper} path="/addWallpaper" />
              <Route component={Modal} path="/modal" />
              <Route component={UpdatePrivateCongratulation} path="/updatePrivateCongratulation" />
              <Route component={AddPrivateCongratulation} path="/addPrivateCongratulation" />
              <Route component={DeletePrivateCongratulation} path="/deletePrivateCongratulation" />
              <Route component={ReportOfUser} path="/reportOfUser" />
              <Route component={ReportOfIncomes} path="/reportOfIncomes" />
              <Route exact component={UpdateSubCategory} path="/" />
            </> :
            <Redirect to="/home" />

          }

        </Switch>
      </div>
    </div>
  )
}


export default connect(
  (state) => {
    return {
      myUser: state.userReducer.user
    }
  })(App);

