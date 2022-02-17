import { Fragment } from "react";


import movienight from "../../assets/movienight.jpg"
import classes from "./Header.module.css"


const Header = props =>{
return <Fragment>
        <header className={classes.header}>
            <h1>Movisimo</h1>           
        </header>
        <div className={classes['main-image']}>
            <img src={movienight} alt="a wall with text"/>
        </div>
    </Fragment>;
}

export default Header;