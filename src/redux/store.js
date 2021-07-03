import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules/";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./modules/index";

// reudx-persist 사용
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// redux-persist 사용 후
const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// redux-persist 사용 전
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware)),
// );

// sagaMiddleware.run(rootSaga);

// export default store;
