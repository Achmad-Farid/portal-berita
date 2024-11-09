import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import journalistReducer from "./reducers/journalistReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    journalist: journalistReducer,
  },
});

export default store;
