import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUserName, setUserPassword, setUserMail, setUserToken, setUserCongratulation } from '../../redux/actions/userActions'
import { setAllWallpapers } from '../../redux/actions/fetchDataActions'
import "./login.css"
import Modal1 from "../modal/modal";
import Menu from '../menu/menu';

const LoginSchema = Yup.object().shape({
    name: Yup.string().required('שדה חובה'),
    password: Yup.string().required('שדה חובה')
})

function Login(props) {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [sucsess, setSucsess] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    function loginUser(values) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`http://localhost:3400/login/${values.name}/${values.password}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.messege) {
                    setOpenModal(true)
                    setTitleModal("התחברות")
                    if (response.messege === "You have successfully logged in") {
                        setBodyModal("ההתחברות בוצעה בהצלחה")
                        setSucsess(true);
                        props.setUserName(response.user.name);
                        props.setUserPassword(response.user.password);
                        props.setUserMail(response.user.email);
                        props.setUserCongratulation(response.user.congratulation);
                        props.setUserToken(response.token)
                    }
                    else {
                        setBodyModal("משתמש לא קיים אנא הירשם תחילה")
                        setSucsess(false);
                    }
                }
            })
            .catch(error => {
                setOpenModal(true)
                setTitleModal("התחברות")
                setBodyModal("ההתחברות נכשלה")
                console.log('error', error)
            });
    }

    const login = async (values) => {
        loginUser(values)
    }

    return (
        <div id='page' className='not-scroll'>
            <Menu />
            <div className='content'>
                <span id='title'> היי,  חזרת אלינו:)</span>
                <Formik
                    initialValues={{ name: '', password: '' }}
                    onSubmit={login}
                    validationSchema={LoginSchema}>
                    <Form>
                        <div>
                            <Field className="field icon" type="text" name="name" placeholder='שם' />
                            <ErrorMessage className="alert alert-danger" component="div" name="name" />
                        </div>
                        <div>
                            <Field className="field icon2" type="password" name="password" placeholder='סיסמא' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="password" />
                        </div>
                        <div className="text">
                            שכחת סיסמא? לא נורא, &nbsp;

                            <Link className='textDecoration' to="/forgetPassword" onClick={() => { history.push({ pathname: '/forgetPassword' }) }}>לחץ כאן</Link>
                        </div>
                        <button className='login-button' type='submit'>
                            <span className='login-text'>התחברות</span>
                        </button>
                        <div className='my-4'>
                            <Link className="text textDecoration" to="/register" onClick={() => { history.push({ pathname: '/register' }) }}>עוד לא רשום?</Link>
                        </div>
                        <div>
                            {
                                openModal && sucsess ?
                                    <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModal(false); history.push("/") }} close={() => setOpenModal(false)} />
                                    : openModal && titleModal !== "" ?
                                        <Modal1 title={titleModal} body={bodyModal} ok={() => setOpenModal(false)} close={() => setOpenModal(false)} />
                                        : null
                            }
                        </div>

                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>
            <div className='row py-4'></div>
        </div>
    )
}




export default connect(
    (state) => {
        return {
            myUser: state.userReducer.user,
            allWallpapers: state.fetchDataReducer.allWallpapers,
        }
    },
    (dispatch) => {
        return {
            setUserName: (name) => dispatch(setUserName(name)),
            setUserPassword: (pass) => dispatch(setUserPassword(pass)),
            setUserMail: (mail) => dispatch(setUserMail(mail)),
            setUserToken: (token) => dispatch(setUserToken(token)),
            setUserCongratulation: (congratulation) => dispatch(setUserCongratulation(congratulation)),
            setAllWallpapers: (wallpapers) => dispatch(setAllWallpapers(wallpapers)),
        }
    }
)(Login);