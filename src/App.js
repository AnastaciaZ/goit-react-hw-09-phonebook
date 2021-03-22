import React,{ Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from './components/UserMenu/AppBar/AppBar';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/UserMenu/PrivateRoute';
import PublicRoute from './components/UserMenu/PublicRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './App.module.css';

const HomeView = lazy(() => import('./veiws/HomeView/HomeView'));
const RegisterViews = lazy(() => import('./veiws/RegisterViews/RegisterViews'));
const LoginViews = lazy(() => import('./veiws/LoginViews/LoginViews'));
const ContactsViews = lazy(() => import('./veiws/ContactsViews/ContactsViews'));

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
   }, [dispatch]);

  return (
      <div className={s.container}>
     
        <AppBar />
       
        <Suspense fallback={<p className={s.loading}>Loading...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomeView/>
          </PublicRoute>

          <PublicRoute
              path="/register"
              restricted
              redirectTo="/">
              <RegisterViews/>
          </PublicRoute>

          <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts">
              <LoginViews/>
          </PublicRoute>
              
          <PrivateRoute
                path="/contacts"
                redirectTo="/login">
                <ContactsViews/>
          </PrivateRoute>
              </Switch>
              </Suspense>
      </div>
    )
};