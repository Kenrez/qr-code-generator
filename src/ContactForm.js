import users from "./api/users";

const ContactForm = ({formData, QRCode, userQRCode, userActivity, changeCase, handleChange, handleSubmit}) => {

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      {/* Input fields for contact information */}
      <label htmlFor="addUser">{/*userActivity === 'add' ? 'Add':'Edit'*/} Contact Form</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        onMouseEnter={changeCase}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        onMouseEnter={changeCase}
      />
      <input
        type="text"
        name="birthdate"
        placeholder="Birthdate"
        value={formData.birthdate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        onMouseEnter={changeCase}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        onMouseEnter={changeCase}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {userQRCode && (
      <div>
          <h2>QR Code:</h2>
          <QRCode value={userQRCode} style={{height:'auto', width:'auto', marginBottom: '20px'}} />
        </div>
      )}
      <input
        type="submit"
        value={`${userActivity === 'add' ? 'Add':'Update'}` + " "}
        style={{fontSize: '16px', textTransform: 'uppercase', fontWeight: 'bold'}}
      />
    </form>
  );
};

export default ContactForm;