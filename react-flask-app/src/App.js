import React, { useState } from 'react';
import './App.css';



function App() {
  // const [formData, setFormData] = useReducer(formReducer, {});

  const [name, setName] = useState(''); // updates every time == infinite renderization 

  const handleSubmit = event => {
    event.preventDefault();
    
    const data = new FormData(event.target);

    // NOTE: you access FormData fields with `data.get(fieldName)`
    const movie = data.get('name');

    console.log(movie);
    // alert('You have submitted the form.')
    
    // make request to /test route on flask server
    fetch('/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // needed in order to NOT get None as a response
      },
      body: JSON.stringify({movie: movie})})  // input data
    .then(response => response.json()).then(data => {  // gets response from flask server
      console.log(data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="preview">
          <h2>Preview:</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name: 
            <input type="text" name="name"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
