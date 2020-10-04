import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/header.component";
import { HomePage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  subscription = null;

  componentDidMount() {
    this.subscription = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state)
        });
      }

      this.setState({
        currentUser: userAuth
      })
    })
  }

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  }
  
export default App;
