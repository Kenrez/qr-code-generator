const LineUser = ({user, handleEdit, handleCheck, handleDelete}) => {
  return (
    <li className='user' key={user.id}
      onDoubleClick={() => handleEdit(user.id)}
    >
      <input
        type="checkbox"
        onChange={() => handleCheck(user.id)}
        checked={user.checked}
      />
      <label>{user.firstName}</label>
      <label>{user.lastName}</label>
      <label>{user.birthdate}</label>
      <label>{user.gender}</label>
      <label>{user.address}</label>
      <label>{user.email}</label>
      <label>{user.contactNumber}</label>
      <label>{user.password}</label>
      <button 
        onClick={() => handleDelete(user.id)} 
        style={{textDecoration:'none'}}
        aria-label={`Delete ${user.user}`}>Delete</button>
    </li>     
  );
};

export default LineUser;