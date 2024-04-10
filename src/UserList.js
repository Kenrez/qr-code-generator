import LineUser from "./LineUser";

const UserList = ({users, handleEdit, handleCheck, handleDelete}) => {
  return (    
    <ul>
      <li className='user tblHead'>
        <input type="checkbox" />
        <label>First Name</label>
        <label>Last Name</label>
        <label>Birth Date</label>
        <label>Gender</label>
        <label>Address</label>
        <label>Email</label>
        <label>Contact Number</label>
        <label>Password</label>
        <label>Action</label>
      </li>
      {users.map((user) => (
        <LineUser
          key={user.id}
          user={user}
          handleEdit={handleEdit}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default UserList;