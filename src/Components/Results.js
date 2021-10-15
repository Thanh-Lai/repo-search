function Results({data, filter, handlePopup}) {  
    return (
        <div className="results-container">
            {
                Object.keys(data).map(key => {
                    const info = data.key;
                    const language = info.language === null || info.language === undefined ? 'None' : info.language;
                    if (Object.keys(filter).length && !filter.language) return;

                    return (
                        <div onClick={() => handlePopup(info)} key={key} className="card card-container">
                            <div className="card-container">
                                <img src={info.owner.avatar_url} width="100" height="100"></img>
                                <h4><b>{info.full_name}</b></h4> 
                                <p>{info.html_url}</p> 
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Results