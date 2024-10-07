import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EditForm from './components/EditForm.jsx';
import CV from './components/CV.jsx';

function App() {
  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 7)}}`;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [sortEducation, setSortEducation] = useState(false);
  const [sortWorkExperience, setSortWorkExperience] = useState(false);
  const [name, setName] = useState('Mateo');
  const [surname, setSurname] = useState('Aces');
  const [email, setEmail] = useState('mateoaces@gmail.com');
  const [phoneNum, setPhoneNum] = useState('0995454929');
  const [education, setEducation] = useState([
    {
      schoolName: 'Technical University of Zagreb',
      titleOfStudy: "Computer Science Master's",
      startDate: new Date(2020, 9, 1),
      endDate: new Date(2022, 6, 15),
      id: generateId(),
    },
    {
      schoolName: 'Technical University of Zagreb',
      titleOfStudy: "Computer Science Bacherlor's",
      startDate: new Date(2017, 9, 1),
      endDate: new Date(2020, 6, 15),
      id: generateId(),
    },
    {
      schoolName: 'Dowing High School',
      titleOfStudy: 'Mathematical High School',
      startDate: new Date(2014, 8, 1),
      endDate: new Date(2017, 5, 30),
      id: generateId(),
    },
  ]);

  const [workExperience, setWorkExperience] = useState([
    {
      companyName: 'Concurrent',
      position: 'Team Lead',
      mainResponsibilities: [{ value: '', id: generateId() }],
      startDate: new Date(2024, 7, 8),
      endDate: 'now',
      id: generateId(),
    },
    {
      companyName: 'Concurrent',
      position: 'Android Developer',
      mainResponsibilities: [
        {
          value: 'Translate designs and wireframes into high quality code',
          id: generateId(),
        },
        {
          value: 'Identify and correct bottlenecks and fix bugs',
          id: generateId(),
        },
        {
          value:
            'Ensure the best possible performance, quality, and responsiveness of the application',
          id: generateId(),
        },
      ],
      startDate: new Date(2023, 1, 2),
      endDate: 'now',
      id: generateId(),
    },
    {
      companyName: 'Metadream',
      position: 'Front-end developer',
      mainResponsibilities: [
        {
          value:
            'Optimize code and assets to ensure fast load times and smooth performance',
          id: generateId(),
        },
        {
          value:
            'Utilize front-end frameworks like React to create scalable and reusable UI components',
          id: generateId(),
        },
        {
          value:
            'Write clean, efficient code to implement new features and functionalities based on project requirements',
          id: generateId(),
        },
      ],
      startDate: new Date(2021, 7, 1),
      endDate: new Date(2023, 0, 31),
      id: generateId(),
    },
  ]);

  if (isEditing) {
    return (
      <>
        <EditForm
          generateId={generateId}
          sortEducation={sortEducation}
          handleSortEducationChange={() => setSortEducation(!sortEducation)}
          sortWorkExperience={sortWorkExperience}
          handleSortWorkExperienceChange={() =>
            setSortWorkExperience(!sortWorkExperience)
          }
          name={name}
          surname={surname}
          email={email}
          phoneNum={phoneNum}
          education={education}
          workExperience={workExperience}
          handleNameChange={setName}
          handleSurnameChange={setSurname}
          handleEmailChange={setEmail}
          handlePhoneNumChange={setPhoneNum}
          handleEducationChange={setEducation}
          handleWorkExperienceChange={setWorkExperience}
          onDone={() => setIsEditing(!isEditing)}
        />
      </>
    );
  }
  return (
    <>
      <button className='edit-button' onClick={() => setIsEditing(!isEditing)}>
        EDIT
      </button>
      <CV
        fullName={name + ' ' + surname}
        email={email}
        phoneNum={phoneNum}
        education={education}
        workExperience={workExperience}
      />
    </>
  );
}

export default App;
