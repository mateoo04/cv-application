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
      startDate: '2019-09-01',
      endDate: '2023-06-30',
      id: 0,
    },
    {
      schoolName: 'Technical University of Zagreb',
      titleOfStudy: "Computer Science Bacherlor's",
      startDate: '2023-10-01',
      endDate: '2026-07-15',
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
      />
    </>
  );
}

export default App;
