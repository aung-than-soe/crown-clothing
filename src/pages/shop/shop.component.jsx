import {
  convertCollectionSnapShotToMap,
  firestore,
} from "../../firebase/firebase.util";
import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateShopData } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";

class ShopPage extends React.Component {
  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateShopData } = this.props;
    const collectionRef = firestore.collection("shop_data");

    collectionRef.onSnapshot(async (snapShot) => {
      const shopData = convertCollectionSnapShotToMap(snapShot);
      updateShopData(shopData);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateShopData: (shopData) => dispatch(updateShopData(shopData)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
