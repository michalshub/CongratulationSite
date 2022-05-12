import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { setUserName, setUserPassword, setUserMail, setUserToken } from '../../redux/actions/userActions'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import Modal1 from "../modal/modal";
import Menu from '../menu/menu';
import './register.css';


let register = false;


const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('שדה חובה').min(6,'שם משתמש חייב להיות עם 6 תווים לפחות'),
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
    password: Yup.string().required('שדה חובה').min(6,'סיסמא חייבת להיות עם 6 תווים לפחות')
})

function Register(props) {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false)
    const [sucsess, setSucsess] = useState(false);
    const [allusers, setAllusers] = useState({});
    const [isExistUser, setIsExistUser] = useState(false);
    let valIsExistUser = false;
    let checkUSer = false;
    useEffect(() => {
        setIsExistUser(false);
        valIsExistUser = false;
        getAllUsers()

    }, [])

    function getAllUsers() {
        checkUSer = false;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/getAllusers`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setAllusers(response.users);
                console.log(response);
            })
            .catch(error => console.log('error', error));
    }

    const register = (values) => {
        getAllUsers();
        for (let i = 0; i < allusers.length - 1; i++) {
            if (i === 0)
                checkUSer = true;

            if ((allusers[i].email.toLowerCase() === values.email.toLowerCase()) || (allusers[i].password === values.password)) {
                setIsExistUser(true);
                valIsExistUser = true;
                break;
            }

        }

        console.log(`${values.name} ${values.email} ${values.password}`);
        console.log("valIsExistUser " + valIsExistUser + " " + checkUSer);
        if (!valIsExistUser && checkUSer) {
            newUser(values);
        }
        else alert("אחד או יותר מהנתונים שהוזנו כבר קיים במאגר ");

    }

    function newUser(values) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log(`values ${values.name} ${values.email.toLowerCase()} ${values.password}`);
        var raw = JSON.stringify({ "name": values.name, "email": values.email.toLowerCase(), "password": values.password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3400/createUser", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                props.changeNameFormLogin(result.user.name);
                props.changePasswordFormLogin(result.user.password);
                props.changeEmailFormLogin(result.user.email);
                props.changeTokenFormLogin(result.token)
                sendMail(values);
            })
            .catch(error => {
                setOpenModal(true);
                setSucsess(false);
                console.log('error', error)
            });
        console.log("hello");
    }
    const sendMail = async (e) => {
        const response = await fetch("http://localhost:3400/sendMail", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                to: e.email, sub: "הרשמה לאתר הברכות החרדי הגדול בעולםםםם"
                , txt: " היי " + e.name + " הרשמתך נקלטה בהצלחה סיסמתך היא: " + e.password
            })
        });
        const resData = await response.json();
        console.log("lll " + resData.status);
        if (resData.status === 'success') {
            setOpenModal(true);
            setSucsess(true);
        } else if (resData.status === 'fail') {
            setOpenModal(true);
            setSucsess(false);
        }
    };

    return (
        <div id='page' className='not-scroll'>
            <Menu />
            <div className='content'>
                <span id='title'> היי,  נעים להכיר:)</span>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={register}
                    validationSchema={RegisterSchema}>
                    <Form>
                        <div>
                            <Field className="field icons1" type="text" name="name" placeholder='שם' />
                            <ErrorMessage className="alert alert-danger" component="div" name="name" />
                        </div>

                        <div>
                            <Field className="field icons2" type="email" name="email" placeholder='מייל' />
                            <ErrorMessage className="alert alert-danger" component="div" name="email" />
                        </div>

                        <div>
                            <Field className="field icons3" type="password" name="password" placeholder='סיסמא' />
                            <ErrorMessage className="alert alert-danger" component="div" name="password" />
                        </div>

                        <button className='login-button' type='submit'>
                            <span className='login-text'>הרשם</span>
                        </button>
                        <div>
                            {
                                openModal && sucsess ?
                                    <Modal1 title="הרשמה" body=" משתמש/ת יקר/ה, הרשמתך נקלטה במערכת, ברגעים אלו נשלח מייל לתיבת הדוא&quot;ל שלכם נא שמרו מייל זה." ok={() => history.push("./home")} close={() => setOpenModal(false)} />
                                    : openModal ?
                                        <Modal1 title="הרשמה" body="ההרשמה נכשלה" ok={() => setOpenModal(false)} close={() => setOpenModal(false)} />
                                        : null
                            }
                        </div>
                        <div className="text my-3">משתמש רשום, &nbsp;<Link to="/login" className='textDecoration'>התחבר</Link></div>



                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>
            <div className='row py-3'></div>

        </div>
    )
}

export default connect(
    undefined,
    (dispatch) => {
        return {
            changeNameFormLogin: function (newName) {
                dispatch(setUserName(newName))
            },
            changePasswordFormLogin: function (newPassword) {
                dispatch(setUserPassword(newPassword))
            },
            changeEmailFormLogin: function (newEmail) {
                dispatch(setUserMail(newEmail))
            },
            changeTokenFormLogin: function (newToken) {
                dispatch(setUserToken(newToken))
            }
        }
    }
)(Register);


