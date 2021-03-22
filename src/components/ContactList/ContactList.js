import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/contacts/operations';
import { clearContactsError } from '../../redux/contacts/actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Alert from 'react-bootstrap/Alert';
import Button from '../Button/Button';
import s from '../ContactList/ContactList.module.css';
import contactsSelectors from '../../redux/contacts/selectors';


export default function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector(contactsSelectors.getAllContacts);
    const error = useSelector(contactsSelectors.getContactsError);

   useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(clearContactsError());
        }, 2000);           
    }
   });
    
    return (
         <>
        <div className={s.loading}>
        {error && <Alert variant={'danger'}>{`ERROR: ${error}`}</Alert>}
        </div>
                
        <TransitionGroup component="ul">
            {contacts.map(({ id, name, number }) => (
                <CSSTransition key={id} timeout={250} classNames={s}>
                    <li className={s.contactList} id={ id}>
                        <p className={s.contactText}>{name}</p>
                        <p className={s.contactText}>{number}</p>
                        <Button label="Delete" onClick={()=>dispatch(contactsOperations.deleteContact(id))} />
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
        </>
    )
};