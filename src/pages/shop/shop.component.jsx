import React from "react";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Route 
        exact path={`${match.path}`} 
        render={props => (<CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />)}/>
        <Route 
        path={`${match.path}/:collectionId`} 
        render={props => (
            <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
