import { useState } from 'react';
import '../styles/EditForm.css';

function deepEquality(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) return false;

  return firstArray.every((item, index) => {
    if (
      item.id !== secondArray[index].id ||
      Object.keys(item).length !== Object.keys(secondArray[index]).length
    )
      return false;

    return Object.keys(item).every(
      (key) => item[key] === secondArray[index][key]
    );
  });
}

function EditEducationEntry({ educationEntry, handleEditEducationChange }) {
  const { schoolName, titleOfStudy, startDate, endDate, id } = educationEntry;

  return (
    <>
      <label htmlFor='school-name'>
        <input
          type='text'
          id='school-name'
          value={schoolName}
          onChange={(e) =>
            handleEditEducationChange(id, { schoolName: e.target.value })
          }
        />
      </label>
      <label htmlFor='study-title'>
        <input
          type='text'
          id='study-title'
          value={titleOfStudy}
          onChange={(e) =>
            handleEditEducationChange(id, { titleOfStudy: e.target.value })
          }
        />
      </label>
      <label htmlFor='start-date'>
        <input
          type='date'
          id='start-date'
          value={startDate}
          onChange={(e) =>
            handleEditEducationChange(id, { startDate: e.target.value })
          }
        />
      </label>
      <label htmlFor='end-date'>
        <input
          type='date'
          id='end-date'
          value={endDate}
          onChange={(e) =>
            handleEditEducationChange(id, { endDate: e.target.value })
          }
        />
      </label>
    </>
  );
}

export default function EditForm({
  name,
  surname,
  email,
  phoneNum,
  education,
  handleNameChange,
  handleSurnameChange,
  handleEmailChange,
  handlePhoneNumChange,
  handleEducationChange,
  onSubmit,
}) {
  const [editName, setEditName] = useState(name);
  const [editSurname, setEditSurname] = useState(surname);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhoneNum, setEditPhoneNum] = useState(phoneNum);
  const [editEducation, setEditEducation] = useState(education);

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

  function handleEditEducationChange(id, modifiedProperties) {
    setEditEducation(
      editEducation.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...modifiedProperties };
        } else return entry;
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== editName) handleNameChange(editName);
    if (surname !== editSurname) handleSurnameChange(editSurname);
    if (email !== editEmail) handleEmailChange(editEmail);
    if (phoneNum !== editPhoneNum) handlePhoneNumChange(editPhoneNum);
    if (!deepEquality(education, editEducation))
      handleEducationChange(editEducation);

    onSubmit();
  }

  return (
    <>
      <h1>Editing</h1>
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

        <h2>Education</h2>
        <div className='edit-education-list'>
          {editEducation.map((entry) => {
            return (
              <EditEducationEntry
                key={'edit-education-list-item-' + entry.id}
                educationEntry={entry}
                handleEditEducationChange={handleEditEducationChange}
              />
            );
          })}
        </div>

        <input type='submit' value='SAVE CHANGES' />
      </form>
    </>
  );
}
