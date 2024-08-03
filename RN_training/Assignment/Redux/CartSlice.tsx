import { createSlice } from '@reduxjs/toolkit';
interface ICart {
  id: number;
  price: number;
  title: string;
  image: string;
  details: string;
  category: string;
  count: number;
}
interface ICartdata {
  cart: ICart[];
  mainCart: ICart[];
}
const CartObj: ICartdata = {
  cart: [],
  mainCart: [],
};
export const SliceCart = createSlice({
  name: 'Cart',
  initialState: CartObj,
  reducers: {
    IncCart: (state, action) => {
      var index: number = state.cart.findIndex(i => i.id == action.payload.id);
      if (index >= 0) {
        state.cart[index] = {
          ...state.cart[index],
          count: (state.cart[index].count ?? 0) + 1,
        };
      } else {
        state.cart.push(action.payload);
      }
    },
    DecCart: (state, action) => {
      var index = state.cart.findIndex(item => item.id == action.payload.id);
      if (index >= 0 && state.cart[index].count != 0) {
        state.cart[index] = {
          ...state.cart[index],
          count: (state.cart[index].count ?? 0) - 1,
        };
      }
    },
    deleteCart: (state, action) => {
      var tempArr = state.mainCart.filter(item => item.id != action.payload.id);
      state.mainCart = tempArr;
      state.cart = tempArr;
    },
    addToCart: state => {
      if (state.cart.length != 0) {
        state.mainCart = state.cart.filter(item => item.count > 0);
      }
    },
    emptyCart: (state, action) => {
      if (action.payload == 'logout') {
        state.mainCart = [];
        state.cart = [];
      }
    },
  },
});
export const cartReducer = SliceCart.reducer;
export const { DecCart, deleteCart, addToCart, IncCart, emptyCart } =
  SliceCart.actions;
