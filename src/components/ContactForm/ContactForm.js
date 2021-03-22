import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/operations';
import contactsSelectors from '../../redux/contacts/selectors';
import { clearContactsError } from '../../redux/contacts/actions';
import shortid from 'shortid';
import Button from '../Button/Button';
import AlertMessage from '../Alert/Alert';
import styleAlert from '../Alert/Alert.module.css';
import Alert from 'react-bootstrap/Alert';
import s from '../ContactForm/ContactForm.module.css';


export default function ContactForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState(null);

    const items = useSelector(contactsSelectors.getAllContacts);
    const error = useSelector(contactsSelectors.getContactsError);

    useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(clearContactsError());
        }, 2000);           
    }
  });

    const nameInputId = shortid.generate();

    const handleChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            
            default:
                return;
        }
   
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (name === '') {
            setMessage('Please enter contact name')|| alert();
            return;
        }
        if (number === '') {
            setMessage('Please enter contact number')|| alert();
            return;
        } 
        if (items.some((item) => item.name === name)) {
            setMessage(`${name} is already in contacts!`)|| alert();
            return;
        }

        dispatch(contactsOperations.addContact(name, number))
        reset();
    };

    const alert = () => {
        setTimeout(() => {
            setMessage(null);
      }, 2000)
    }
    const reset = () => {
        setName('');
        setNumber('');
    };
    
    return (
         <>
            <div className={s.loading}>
            {error && <Alert variant={'danger'}>{`ERROR: ${error}`}</Alert>}
            </div>

            <form className={ s.contactsForm} onSubmit={handleSubmit}>
                <label htmlFor={nameInputId} className={ s.labelForm}>  
                    Name
           <br />
                    <input
                    className={ s.contactInput}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                        id={nameInputId} />
                </label>
                <br/>
                <label className={ s.labelForm}>
                    Number
                     <br />
            <input
                    className={ s.contactInput}
                    type="text"
                    name="number"
                    value={number}
                    onChange={handleChange} />
                </label>
                <br />
                <Button label="Add contact" type="submit" />
                
                <CSSTransition
                    in={message!==null}
                    timeout={250}
                    classNames={styleAlert}
                unmountOnExit>
                    <AlertMessage message={ message}/>
               </CSSTransition>

                </form>
            </>    
    )
};
