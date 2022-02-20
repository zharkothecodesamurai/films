import useInput from '../../hooks/use-input';
import {useState,useEffect,useContext} from 'react'
import Configuration from '../../config';
import AppContext from '../../store/app-context';
import "./Login.css"


const Login = () => {

    const [isSubmited,setIsSubmited] = useState(false)
    const [userData,setUserData] = useState({});
    const [token,setToken] = useState('');
    const [isLoading, setIsLoaading] = useState(false);
    const [errorHttp, setErrorHttp] = useState();

    const AppCtx = useContext(AppContext);

    const isNotEmpty = (value) => value.trim() !== '';
    const isEmail = (value) => value.includes('@');

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
    } = useInput(isNotEmpty);

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName,
    } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        console.log('Submitted!');
        console.log(firstNameValue, lastNameValue, emailValue);

        setUserData({
            firstName:firstNameValue,
            lastName:lastNameValue,
            email:emailValue
        })

        setIsSubmited(true);

        resetFirstName();
        resetLastName();
        resetEmail();
    };

    useEffect(() => {

        const call = async () => {
            if(!isSubmited){
                return;
            }
            setIsLoaading(true);
            const key=Configuration.apiKey;
            const apiKey= key.replace(/[']+/g, '');
            let url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Fetching went wrong")
            }
            console.log(response);
            const data = await response.json();
            console.log(data);
            if(data.success){
                AppCtx.logingIn(data.request_token);
                window.open(`https://api.themoviedb.org/3/authentication/${data.request_token}`,'_blank')
            }
           
            setIsLoaading(false);
        }
            call().catch(error => {
                setIsLoaading(false);
                setErrorHttp(error.message);
            })  
    }, [isSubmited])

    useEffect(()=>{
        if(AppCtx.token === '' || !isSubmited){
            return;
        }
        window.open(`https://api.themoviedb.org/3/authentication/${AppCtx.token}?redirect_to=http://localhost:3000`,'_self')
    },[AppCtx.token])
    // useEffect(() => {
    //     const call = async () => {
    //         if(AppCtx.token === ''){
    //             return;
    //         }
    //         setIsLoaading(true);
    //         const key=Configuration.apiKey;
    //         const apiKey= key.replace(/[']+/g, '');

    //         let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin','http://localhost:3000');
    //         let url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`
    //         // `https://www.themoviedb.org/authenticate${AppCtx.token}`
    //         const response = await fetch(url,{
    //             mode: 'cors',
    //             credentials: 'include',
    //             method: 'POST',
    //             headers: headers,
    //             body:JSON.stringify(AppCtx.token)
    //         });

    //         if (!response.ok) {
    //             throw new Error("Fetching went wrong")
    //         }
    //         console.log(response);
    //         const data = await response.json();
    //         console.log(data);
    //         // if(data.success){
    //         //     AppCtx.login(data.request_token)
    //         // }
        
    //         setIsLoaading(false);
    //     }
    //         call().catch(error => {
    //             setIsLoaading(false);
    //             setErrorHttp(error.message);
    //         })  
    // }, [AppCtx.token])

    const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
    const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
    const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

    return (
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
                    <div className={lastNameClasses}>
                        <label htmlFor='name'>Last Name</label>
                        <input
                            type='text'
                            id='name'
                            value={lastNameValue}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                        />
                        {lastNameHasError && <p className="error-text">Please enter a last name.</p>}
                    </div>
                </div>
                <div className={emailClasses}>
                    <label htmlFor='name'>E-Mail Address</label>
                    <input
                        type='text'
                        id='nameLast'
                        value={emailValue}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
                </div>
                <div className='form-actions'>
                    <button disabled={!formIsValid}>Submit</button>
                </div>
            </form>
        </div>

    );
};


export default Login;