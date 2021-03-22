import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';
import authOperations from '../../../redux/auth/auth-operations';
import authAction from '../../../redux/auth/auth-actions';
import Button from '../../Button/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import s from './UserMenu.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    
    const name = useSelector(authSelectors.getUserName);
    const error = useSelector(authSelectors.getAuthError);
    const loadinglogoutUser = useSelector(authSelectors.getAuthLoading);

     useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(authAction.clearError());
        }, 2000);           
    }
  });
      
    const onLogout = useCallback(() => {
        dispatch(authOperations.logOut());
    }, [dispatch]);

    return (
        <>
         <div className={s.loading}>
            {error && <Alert variant={'danger'}>{`ERROR: ${error}`}</Alert>}
            {loadinglogoutUser &&
                <Spinner animation="grow" variant="dark">
                <h2 className={s.loadingText}>Loading...</h2>
                </Spinner>}
            </div>

        <div className={s.container}>
         <span className={s.name}>Welcome, {name}</span>
         <Button label="Logout" type="button" onClick={onLogout} />
            </div>
            </>
    )
};