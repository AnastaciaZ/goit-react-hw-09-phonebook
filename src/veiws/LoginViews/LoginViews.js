import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors';
import authAction from '../../redux/auth/auth-actions';
import Button from '../../components/Button/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Logo from '../../components/Logo/Logo';
import s from '../LoginViews/LoginViews.module.css';

export default function LoginViews() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loadingloginUser = useSelector(authSelectors.getAuthLoading);
    const error = useSelector(authSelectors.getAuthError);
   

    useEffect(() => {
        if(error){
            setTimeout(() => {
                dispatch(authAction.clearError());
            }, 2000);
        }
    });
   
     const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
               break;
            
            default:
                return;
        }
    };


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(authOperations.logIn({email, password}))

        reset();
    };

    const reset = () => {
        setEmail('');
        setPassword('');
    };
    
    return (
            <div>
                <Logo title="Login" />
                <div className={s.loading}>
                {error && <Alert variant={'danger'}>{`ERROR: ${error}`}</Alert>}
                {loadingloginUser &&
                    <Spinner animation="grow" variant="dark">
                    <h2 className={s.loadingText}>Loading...</h2>
                    </Spinner>
                }
            </div>
                <div className={s.container}>
                    <form onSubmit={handleSubmit}
                        className={s.form}
                        autoComplete="off"
                    >
                        <label className={s.label}>
                            Email
                            <input
                                className={s.input}
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </label>
                        
                        <label className={s.label}>
                            Password
                            <input
                                className={s.input}
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            </label>
                        <Button label="Log in" type="submit" />
                        </form>
                </div>
            </div>
        )
};