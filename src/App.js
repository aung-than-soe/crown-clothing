import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/homepage/homepage.component";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {

  subscription = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.subscription = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }

      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          
          <Route exact path="/signin" render={() => this.props.currentUser ? 
          (<Redirect to='/'/>):(<SignInAndSignUpPage />)
            } />
        </Switch>
      </div>
    );
  }
  }
  
 const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

 const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
 }) 
export default connect(mapStateToProps, mapDispatchToProps)(App);
