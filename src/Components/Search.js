function Search({ handleSubmit }) {
    return (
        <div>
            <input id="input" ></input>
            <button onClick={handleSubmit}>Search</button>
        </div>
    );
}

export default Search;