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

  if (isEditing) {
    return (
      <>
        <EditForm
          name={name}
          surname={surname}
          email={email}
          phoneNum={phoneNum}
          handleNameChange={setName}
          handleSurnameChange={setSurname}
          handleEmailChange={setEmail}
          handlePhoneNumChange={setPhoneNum}
          onSubmit={() => setIsEditing(!isEditing)}
        />
      </>
    );
  }
  return (
    <>
      <button onClick={() => setIsEditing(!isEditing)}>EDIT</button>
      <CV fullName={name + ' ' + surname} email={email} phoneNum={phoneNum} />
    </>
  );
}

export default App;
