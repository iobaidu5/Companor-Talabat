import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../reducers/wishlistSlice";
import cartReducer from "../reducers/cartSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
