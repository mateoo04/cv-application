import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EditForm from './components/EditForm.jsx';

function App() {
  const [name, setName] = useState('Mateo');
  const [surname, setSurname] = useState('Aces');
  const [email, setEmail] = useState('mateoaces@gmail.com');
  const [phoneNum, setPhoneNum] = useState('0995454929');

  function handleNameChange(value) {
    setName(value);
  }

  return (
    <>
      <EditForm
        name={name}
        surname={surname}
        email={email}
        phoneNum={phoneNum}
        handleNameChange={setName}
      />
    </>
  );
}

export default App;
