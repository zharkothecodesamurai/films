import { Fragment,useContext } from "react";

import { Link } from 'react-router-dom';
import movienight from "../../assets/movienight.jpg"
import AppContext from "../../store/app-context";
import classes from "./Header.module.css"


const Header = props => {
    const AppCtx= useContext(AppContext);
    return <Fragment>
        <header className={classes.header}>
            <Link to={'/'} style={{ textDecoration: 'none', color: "white" }}><h1>Movisimo</h1></Link>
            <Link to={{pathname:`/login/${ AppCtx.isLogged ? 'true' : 'false'}`}} style={{ textDecoration: 'none', color: "white" }}>
                <span className={classes.link}>{!AppCtx.isLogged ? 'Log In' : 'Sign out'}</span>
            </Link>
        </header>
        <div className={classes['main-image']}>
            <img src={movienight} alt="a wall with text" />
        </div>
    </Fragment>;
}

export default Header;