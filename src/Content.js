//import React, { useState, useEffect } from 'react';
//import axios from 'axios';

import UserList from "./UserList";

const Content = ({users, handleEdit, handleCheck, handleDelete}) => {
  return (
    <>
      {/*<h2>Form</h2>
        <ContactForm
        newUser={newUser}
        setNewUser={setNewUser}
        handleSubmit={handleSubmit}
      />*/}
      
      {users.length ? (
        <UserList
          users={users}
          handleEdit={handleEdit}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{margin: '50px 25px 0', padding: '15px 50px', backgroundColor: '#eaeaea'}}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;