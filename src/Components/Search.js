
function Search({ handleSubmit, handleOnSelect, languages, handleFilter }) {
    const handleEnter = (e) => {
        if (e.which  === 13 || e.keyCode === 13) handleSubmit();
    }

    return (
        <div>
            <input onKeyDown={handleEnter} id="input" ></input>
            <span>
                <button onClick={handleSubmit}>Search</button>
                <select onChange={handleOnSelect} id="select-bar">
                    <option value="default" >Best Match</option>
                    <option value="stars" >Stars</option>
                </select >
                <div id="filter-dropdown" onChange={handleFilter}>
                <button className="dropbtn">Language</button>
                <div className="dropdown-content"> 
                    <div>
                        <input value="select-all" type="checkbox" id="select-all" defaultChecked></input>
                        <label htmlFor="select-all" >Select all</label>
                    </div>
                    {
                        languages.map(language => {
                            return (
                                <div key={language}>
                                    <input className="language-options" type="checkbox" id={language} value={language} defaultChecked>
                                    </input>
                                    <label htmlFor={language}>{language}</label>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            </span>
        </div>
    );
}

export default Search;