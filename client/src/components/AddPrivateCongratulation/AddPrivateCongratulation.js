import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import Modal1 from "../modal/modal";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'
import add from './add.png'


const PrivateCongratulationSchema = Yup.object().shape({
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
    title: Yup.string().required('שדה חובה'),
    content: Yup.string().required('שדה חובה')
})

export default function AddPrivateCongratulation() {

    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    const sendMailToUser = async (email) => {
        const response = await fetch("http://localhost:3400/sendMail", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ to: email, sub: "ברכה אישית", txt: "היי, הברכה האישית שהזמנת נוספה למאגר הברכות שבאזור האישי שלך, \n תוכל להתחבר עם שם וסיסמא באתר ולצפות בברכה. \n בברכה, צוות אתר הברכות." })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            if (!openModal)
                setOpenModal(true)
            setTitleModal("שליחת מייל")
            setBodyModal("מייל עדכון נשלח למשתמש")
        } else if (resData.status === 'fail') {
            if (!openModal)
                setOpenModal(true)
            setTitleModal("שליחת מייל")
            setBodyModal("שליחת המייל נכשלה")
        }
    };

    function addCongratulation(e) {
        if (e.email && e.email !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "title": e.title, "content": e.content });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/createPersonalCongratulation/${e.email}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setOpenModal(true)
                    setTitleModal("הוספת ברכה אישית")
                    setBodyModal("ברכה אישית נוספה בהצלחה")
                    sendMailToUser(e.email);

                })
                .catch(error => {
                    setTitleModal("הוספת ברכה אישית")
                    setBodyModal("ההוספה נכשלה")
                    setOpenModal(true)
                    console.log('error', error)
                });
        }
    }


    return (
        <div id='pageHome'className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-5'>
                    <span className="newsText newsTextLarge pink">הוספת ברכה אישית &nbsp;
                    <img src={add} alt="" /></span>
                </div>
                <Formik
                    initialValues={{ email: '', title: '', content: '' }}
                    validationSchema={PrivateCongratulationSchema}
                    onSubmit={
                        async (values, actions) => {
                            await addCongratulation(values);
                            actions.resetForm({
                                values: {
                                    email: '',
                                    title: '',
                                    content: ''
                                },
                            });
                        }
                    } >
                    <Form className="mx-1 my-3"  >
                        <div>
                            <div className="row">
                                <div className="col mr">
                                    <div>
                                        <Field className="field fieldContactus heightField" type="email" name="email" placeholder=' מייל משתמש' style={{ textAlign: "right" }} />
                                        <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="email" />
                                    </div>
                                    <div className="my-3">
                                        <Field className="field fieldContactus heightField" type="text" name="title" placeholder='כותרת' style={{ textAlign: "right" }} />
                                        <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="title" />
                                    </div>
                                </div>
                                <div className="col ml">
                                    <div className="textareaContent">
                                        <Field as="textarea" className="field fieldContactus" type="text" name="content" placeholder="תוכן..." />
                                        <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="content" />
                                    </div>
                                </div>
                            </div>
                            <button className='login-button my-4' type='submit'>
                                <span className='login-text'>הוספה</span>
                            </button>
                            {
                                openModal && titleModal !== "" ?
                                    <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModal(false) }} close={() => { setOpenModal(false) }} />
                                    : null
                            }
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>

        </div>
    )
}
