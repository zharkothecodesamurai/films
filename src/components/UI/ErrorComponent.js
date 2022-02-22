import classes from "./ErrorComponent.module.css"

const ErrorComponent = props => {
    return(
<div className={classes.error}>
                <span>
                   Error:
                </span>
                <span className={classes.errorText}>
                    {props.errorMessage}
                </span>
            </div>   
    )
}

export default ErrorComponent;
