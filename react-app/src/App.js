import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import GetAllItems from "./components/GetAllItems/GetAllItems";
import GetItemById from "./components/GetItemById/GetItemById";
import CreateCustomizedItem from "./components/CreateCustomizedItem/CreateCustomizedItem";
import GetCustomizedItems from "./components/GetCustomizedItems/GetCustomizedItems";
import GetCurrentOrder from "./components/GetCurrentOrder/GetCurrentOrder";
import GetOrderItems from "./components/GetOrderItem/GetOrderItem";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import EditCustomizedItem from "./components/EditCustomizedItem/EditCustomizedItem";
import ThankYou from "./components/ThankYou/ThankYou";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/menu" exact={true}>
          <GetAllItems />
        </Route>
        <Route path="/items/:itemId" exact={true}>
          <GetItemById />
        </Route>
        <Route path="/order" exact={true}>
          <GetCurrentOrder />
        </Route>
        <Route path="/:orderId/order_items" exact={true}>
          <GetOrderItems />
        </Route>

        <Route path="/:itemId/customize" exact={true}>
          <CreateCustomizedItem />
        </Route>
        <Route path="/:customizedItem_id/customize/edit" exact={true}>
          <EditCustomizedItem />
        </Route>
        <Route path="/my-customized-items" exact={true}>
          <GetCustomizedItems />
        </Route>
        <Route path="/thank-you" exact={true}>
          <ThankYou />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
