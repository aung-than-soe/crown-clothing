import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import {
  CollectionContainer,
  ItemsContainer,
  TitleContainer,
} from "./collection.style";

const CollectionPage = ({ collection: { title, items } }) => (
  <CollectionContainer>
    <TitleContainer>{title}</TitleContainer>
    <ItemsContainer>
      {items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </ItemsContainer>
  </CollectionContainer>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
