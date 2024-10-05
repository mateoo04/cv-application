import { useState } from 'react';

export default function EditForm({
  name,
  surname,
  email,
  phoneNum,
  handleNameChange,
}) {
  console.log(name);

  const [editName, setEditName] = useState(name);
  const [editSurname, setEditSurname] = useState(surname);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhoneNum, setEditPhoneNum] = useState(phoneNum);

  function handleEditNameChange(e) {
    setEditName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== editName) handleNameChange(editName);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for='name'>
        <input
          type='text'
          id='name'
          value={editName}
          onChange={handleEditNameChange}
        />
      </label>
      <label for='surname'>
        <input type='text' id='surname' value={editSurname} />
      </label>
      <label for='email'>
        <input type='email' id='email' value={editEmail} />
      </label>
      <label for='phoneNum'>
        <input type='tel' id='phoneNum' value={editPhoneNum} />
      </label>

      <input type='submit' value='SAVE CHANGES' />
    </form>
  );
}
