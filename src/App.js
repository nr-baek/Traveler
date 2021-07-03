import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import PosterPage from "./pages/PosterPage";

import { Route, Switch } from "react-router-dom";
import Error from "./pages/Error";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import store from "./redux/store";
import MyPage from "./pages/MyPage";
import MapPage from "./pages/MapPage";

// redux-persist 사용
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

// function loadUser() {
//   try {
//     const token = sessionStorage.getItem("token");
//     if (!token) return;

//     store.dispatch({ type: "auth/LOGIN_SUCCESS", payload: token });
//   } catch (e) {
//     console.log("SessionStorage is not working");
//   }
// }
// loadUser();

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route component={LoginPage} path="/login" />
            <Route component={RegisterPage} path="/register" />
            <Route component={PosterPage} path="/poster" />
            <Route component={MyPage} path="/mypage" />
            <Route component={MapPage} path="/map" />
            <Route component={HomePage} path={["/"]} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
