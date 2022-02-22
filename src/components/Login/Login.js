import useInput from '../../hooks/use-input';
import { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Configuration from '../../config';
import AppContext from '../../store/app-context';
import ErrorComponent from '../UI/ErrorComponent';
import Modal from '../UI/Modal';
import Succes from '../UI/Succes';

import "./Login.css"


const Login = () => {
    const [isSubmited, setIsSubmited] = useState(false)
    const [userData, setUserData] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoaading] = useState(false);
    const [errorHttp, setErrorHttp] = useState();

    const AppCtx = useContext(AppContext);
    const navigate = useNavigate();
    const statusParams = useParams();

    if(statusParams.status === 'true' && AppCtx.isLogged){
        statusParams.status = 'false';
        AppCtx.signingOut();
    }
   

    const isNotEmpty = (value) => value.trim() !== '';


    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput(isNotEmpty);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);


    let formIsValid = false;

    if (firstNameIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const submitHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }


        setUserData({
            firstName: firstNameValue,
            password: passwordValue,

        })

        setIsSubmited(true);

        resetFirstName();
        resetPassword();
    };

    const errorHandler = () => {
        setErrorHttp();
    }


    useEffect(() => {

        const call = async () => {
            if (!isSubmited) {
                return;
            }
            setIsLoaading(true);
            const key = Configuration.apiKey;
            const apiKey = key.replace(/[']+/g, '');
            let url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Loging in went wrong")
            }
            const data = await response.json();

            if (data.success) {
                AppCtx.authenticate(data.request_token);
            }

            setIsLoaading(false);
        }
        call().catch(error => {
            setIsLoaading(false);
            setIsSubmited(false);
            setErrorHttp(error.message);
        })
    }, [isSubmited])




    useEffect(() => {
        const call = async () => {
            if (AppCtx.initialtoken === '') {
                return;
            }
            setIsLoaading(true);
            const key = Configuration.apiKey;
            const apiKey = key.replace(/[']+/g, '');

            let url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`
            const Options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userData.firstName,
                    password: userData.password,
                    request_token: AppCtx.initialtoken
                })
            }
            const response = await fetch(url, Options);

            if (!response.ok) {
                throw new Error("Loging in went wrong")
            }

            const data = await response.json();

            if (data.success) {
                AppCtx.logingIn(data.request_token);
            }
            setIsLoaading(false);
        }
        call().catch(error => {
            setIsLoaading(false);
            AppCtx.signingOut();
            setErrorHttp(error.message);
        })
    }, [AppCtx.initialtoken])

    useEffect(() => {
        const call = async () => {
            if (AppCtx.token === '') {
                return;
            }
            setIsLoaading(true);
            const key = Configuration.apiKey;
            const apiKey = key.replace(/[']+/g, '');

            let url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`
            const Options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    request_token: AppCtx.token
                })
            }
            const response = await fetch(url, Options);

            if (!response.ok) {
                throw new Error("Loging in went wrong")
            }

            const data = await response.json();

            if (data.success) {
                AppCtx.signningIn(data.session_id);
            }


            setIsLoaading(false);
            setIsLogged(true);
        }
        call().catch(error => {
            setIsLoaading(false);
            AppCtx.signingOut();
            setErrorHttp(error.message);
        })
    }, [AppCtx.token])

    const succesHandler = () => {
        setIsLogged(false);
        navigate("/");
    }

    const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
    const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';

    return (
        <Fragment>
            {isLogged && <Modal onHide={succesHandler}>
                <Succes succesMessaage={"Signing in completed"}></Succes>
            </Modal> }
            {errorHttp && <Modal onHide={errorHandler}>
                <ErrorComponent errorMessage={errorHttp}></ErrorComponent>
            </Modal>}
            <div className='formContainer'>
                <form onSubmit={submitHandler}>
                    <div className='control-group'>
                        <div className={firstNameClasses}>
                            <label htmlFor='name'>First Name</label>
                            <input
                                type='text'
                                id='nameFirst'
                                value={firstNameValue}
                                onChange={firstNameChangeHandler}
                                onBlur={firstNameBlurHandler}
                            />
                            {firstNameHasError && <p className="error-text">Please enter a first name.</p>}
                        </div>
                        <div className={passwordClasses}>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                            />
                            {passwordHasError && <p className="error-text">Please enter a password.</p>}
                        </div>
                    </div>
                    <div className='form-actions'>
                        <button disabled={!formIsValid}>Submit</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};


export default Login;