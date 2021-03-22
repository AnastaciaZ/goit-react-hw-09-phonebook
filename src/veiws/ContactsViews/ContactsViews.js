import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
import Logo from '../../components/Logo/Logo';
import s from '../ContactsViews/ContactsViews.module.css';
import contactsOperations from '../../redux/contacts/operations';
import contactsSelectors from '../../redux/contacts/selectors';
import { clearContactsError} from '../../redux/contacts/actions';
  
export default function ContactsViews() {
  const dispatch = useDispatch();

  const loadingContacts = useSelector(contactsSelectors.getLoading);
  const error = useSelector(contactsSelectors.getContactsError);

  useEffect(() => {
        dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  
  useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(clearContactsError());
        }, 2000);           
    }
  });
  
  return (
      <div>
        <Logo title="Phonebook" />
        <div className={s.loading}>
        {error && <Alert variant={'danger'}>{`ERROR: ${error}`}</Alert>}
          {loadingContacts &&
            <Spinner animation="grow" variant="dark">
              <h2 className={s.loadingText}>Loading...</h2>
          </Spinner>}
        </div>
        
        <div className={s.container}>
          <ContactForm />
          <Filter />
          <ContactList />
        </div>
      </div>
    );
};
