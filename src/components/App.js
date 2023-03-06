import './App.css';
import React,{useState,useEffect} from 'react';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { v4 as uuid } from 'uuid'

function App() {
  const LOCAL_STORAGE_KEY='contacts';
  const[contacts, Setcontacts]=useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    console.log(contact)
    Setcontacts([...contacts,{id:uuid() , ...contact}])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id; 
    })
    Setcontacts(newContactList);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) Setcontacts(retriveContacts)
  },[])


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts])

  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId = {removeContactHandler}/>
    </div>
  );
}

export default App;
