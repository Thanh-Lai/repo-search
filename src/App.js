import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import './App.css';
import Search from './Components/Search';
import Results from './Components/Results';
import Details from './Components/Details';

function App() {
  const [ results, setData ] = useState({});
  const [ languages, setLanguages ] = useState({});
  const [ filter, setFilter] = useState({});
  const [ active, setActive ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ popupInfo, setInfo ] = useState({});
  const [ modalShow, setShowState ] = useState(false);

  // Fetch Data asynchronously and set results to state
  const fetchData = (sortBy = 'default') => {
      const input = document.getElementById('input').value;
      const sort = '&sort=' + sortBy;
      const github = 'https://api.github.com/search/repositories?q=';
      setLoading(true);
      fetch(github+input+sort, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            const results = data.items;
            const languages = {};
            for (let key in results) {
              let language = results[key]['language'];
              if (language === null || language === undefined) language = 'None';
              languages[language] = language;
            }
            setData(results);
            setLanguages(languages);
            setActive(true);
            setFilter(languages);
            setLoading(false);
            const options = document.getElementsByClassName('language-options');
            document.getElementById('select-all').checked = true;
            for (let item of options) {
              item.checked = true;
            }
        })
        .catch(err => {
            console.error(err);
        })
      
  }

  const handleOnSelect = (e) => {
      const value = e.target.value;
      if (active) fetchData(value);
  }

  const handleFilter = (e) => {
    const selected = e.target;
    const options = document.getElementsByClassName('language-options');
    const filter = {};
    // if select all is checked, set all items as checked and vice versa
    if (selected.value === 'select-all') {
        for (let item of options) {
          if (selected.checked) filter[item.value] = true;
          item.checked = selected.checked;
        }
        setFilter(filter);
        return;
    } 
    // if select all is not selected, check each item individually
    document.getElementById('select-all').checked = false;
    for (let item of options) {
        if (item.checked) filter[item.value] = true;
    }
    setFilter(filter);
  }

  // If card is clicked, set show pop up to true and set info to send to pop up
  const handlePopup = (info) => {
      setInfo(info);
      setModalShow(true);
  }

  const setModalShow = (state) => {
      setShowState(state);
  }

  const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 50px;
  `;

  return (
    <div className="App">
      <h1>Repo Search</h1>
      <Search
          handleOnSelect={handleOnSelect}
          handleSubmit={fetchData}
          handleFilter={handleFilter}
          languages={Object.keys(languages)}
      />
      {
        loading
        ?
          <ClipLoader css={override} loading={loading} size={150} />
        :
          <Results handlePopup={handlePopup} filter={filter} data={results}/>
      }
      <Details 
          info={popupInfo}
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
