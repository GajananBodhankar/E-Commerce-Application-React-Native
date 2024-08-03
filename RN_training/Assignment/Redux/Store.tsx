import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './ProductSlice';
import { loginReducer } from './LoginSlice';
import { cartReducer } from './CartSlice';
const RedStore = configureStore({
  reducer: {
    loginReducer,
    productReducer,
    cartReducer,
  },
});
export default RedStore;
export type RootState = ReturnType<typeof RedStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof RedStore.dispatch;
