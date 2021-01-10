import { all, call, put, takeLatest } from 'redux-saga/effects';
import { convertCollectionSnapShotToMap, firestore } from '../../firebase/firebase.util';
import { fetchCollectionsFailed, fetchCollectionsSuccess } from './shop.actions';
import ShopActionTypes from './shop.types';


export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection("shop_data");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapShotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch(error ) {
        yield put(fetchCollectionsFailed(error.message));
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};

export function* shopSagas() {
    yield all([
        call(fetchCollectionStart)
    ])
}