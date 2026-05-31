import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from './redux/contactsSlice';
import { setFilter } from './redux/filtersSlice';
import { selectFilteredContacts, selectFilter, selectIsLoading, selectError } from './redux/selectors';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [phonenum, setPhonenum] = useState('');

    const contacts = useSelector(selectFilteredContacts);
    const filter = useSelector(selectFilter);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContact({ name, phonenum }));
        setName('');
        setPhonenum('');
    };

    const getInitials = name => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    return (
    <div className="wrap">
        <div className="header">
            <h1>Книга контактів</h1>
        </div>

        <div className="card">
            <div className="card-title">Створити контакт</div>
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" />
                    <input value={phonenum} onChange={e => setPhonenum(e.target.value)} placeholder="Номер телефону" />
                </div>
                <button className="add-btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Додавання...' : '+ Додати контакт'}
                </button>
            </form>
        </div>

        <div className="card">
            <div className="card-title">Контакти</div>
            <div className="search">
                <div className="search-wrap">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input value={filter} onChange={e => dispatch(setFilter(e.target.value))} placeholder="Пошук за іменем..." />
                </div>
            </div>

            {isLoading && !error && <p className="loading">Завантаження...</p>}
            {error && <p className="error">Помилка: {error}</p>}

            <ul className="contacts" style={{listStyle:'none'}}>
                {contacts.length === 0 && !isLoading
                    ? <p className="empty">Контактів не знайдено</p>
                    : contacts.map(contact => (
                        <li key={contact.id} className="contact">
                            <div className="avatar">{getInitials(contact.name)}</div>
                            <div className="contact-info">
                                <div className="contact-name">{contact.name}</div>
                                <div className="contact-num">{contact.phonenum}</div>
                            </div>
                            <button className="del" onClick={() => dispatch(deleteContact(contact.id))} disabled={isLoading}>
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                                    <path d="M10 11v6M14 11v6"/>
                                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                                </svg>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
    );
}

export default App;