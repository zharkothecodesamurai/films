import { Fragment } from "react";

const MovieListViewTable = (props) => {

    let movieListView = (
        <Fragment>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h3>Most Popular Movies</h3>
                </div>
            <div className=" table-responsive">
                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col" className="th">#</th>
                            <th scope="col" className="th">Title</th>
                            <th scope="col" className="th">Image</th>
                            <th scope="col" className="th">Poster</th>
                            <th scope="col" className="th">Date Release</th>
                            <th scope="col" className="th">Popularity</th>
                        </tr>
                    </thead>
                    <tbody >
                        {props.children}
                    </tbody>
                </table>
            </div >
        </Fragment>

    )
    return (
        movieListView
    )

}

export default MovieListViewTable;