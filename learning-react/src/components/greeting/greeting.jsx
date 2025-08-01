import "./greeting.css";
import { useState } from 'react';

export function Greeting({ name }) {

  //uses concept of array destructuring to create a state variable and a function to update it
  const [firstName, setFirstName] = useState(name);
  const [surname, setSurname] = useState('');

  const onSubmitSimpleText = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.userInput.value;
    document.getElementById("textarea").value = userInput;
    
    // Clear the input field
    e.target.elements.userInput.value = '';
  };


  const onSubmitName = (e) => {
    e.preventDefault();
    const userFirstName = e.target.elements.firstName.value;
    const userSurname = e.target.elements.surname.value;
    
    // Update both states
    setFirstName(userFirstName);
    setSurname(userSurname);
    
    // Clear the input fields
    e.target.elements.firstName.value = '';
    e.target.elements.surname.value = '';
  };


  return (
    <>
      <div className="greeting">
        <h2>Hello, {name}!</h2>
        <p>Welcome to our simple React application.</p>
        <div>
          <form onSubmit={(e) => onSubmitSimpleText(e, name)}>
            <input
              type="text"
              placeholder="Type something..."
              name="userInput"
              required
            />
            <button type="submit">Click Me to display your thoughts</button>
          </form>
          {/* <h1>You have entered {userInput}</h1> */}
          <textarea 
          id="textarea" 
          placeholder="Submitted text will appear here..."
          style={{ width: '100%', height: '60px', marginTop: '10px' }}
        ></textarea>
        </div>
      </div>

       <form onSubmit={onSubmitName}>
        <input
          type="text"
          placeholder="Enter first name..."
          name="firstName"
          required
        />
        <input
          type="text"
          placeholder="Enter surname..."
          name="surname"
          required
          style={{ marginLeft: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Update Name</button>
      </form>

     <h3>Current name: {firstName} {surname}</h3>
      <p>First name length: {firstName.length}</p>
      <p>Surname length: {surname.length}</p>
      <p>Full name length: {(firstName + ' ' + surname).length}</p>
    

    </>
  );
}
