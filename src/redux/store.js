import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import journalistReducer from "./reducers/journalistReducer";
import articleReducer from "./reducers/articleReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    journalist: journalistReducer,
    articles: articleReducer,
  },
});

export default store;
