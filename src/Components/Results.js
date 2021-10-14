function Search({data}) {
    return (
        <div className="results-container">
            {
                Object.keys(data).map(key => {
                    const info = data[key];
                        return (
                            <div key={key} className="card">
                                {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"></img> */}
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