import classes from "./Succes.module.css"

const Succes = props => {
    return(
<div className={classes.succes}>
                <span>
                   Message:
                </span>
                <span className={classes.succesText}>
                    {props.succesMessaage}
                </span>
            </div>   
    )
}

export default Succes;
