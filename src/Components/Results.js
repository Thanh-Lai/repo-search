function Search({data, filter}) {
    return (
        <div className="results-container">
            {
                Object.keys(data).map(key => {
                    const info = data[key];
                    const language = info['language'] === null || info['language'] === undefined ? 'None' : info['language'];
                    if (Object.keys(filter).length && !filter[language]) return;

                    return (
                        <div key={key} className="card">
                                <div className="card-container">
                                <h4><b>{info['full_name']}</b></h4> 
                                <p>{info['html_url']}</p> 
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Search;