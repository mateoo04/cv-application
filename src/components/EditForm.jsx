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
  if (first.endDate === 'ongoing' && second.endDate === 'ongoing') {
    return isBefore(first.startDate, second.startDate);
  } else if (first.endDate === 'ongoing') return false;
  else if (second.endDate === 'ongoing') return true;

  if (first.endDate !== '' && second.endDate !== '') {
    return isBefore(first.endDate, second.endDate);
  } else if (first.endDate === '' && second.endDate === '') {
    return isBefore(first.startDate, second.startDate);
  } else if (first.endDate !== '' && second.endDate === '') {
    return isBefore(first.endDate, second.startDate);
  } else if (first.endDate === '' && second.endDate !== '') {
    return isBefore(first.startDate, second.endDate);
  }
}

const sortFromNewestToOldest = (a, b) => {
  if (isOlder(a, b)) return 1;
  else if (isOlder(b, a)) return -1;

  return 0;
};

function move(array, handlingFunction, index, direction) {
  //direction is -1 for moving the item up in the araay and +1 for moving it further down
  const newArray = [...array];

  if (
    (index > 0 && direction === -1) ||
    (index !== array.length - 1 && direction === 1)
  ) {
    [newArray[index], newArray[index + direction]] = [
      newArray[index + direction],
      newArray[index],
    ];
  } else return;

  handlingFunction(newArray);
}

function removeEntry(array, handlingFunction, index) {
  const newArray = [...array];
  newArray.splice(index, 1);

  handlingFunction(newArray);
}

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
  const [modifiedEmail, setModifiedEmail] = useState(email);
  const [modifiedPhoneNum, setModifiedPhoneNum] = useState(phoneNum);
  const [modifiedEducation, setModifiedEducation] = useState(education);
  const [modifiedWorkExperience, setModifiedWorkExperience] =
    useState(workExperience);
  const [modifiedSortEducation, setModifiedSortEducation] =
    useState(sortEducation);
  const [modifiedSortWorkExperience, setModifiedSortWorkExperience] =
    useState(sortWorkExperience);

  function clearAllFields() {
    setModifiedName('');
    setModifiedSurname('');
    setModifiedEmail('');
    setModifiedPhoneNum('');
    setModifiedEducation([
      {
        schoolName: '',
        titleOfStudy: '',
        startDate: '',
        endDate: '',
        id: generateId(),
      },
    ]);
    setModifiedWorkExperience([
      {
        companyName: '',
        position: '',
        mainResponsibilities: [
          {
            value: '',
            id: generateId(),
          },
        ],
        startDate: '',
        endDate: '',
        id: generateId(),
      },
    ]);
    setModifiedSortEducation(false);
    setModifiedSortWorkExperience(false);
  }

  function handleModifiedNameChange(e) {
    setModifiedName(e.target.value);
  }
  function handleModifiedSurnameChange(e) {
    setModifiedSurname(e.target.value);
  }
  function handleModifiedEmailChange(e) {
    setModifiedEmail(e.target.value);
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
    if (email !== modifiedEmail) handleEmailChange(modifiedEmail);
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
      <button className='clear-button' onClick={clearAllFields}>
        CLEAR ALL FIELDS
      </button>
      <form onSubmit={handleSubmit}>
        <div className='general-information'>
          <label htmlFor='name'>
            Name*
            <input
              required
              type='text'
              id='name'
              value={modifiedName}
              onChange={handleModifiedNameChange}
            />
          </label>
          <label htmlFor='surname'>
            Surname*
            <input
              required
              type='text'
              id='surname'
              value={modifiedSurname}
              onChange={handleModifiedSurnameChange}
            />
          </label>
          <label htmlFor='email'>
            Email*
            <input
              required
              type='email'
              id='email'
              value={modifiedEmail}
              onChange={handleModifiedEmailChange}
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
          {modifiedEducation.map((entry, index) => {
            return (
              <EditEducationEntry
                generateId={generateId}
                key={'edit-education-list-item-' + entry.id}
                educationEntry={entry}
                handleModifiedEducationChange={handleModifiedEducationChange}
                moveUp={() =>
                  move(modifiedEducation, setModifiedEducation, index, -1)
                }
                moveDown={() =>
                  move(modifiedEducation, setModifiedEducation, index, 1)
                }
                removeEntry={() =>
                  removeEntry(modifiedEducation, setModifiedEducation, index)
                }
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
          {modifiedWorkExperience.map((entry, index) => {
            return (
              <EditWorkExperienceEntry
                generateId={generateId}
                key={'edit-work-experience-list-item-' + entry.id}
                workExperienceEntry={entry}
                handleModifiedWorkExperienceChange={
                  handleModifiedWorkExperienceChange
                }
                moveUp={() =>
                  move(
                    modifiedWorkExperience,
                    setModifiedWorkExperience,
                    index,
                    -1
                  )
                }
                moveDown={() =>
                  move(
                    modifiedWorkExperience,
                    setModifiedWorkExperience,
                    index,
                    1
                  )
                }
                removeEntry={() =>
                  removeEntry(
                    modifiedWorkExperience,
                    setModifiedWorkExperience,
                    index
                  )
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
