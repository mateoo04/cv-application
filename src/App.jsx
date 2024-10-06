import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EditForm from './components/EditForm.jsx';
import CV from './components/CV.jsx';

function App() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('Mateo');
  const [surname, setSurname] = useState('Aces');
  const [email, setEmail] = useState('mateoaces@gmail.com');
  const [phoneNum, setPhoneNum] = useState('0995454929');
  const [education, setEducation] = useState([
    {
      schoolName: 'Dowing High School',
      titleOfStudy: 'Mathematical High School',
      startDate: '2014-09-01',
      endDate: '2017-06-30',
      id: 0,
    },
    {
      schoolName: 'Technical University of Zagreb',
      titleOfStudy: "Computer Science Bacherlor's",
      startDate: '2017-10-01',
      endDate: '2021-07-15',
      id: 1,
    },
  ]);

  const [workExperience, setWorkExperience] = useState([
    {
      companyName: 'Metadream',
      position: 'Front-end developer',
      mainResponsibilities: [
        'Optimize code and assets to ensure fast load times and smooth performance',
        'Utilize front-end frameworks like React to create scalable and reusable UI components',
        'Write clean, efficient code to implement new features and functionalities based on project requirements',
      ],
      startDate: '2021-08-01',
      endDate: '2023-01-31',
      id: 0,
    },
    {
      companyName: 'Concurrent',
      position: 'Android Developer',
      mainResponsibilities: [
        'Translate designs and wireframes into high quality code',
        'Identify and correct bottlenecks and fix bugs',
        'Ensure the best possible performance, quality, and responsiveness of the application',
      ],
      startDate: '2023-02-01',
      id: 1,
    },
  ]);

  if (isEditing) {
    return (
      <>
        <EditForm
          name={name}
          surname={surname}
          email={email}
          phoneNum={phoneNum}
          education={education}
          handleNameChange={setName}
          handleSurnameChange={setSurname}
          handleEmailChange={setEmail}
          handlePhoneNumChange={setPhoneNum}
          handleEducationChange={setEducation}
          onSubmit={() => setIsEditing(!isEditing)}
        />
      </>
    );
  }
  return (
    <>
      <button onClick={() => setIsEditing(!isEditing)}>EDIT</button>
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
