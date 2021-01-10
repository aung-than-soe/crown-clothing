import { all, call } from "redux-saga/effects";
import { cartSagas } from "./cart/cart.sagas";
import { shopSagas } from "./shop/shop.sagas";
import { userSaga } from "./user/user.sagas";


export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSaga),
        call(cartSagas)
    ])
}