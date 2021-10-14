import React, { useState } from 'react';
import './App.css';
import Search from './Components/Search';
import Results from './Components/Results';

function App() {
  const [ results, setData ] = useState({});

  const fetchData = () => {
      const input = document.getElementById('input').value;
      const github = 'https://api.github.com/search/repositories?q=';
      fetch(github+input, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
          setData(data.items);
        })
        .catch(err => {
            console.error(err);
        })
  }

  return (
    <div className="App">
      <h1>Repo Search</h1>
      <Search handleSubmit={fetchData}/>
      <Results data={results}/>
    </div>
  );
}

export default App;
