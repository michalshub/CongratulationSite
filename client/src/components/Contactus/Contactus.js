import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import React, { useState } from 'react';
import Menu from '../menu/menu';
import './contactus.css';
import phone from './phone.png'
import send from './send.png'
import Modal1 from "../modal/modal";

const ContactusSchema = Yup.object().shape({
    name: Yup.string().required('שדה חובה'),
    phone: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
    text: Yup.string().required('שדה חובה')

})



export default function Contactus(props) {
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    
  
    const sendMail = async (e) => {

    const response = await fetch("http://localhost:3400/sendMail", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            to: 'CongratulationsWebsite@gmail.com', sub: "יצירת קשר"
            , txt: " שם: " + e.name + "\n טלפון: " + e.phone + "\n מייל: " + e.email + "\n הודעה: " + e.text
        })
    });
    const resData = await response.json();
    if (resData.status === 'success') {
        setTitleModal('יצירת קשר');
        setBodyModal('בקשתך התקבלה ותענה בהקדם תודה על פניתך');
        setOpenModal(true)
    } else if (resData.status === 'fail') {
        setTitleModal('יצירת קשר');
        setBodyModal('יצירת הקשר נכשלה');
        setOpenModal(true)
    }
};
    return (
        <div id='page' className='not-scroll'>
            <Menu />
            <div className='content'>
                <span id='title'>דברו איתנו &nbsp;
                <img src={phone} alt=""/></span>
                <Formik
                    initialValues={{ name: '', phone: '', email: '', text: '' }}
                    onSubmit={
                        async (values, actions) => {
                            await sendMail(values);
                            actions.resetForm({
                                values: {
                                    name: '',
                                    phone: '',
                                    email: '',
                                    text: ''
                                },
                            });
                        }
                    }
                    validationSchema={ContactusSchema}>
                    <Form>
                        <div className='row'>
                            <div className='col mr'>
                                <div className='notP'>
                                    <Field className="field fieldContactus" type="text" name="name" placeholder='איך קוראים לך?' />
                                    <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="name" />
                                </div>

                                <div>
                                    <Field className="field fieldContactus" type="Email" name="email" placeholder='האימייל שלך' />
                                    <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="email" />
                                </div>
                                <div>
                                    <Field className="field fieldContactus" type="phone" name="phone" placeholder="ומס' טלפון, אפשר?" />
                                    <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="phone" />
                                </div>
                            </div>
                            <div className='col ml'>
                                <div className='textareaContent'>
                                    <Field  name="text" as="textarea" className="field fieldContactus" type="text" placeholder="רציתי להגיד ש..."/>
                                    <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="text" />
                                </div>
                            </div>
                        </div>

                        <button className='login-button my-5' type='submit'>
                            <img className='send' src={send} alt=""/>
                        </button>

                      
                        {
                            openModal && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={() => setOpenModal(false)} close={() => setOpenModal(false)} />
                                : null
                        }
                    </Form>
                </Formik>
                
            </div>
            <div className='row py-5'></div>
            <div className='row py-3'></div>

        </div>

    )
}