import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import { HomePage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

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
          <Route path="/signin" render={() => this.props.currentUser ? 
          (<Redirect to='/'/>):(<SignInAndSignUpPage />)
            } />
        </Switch>
      </div>
    );
  }
  }
  
 const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
}) 

 const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
 }) 
export default connect(mapStateToProps, mapDispatchToProps)(App);
