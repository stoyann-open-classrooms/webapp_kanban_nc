import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice'
import kanbanReducer from '../features/kanbans/kanbanSlice'
import requestReducer from '../features/requests/requestSlice'
import orderReducer from '../features/orders/orderSlice'
export const store = configureStore({
  reducer: {
     product: productReducer,
     kanban: kanbanReducer,
     order: orderReducer,
     request: requestReducer,
  },
});
