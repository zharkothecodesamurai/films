import { Fragment } from "react";

import { Link } from 'react-router-dom';
import movienight from "../../assets/movienight.jpg"
import classes from "./Header.module.css"


const Header = props => {
    return <Fragment>
        <header className={classes.header}>
        <Link to={'/'} style={{ textDecoration: 'none', color:"white" }}><h1>Movisimo</h1></Link>
            <Fragment><Link to={'/login'}>
                <span className={classes.link}>Log In</span>
            </Link>  </Fragment>

        </header>
        <div className={classes['main-image']}>
            <img src={movienight} alt="a wall with text" />
        </div>
    </Fragment>;
}

export default Header;