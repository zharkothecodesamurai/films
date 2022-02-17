import { Fragment } from "react"

import classes from "./MoviesSummary.module.css"

const MoviesSummary = () => {
    return <Fragment>
        <section className={classes.summary}>
            <h2>
               Welcome to Movisimo
            </h2>
            <p>
                List movies and get their details
            </p>
            <p>
                With love, Camera and API
            </p>
        </section>
    </Fragment>
}

export default MoviesSummary;