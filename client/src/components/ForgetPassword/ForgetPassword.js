import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import Menu from '../menu/menu';
import edit from './edit.png'
import './forgetPassword.css'
import Modal1 from "../modal/modal";


const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
})

export default function ForgetPassword(props) {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const [sucsess, setSucsess] = useState(false);
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    let codeUser = "";

    const checkMail = (values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`http://localhost:3400/checkMail/${values.email.toLowerCase()}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.messege === "mail was not found") {
                    setOpenModal1(true)
                }
                else {
                    sendMail(values);
                }

            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const sendMail = async (e) => {
        codeUser = Math.floor(Math.random() * 10000)
        setCode(codeUser);
        setEmail(e.email);
        const response = await fetch("http://localhost:3400/sendMail", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                to: e.email, sub: "קוד אימות"
                , txt: " היי " + "קוד האימות שלך הוא:" + codeUser + " אם לא ביקשת לעדכן סיסמא אנא התעלם מהודעה זו "
            })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            setOpenModal(true)
            setSucsess(true)
        } else if (resData.status === 'fail') {
            setOpenModal(true);
            setSucsess(false);
        }
    };

    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            <div className='content'>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={checkMail}
                    validationSchema={ForgetPasswordSchema}>
                    <Form>
                        <span id='title'>שכחתי סיסמא &nbsp;
                        <img src={edit} alt="" /></span>
                        <div>
                            <Field className="field icons2" type="email" name="email" placeholder='מייל' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="email" />
                        </div>
                        <button type='submit' className='reset sendMail my-5'>
                            <span className='reset-text'>שליחת קוד אימות</span>
                        </button>
                        <div>
                            {
                                openModal && sucsess ?
                                    <Modal1 title="שליחת קוד אימות" body="קוד אימות נשלח למייל" ok={() => history.push({ pathname: '/forgetPasswordVerify', email: email, code: code })} close={() => { setOpenModal(false) }} />
                                    : openModal ?
                                        <Modal1 title="שליחת קוד אימות" body="שליחת הקוד נכשלה, נסה שוב" ok={() => { setOpenModal(false) }} close={() => { setOpenModal(false) }} />
                                        : null
                            }
                        </div>
                        <div>
                            {openModal1 ?
                                <Modal1 title="מייל לא תקין" body="מייל זה אינו קיים במאגר המשתמשים" ok={() => { setOpenModal1(false) }} close={() => { setOpenModal1(false) }} />
                                : null}
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>
            <div className='row py-5'></div>

        </div>
    )
}


