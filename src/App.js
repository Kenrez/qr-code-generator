//import React from 'react'
import './App.css';
import Header from './Header';
import ContactForm from "./ContactForm";
import Content from './Content'; 
import Footer from './Footer';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
//import apiRequest from './apiRequest';
import api from './api/users';

function App() {
  //const API_URL = "http://localhost:3500/users";

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userActivity, setUserActivity] = useState('add');
  const [userID, setUserID] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [userQRCode, setUserQRCode] = useState('');

  // This one is for the localStorage
  //const [users, setUsers] = useState(JSON.parse(localStorage.getItem('userContactInfo')) || []);

  // This one is for the JSON server
  const [users, setUsers] = useState([]);

  //const [newUser, setNewUser] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    address: '',
    email: '',
    contactNumber: '',
    password: ''
  });

  // This one is for the localStorage
  /*useEffect(() => {
    localStorage.setItem('userContactInfo', JSON.stringify(users));
  },[users]);*/
  
  // This one is for the JSON server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
        setFetchError(null);
      } catch (err) {
        //console.log(err.stack);
        setFetchError(err.message);
        if(err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout( () => {
      (async () => await fetchUsers())();
    }, 2000);
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addUser = async (firstName, lastName, birthdate, gender, address, email, contactNumber, password) => {
      var id;   
      if(userID) {
        console.log(userID);
        id = userID;
        console.log('User Activity: '+userActivity);
      } else {
        id = users.length ? users[users.length -1].id + 1 : 1;
        console.log('Add User');
        console.log('User Activity: '+userActivity);
      }

      const myNewUser = {id, checked: isChecked, firstName, lastName, birthdate, gender, address, email, contactNumber, password};
      
      if(userID) {
        const response = await api.put(`/users/${userID}`, myNewUser);
        setUsers(users.map(user => user.id === userID ? {...response.data}: user));
        setUserActivity('add');
        setIsChecked(false);
        console.log("Update User goes here");
      } else {
        const response = await api.post('/users', myNewUser);
        const allUsers = [...users, response.data];
        setUserQRCode(JSON.stringify(response.data)); 
        setUsers(allUsers);
        console.log("Add User goes here"); 
      }           
    }
  
    try {
      //const response = await axios.post('/contactform', formDatas);
      // Handle the response, maybe show the QR code
      //console.log(response.data);

      if (!formData.firstName) return;
      addUser(
        formData.firstName, 
        formData.lastName, 
        formData.birthdate, 
        formData.gender, 
        formData.address, 
        formData.email, 
        formData.contactNumber, 
        formData.password
      );

      setFormData({
        firstName: '',
        lastName: '',
        birthdate: '',
        gender: '',
        address: '',
        email: '',
        contactNumber: '',
        password: ''
      });
      console.log('submitted'+' '+ addUser.length + ' '+isChecked);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changeCase = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.charAt(0).toUpperCase()+value.slice(1)});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = async (id) => {
    try {
      const listUsers = users.map((user) => user.id === id ? { ...user, checked: !user.checked } : user);
      //console.log(`key: ${id}`);
      const myUser = listUsers.filter((user) => user.id === id);
      await api.patch(`/users/${id}`, {checked: myUser[0].checked});
      setUsers(listUsers);
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    try {
      //const listUsers = users.map((user) => user.id === id ? { ...user, checked: !user.checked } : user);
      const listUsers = users.map((user) => user.id === id ? user : { ...user, checked: !user.checked });
      console.log(`key: ${id}`);
      const myUser = listUsers.filter((user) => user.id === id);
      setFormData({
        firstName: myUser[0].firstName,
        lastName: myUser[0].lastName,
        birthdate: myUser[0].birthdate,
        gender: myUser[0].gender,
        address: myUser[0].address,
        email: myUser[0].email,
        contactNumber: myUser[0].contactNumber,
        password: myUser[0].password
      });
      console.log(myUser[0].checked);
      setUserActivity('edit');
      setUserID(myUser[0].id);
      setIsChecked(myUser[0].checked);
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
       await api.delete(`/users/${id}`);
       const listUsers = users.filter(user => user.id !== id);
       setUsers(listUsers);
       console.log(`key: ${id}`);
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      
      <Header title="User Contact Information" />

      <main className='App-body'>
        <section className='userContactInformation'>
          <ContactForm
            formData={formData}
            QRCode={QRCode}
            userQRCode={userQRCode}
            userActivity={userActivity}
            changeCase={changeCase}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <div className="userList">
            {isLoading && <p style={{margin: "100px auto"}}>Loading Users...</p>}
            {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading &&
            <Content
              users={users}
              handleEdit={handleEdit}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />}
          </div>
        </section>
      </main>
      
      <Footer copyright="&copy; Copyright" year={new Date().getFullYear()} />

    </div>
  );
}

export default App;