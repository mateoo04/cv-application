import { useState } from 'react';
import EditEducationEntry from './EditEducationEntry.jsx';
import EditWorkExperienceEntry from './EditWorkExperienceEntry.jsx';
import '../styles/EditForm.css';

function deepEquality(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) return false;

  return firstArray.every((item, index) => {
    if (
      item.id !== secondArray[index].id ||
      Object.keys(item).length !== Object.keys(secondArray[index]).length
    )
      return false;
    return Object.keys(item).every((key) => {
      if (Array.isArray(item)) {
        return firstArray.every((item, index) => {
          return item === secondArray[index];
        });
      } else return item[key] === secondArray[index][key];
    });
  });
}

export default function EditForm({
  name,
  surname,
  email,
  phoneNum,
  education,
  workExperience,
  handleNameChange,
  handleSurnameChange,
  handleEmailChange,
  handlePhoneNumChange,
  handleEducationChange,
  handleWorkExperienceChange,
  onDone,
}) {
  const [modifiedName, setModifiedName] = useState(name);
  const [modifiedSurname, setModifiedSurname] = useState(surname);
  const [modifiedEmal, setModifiedEmal] = useState(email);
  const [modifiedPhoneNum, setModifiedPhoneNum] = useState(phoneNum);
  const [modifiedEducation, setModifiedEducation] = useState(education);
  const [modifiedWorkExperience, setModifiedWorkExperience] =
    useState(workExperience);

  function handleModifiedNameChange(e) {
    setModifiedName(e.target.value);
  }
  function handleModifiedSurnameChange(e) {
    setModifiedSurname(e.target.value);
  }
  function handleModifiedEmalChange(e) {
    setModifiedEmal(e.target.value);
  }
  function handleModifiedPhoneNumChange(e) {
    setModifiedPhoneNum(e.target.value);
  }

  function handleModifiedEducationChange(id, modifiedProperties) {
    setModifiedEducation(
      modifiedEducation.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...modifiedProperties };
        } else return entry;
      })
    );
  }

  function handleModifiedWorkExperienceChange(id, modifiedProperties) {
    setModifiedWorkExperience(
      modifiedWorkExperience.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...modifiedProperties };
        } else return entry;
      })
    );
  }

  function appendWorkExperienceEntry() {
    setModifiedWorkExperience([
      ...modifiedWorkExperience,
      {
        companyName: '',
        position: '',
        mainResponsibilities: [{ value: '', id: 0 }],
        startDate: '',
        endDate: '',
        id: modifiedWorkExperience[modifiedWorkExperience.length - 1].id + 1,
      },
    ]);
  }

  function appendEducationEntry() {
    setModifiedEducation([
      ...modifiedEducation,
      {
        schoolName: '',
        titleOfStudy: '',
        startDate: '',
        endDate: '',
        id: modifiedEducation[modifiedEducation.length - 1].id + 1,
      },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== modifiedName) handleNameChange(modifiedName);
    if (surname !== modifiedSurname) handleSurnameChange(modifiedSurname);
    if (email !== modifiedEmal) handleEmailChange(modifiedEmal);
    if (phoneNum !== modifiedPhoneNum) handlePhoneNumChange(modifiedPhoneNum);
    if (!deepEquality(education, modifiedEducation))
      handleEducationChange(modifiedEducation);
    if (!deepEquality(workExperience, modifiedWorkExperience)) {
      handleWorkExperienceChange(modifiedWorkExperience);
    }

    onDone();
  }

  return (
    <>
      <h1>Editing Mode</h1>
      <form onSubmit={handleSubmit}>
        <div className='general-information'>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              id='name'
              value={modifiedName}
              onChange={handleModifiedNameChange}
            />
          </label>
          <label htmlFor='surname'>
            Surname
            <input
              type='text'
              id='surname'
              value={modifiedSurname}
              onChange={handleModifiedSurnameChange}
            />
          </label>
          <label htmlFor='email'>
            Email
            <input
              type='email'
              id='email'
              value={modifiedEmal}
              onChange={handleModifiedEmalChange}
            />
          </label>
          <label htmlFor='phoneNum'>
            Phone number
            <input
              type='tel'
              id='phoneNum'
              value={modifiedPhoneNum}
              onChange={handleModifiedPhoneNumChange}
            />
          </label>
        </div>

        <h2>Education</h2>
        <div className='edit-education-list'>
          {modifiedEducation.map((entry) => {
            return (
              <EditEducationEntry
                key={'edit-education-list-item-' + entry.id}
                educationEntry={entry}
                handleModifiedEducationChange={handleModifiedEducationChange}
              />
            );
          })}
        </div>
        <button type='button' value='' onClick={() => appendEducationEntry()}>
          ADD EDUCATION ENTRY
        </button>

        <h2>Work Experience</h2>
        <div className='edit-work-experience-list'>
          {modifiedWorkExperience.map((entry) => {
            return (
              <EditWorkExperienceEntry
                key={'edit-work-experience-list-item-' + entry.id}
                workExperienceEntry={entry}
                handleModifiedWorkExperienceChange={
                  handleModifiedWorkExperienceChange
                }
              />
            );
          })}
        </div>
        <button
          type='button'
          value=''
          onClick={() => appendWorkExperienceEntry()}
        >
          ADD WORK EXPERIENCE ENTRY
        </button>

        <div className='finish-editing-buttons'>
          <input type='submit' value='SAVE CHANGES' />
          <button type='button' onClick={onDone}>
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
}
