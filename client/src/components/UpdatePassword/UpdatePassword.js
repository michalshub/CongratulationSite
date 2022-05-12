import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import Modal1 from "../modal/modal";
import Menu from '../menu/menu';
import edit from './edit.png'


const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string().required('שדה חובה').min(6, 'סיסמא חייבת להיות עם 6 תווים לפחות'),
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
})

export default function UpdatePassword(props) {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const [sucsess, setSucsess] = useState(false);

    useEffect(() => {
        if (props.location.email === undefined) {
            history.push("./forgetPassword")
        }
    }, [])

    const updatePassword = (e) => {
        if (e.password !== '') {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                password: e.password
            });
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/updateUser/${e.email}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setSucsess(true);
                    setOpenModal(true)
                })
                .catch(error => {
                    console.log('error', error)
                    setSucsess(false);
                    setOpenModal(true)
                });

        }

    }

    const checkPassword = (values) => {
        if (values.password !== '') {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };

            fetch(`http://localhost:3400/checkPassword/${values.password}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.messege === "password was not found") {
                        setOpenModal1(true)
                    }
                    else {
                        updatePassword(values);
                    }
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
    }
    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            <div className='content'>
                <Formik
                    initialValues={{ email: props.location.email, password: '' }}
                    onSubmit={checkPassword}
                    validationSchema={UpdatePasswordSchema}>
                    <Form>
                        <span id='title'>עדכון סיסמא &nbsp;
                        <img src={edit} alt=""/></span>

                        <div>
                            <Field className="field icons2" type="email" name="email" placeholder='מייל' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="email" />
                        </div>
                        <div>
                            <Field className="field icons3" type="text" name="password" placeholder='סיסמא' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="password" />
                        </div>
                        <button type='submit' className='login-button my-5'>
                            <span className='login-text'>עדכון</span>
                        </button>

                        <div>
                            {
                                openModal && sucsess ?
                                    <Modal1 title="עדכון סיסמא" body="הסיסמא התעדכנה בהצלחה!" ok={() => history.push("./login")} close={() => { setOpenModal(false) }} />
                                    : openModal ?
                                        <Modal1 title="עדכון סיסמא" body="העדכון נכשל נסה שוב" ok={() => { setOpenModal(false) }} close={() => { setOpenModal(false) }} />
                                        : null
                            }
                        </div>
                        <div>
                            {openModal1 ?
                                <Modal1 title="עדכון סיסמא" body="סיסמא קיימת במאגר, נסה סיסמא שונה" ok={() => { setOpenModal1(false) }} close={() => { setOpenModal1(false) }} />
                                : null}
                        </div>
                    </Form>
                </Formik>

            </div>
            <div className='row py-5'></div>
            <div className='row py-4'></div>

        </div>
    )
}



