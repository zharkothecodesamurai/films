
const MovieListViewTable = (props) => {

    let movieListView = (
        <div style={{marginLeft:'auto', paddingLeft:'25px'}}>
            <table className="Table">
                <caption><h3>Most Popular Movies</h3></caption>
                <thead>
                    <tr>
                        <th scope="col" className="th">#</th>
                        <th scope="col"  className="th">Title</th>
                        <th scope="col"  className="th">Image</th>
                        <th scope="col"  className="th">Poster</th>
                        <th scope="col"  className="th">Date Release</th>
                        <th scope="col"  className="th">Popularity</th>
                    </tr>
                </thead>
                <tbody >
                    {props.children}
                </tbody>
            </table>
        </div >
    )
    return (
        movieListView
    )

}

export default MovieListViewTable;