import { useState } from 'react';
import EditEducationEntry from './EditEducationEntry.jsx';
import EditWorkExperienceEntry from './EditWorkExperienceEntry.jsx';
import '../styles/EditForm.css';
import { isBefore } from 'date-fns';

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

function isOlder(first, second) {
  if (first.endDate !== '' && second.endDate !== '') {
    return isBefore(first.endDate, second.endDate);
  } else if (first.endDate === '' && second.endDate === '') {
    return isBefore(first.startDate, second.endDate);
  } else if (first.endDate !== '' && second.endDate === '') {
    return isBefore(first.endDate, second.startDate);
  } else if (first.endDate === '' && second.endDate !== '') {
    return isBefore(first.startDate, second.endDate);
  }

  return 0;
}

const sortFromNewestToOldest = (a, b) => {
  const older = isOlder(a, b);
  if (older === 0) return 0;
  else if (older) return 1;
  else if (!older) return -1;
};

export default function EditForm({
  generateId,
  sortEducation,
  handleSortEducationChange,
  sortWorkExperience,
  handleSortWorkExperienceChange,
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
  const [modifiedSortEducation, setModifiedSortEducation] =
    useState(sortEducation);
  const [modifiedSortWorkExperience, setModifiedSortWorkExperience] =
    useState(sortWorkExperience);

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
        mainResponsibilities: [{ value: '', id: generateId() }],
        startDate: '',
        endDate: '',
        id: generateId(),
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
        id: generateId(),
      },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== modifiedName) handleNameChange(modifiedName);
    if (surname !== modifiedSurname) handleSurnameChange(modifiedSurname);
    if (email !== modifiedEmal) handleEmailChange(modifiedEmal);
    if (phoneNum !== modifiedPhoneNum) handlePhoneNumChange(modifiedPhoneNum);
    if (
      !deepEquality(education, modifiedEducation) ||
      modifiedSortEducation !== sortEducation
    ) {
      modifiedSortEducation && modifiedEducation.sort(sortFromNewestToOldest);
      handleEducationChange(modifiedEducation);
    }
    if (modifiedSortEducation !== sortEducation) handleSortEducationChange();
    if (
      !deepEquality(workExperience, modifiedWorkExperience) ||
      modifiedSortWorkExperience !== sortWorkExperience
    ) {
      modifiedSortWorkExperience &&
        modifiedWorkExperience.sort(sortFromNewestToOldest);
      handleWorkExperienceChange(modifiedWorkExperience);
    }
    if (modifiedSortWorkExperience !== sortWorkExperience)
      handleSortWorkExperienceChange();

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
              required
              type='text'
              id='name'
              value={modifiedName}
              onChange={handleModifiedNameChange}
            />
          </label>
          <label htmlFor='surname'>
            Surname
            <input
              required
              type='text'
              id='surname'
              value={modifiedSurname}
              onChange={handleModifiedSurnameChange}
            />
          </label>
          <label htmlFor='email'>
            Email
            <input
              required
              type='email'
              id='email'
              value={modifiedEmal}
              onChange={handleModifiedEmalChange}
            />
          </label>
          <label htmlFor='phoneNum'>
            Phone number
            <input
              pattern='[0-9]{7,}'
              type='tel'
              id='phoneNum'
              value={modifiedPhoneNum}
              onChange={handleModifiedPhoneNumChange}
            />
          </label>
        </div>

        <h2>Education</h2>
        <label
          htmlFor='sort-education-checkbox'
          className='sort-checkbox-label'
        >
          <input
            type='checkbox'
            id='sort-education-checkbox'
            onChange={() => setModifiedSortEducation(!modifiedSortEducation)}
            checked={modifiedSortEducation}
          />
          Sort from most recent
        </label>
        <div className='edit-education-list'>
          {modifiedEducation.map((entry) => {
            return (
              <EditEducationEntry
                generateId={generateId}
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
        <label
          htmlFor='sort-work-experience-checkbox'
          className='sort-checkbox-label'
        >
          <input
            type='checkbox'
            id='sort-work-experience-checkbox'
            checked={modifiedSortWorkExperience}
            onChange={() =>
              setModifiedSortWorkExperience(!modifiedSortWorkExperience)
            }
          />
          Sort from most recent
        </label>
        <div className='edit-work-experience-list'>
          {modifiedWorkExperience.map((entry) => {
            return (
              <EditWorkExperienceEntry
                generateId={generateId}
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
