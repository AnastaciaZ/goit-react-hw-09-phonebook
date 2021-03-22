import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';
import s from '../Navigations/Navigation.module.css';

export default function Navigation() {
    const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
    return(
    <div>
        <NavLink
            to="/"
            exact
            className={s.NavigationLink}
            activeClassName={s.NavigationLinkActive}>
            Main
        </NavLink>
        {isAuthenticated && (
            <NavLink
                to="/contacts"
                exact
                className={s.NavigationLink}
                activeClassName={s.NavigationLinkActive}>
                Phonebook
            </NavLink>
        )}
        </div>
    )
};


