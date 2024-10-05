import { useState } from 'react';
import '../styles/EditForm.css';

export default function EditForm({
  name,
  surname,
  email,
  phoneNum,
  handleNameChange,
  handleSurnameChange,
  handleEmailChange,
  handlePhoneNumChange,
  onSubmit,
}) {
  const [editName, setEditName] = useState(name);
  const [editSurname, setEditSurname] = useState(surname);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhoneNum, setEditPhoneNum] = useState(phoneNum);

  function handleEditNameChange(e) {
    setEditName(e.target.value);
  }
  function handleEditSurnameChange(e) {
    setEditSurname(e.target.value);
  }
  function handleEditEmailChange(e) {
    setEditEmail(e.target.value);
  }
  function handleEditPhoneNumChange(e) {
    setEditPhoneNum(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== editName) handleNameChange(editName);
    if (surname !== editSurname) handleSurnameChange(editSurname);
    if (email !== editEmail) handleEmailChange(editEmail);
    if (phoneNum !== editPhoneNum) handlePhoneNumChange(editPhoneNum);

    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Name
        <input
          type='text'
          id='name'
          value={editName}
          onChange={handleEditNameChange}
        />
      </label>
      <label htmlFor='surname'>
        Surname
        <input
          type='text'
          id='surname'
          value={editSurname}
          onChange={handleEditSurnameChange}
        />
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          id='email'
          value={editEmail}
          onChange={handleEditEmailChange}
        />
      </label>
      <label htmlFor='phoneNum'>
        Phone number
        <input
          type='tel'
          id='phoneNum'
          value={editPhoneNum}
          onChange={handleEditPhoneNumChange}
        />
      </label>

      <input type='submit' value='SAVE CHANGES' />
    </form>
  );
}
