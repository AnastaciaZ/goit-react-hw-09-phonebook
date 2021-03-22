import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigations/Navigation';
import UserMenu from '../User/UserMenu';
import s from '../AppBar/AppBar.module.css';


export default function AppBar() {
    const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
    return (
      <header className={s.header}>
        <Navigation />
        {isAuthenticated ? <UserMenu/> : <AuthNav />}  
    </header>
    )
};