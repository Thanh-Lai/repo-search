import React, { useState } from 'react';
import './App.css';
import Search from './Components/Search';
import Results from './Components/Results';
import Details from './Components/Details';

function App() {
  const [ results, setData ] = useState({});
  const [ languages, setLanguages ] = useState({});
  const [ filter, setFilter] = useState({});
  const [ active, setActive ] = useState(false);

  const fetchData = (sortBy = 'default') => {
      const input = document.getElementById('input').value;
      const sort = '&sort=' + sortBy;
      const github = 'https://api.github.com/search/repositories?q=';
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
              let language = results[key].language;
              if (language === null || language === undefined) language = 'None';
              languages[language] = language;
            }
            setData(results);
            setLanguages(languages);
            setActive(true);
            setFilter({});
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
    if (selected.value === 'select-all') {
        let isChecked = null;
        for (let item of options) {
          selected.checked ? isChecked = true : isChecked = false;
          item.checked = isChecked;
        }
    } else {
      document.getElementById('select-all').checked = false;
    }
    const filter = {};
    for (let item of options) {
        if (item.checked) filter[item.value] = true;
    }
    setFilter(filter);
  }

  const [popupInfo, setInfo] = useState({});
  const [modalShow, setShowState] = useState(false);
  const handlePopup = (info) => {
      setInfo(info);
      setModalShow(true);
  }

  const setModalShow = (state) => {
      setShowState(state);
  }

  return (
    <div className="App">
      <h1>Repo Search</h1>
      <Search
          handleOnSelect={handleOnSelect}
          handleSubmit={fetchData}
          handleFilter={handleFilter}
          languages={Object.keys(languages)}
      />
      <Results handlePopup={handlePopup} filter={filter} data={results}/>
      <Details 
                info={popupInfo}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
    </div>
  );
}

export default App;
