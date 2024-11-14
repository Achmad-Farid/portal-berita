import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import journalistReducer from "./reducers/journalistReducer";
import articleReducer from "./reducers/articleReducer";
import adminReducer from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    journalist: journalistReducer,
    articles: articleReducer,
    admin: adminReducer,
  },
});

export default store;
