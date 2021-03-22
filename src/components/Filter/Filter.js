import React, {useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import * as contactsActions from '../../redux/contacts/actions';
import s from '../Filter/Filter.module.css';
import contactsSelectors from '../../redux/contacts/selectors';

export default function Filter() {
    const dispatch = useDispatch();

    const name = useSelector(contactsSelectors.getFilterName);
    const items = useSelector(contactsSelectors.getAllContacts);

    const onChangeFilter = useCallback((e) => {
        dispatch(contactsActions.changeFilter(e.target.value))
    }, [dispatch]);
   
    return (
           < CSSTransition
        in={ items.length >= 2 }
    timeout = { 250}
    classNames = { s }
    unmountOnExit >
        <div className={s.container}>
            <label className={s.labelFilter}>Find contacts by name
             <br />
                <input className={s.filterInput}
                    type="text"
                    value={name}
                    onChange={onChangeFilter} />
            </label>
        </div>
        </CSSTransition >
    )
     
};