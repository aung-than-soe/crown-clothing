import { convertCollectionSnapShotToMap, firestore } from "../../firebase/firebase.util";
import ShopActionTypes from "./shop.types";


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailed = errorMsg => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMsg
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("shop_data");
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapShot => {
            const shopData = convertCollectionSnapShotToMap(snapShot);
            dispatch(fetchCollectionsSuccess(shopData));
        })
        .catch(err => dispatch(fetchCollectionsFailed(err.message)));
    }
}