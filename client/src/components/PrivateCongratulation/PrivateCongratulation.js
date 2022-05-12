import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { setPcSubject, setPcEmail, setPcPicked, setPcNote } from '../../redux/actions/fetchDataActions';
import '../desine.css';
import './privateCongratulation.css';
import Menu from '../menu/menu';
import flower from "./flower.png";
import { MdPayment } from "react-icons/md";


const PrivateCongratulationSchema = Yup.object().shape({
    subject: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('מייל לא חוקי'),
})

function PrivateCongratulation(props) {
    const { myUser } = props
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(false)
        if (props.myUser.email && props.myUser.email !== "") {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [])


    const pay = (e) => {
        setShow(false)
        setLoader(true);

        window.localStorage.setItem('subject', e.subject);
        window.localStorage.setItem('email', e.email);
        window.localStorage.setItem('picked', e.picked);
        window.localStorage.setItem('note', e.note);
        window.localStorage.setItem('userName', myUser.name);
        window.localStorage.setItem('userPassword', myUser.password);

        setPcSubject(e.subject)
        setPcEmail(e.email)
        setPcPicked(e.picked)
        setPcNote(e.note)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch(`http://localhost:3400/paymentCreateTransactionId`, requestOptions)
            .then(response => response.json())
            .then(response => {
                window.location = "https://secure.arkom.co.il/GetPaymentMini/GetPayment2.aspx?TransID=~" + response.TransID;
            })
            .catch(error => console.log('error', error));

    };

    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            {
                show ?
                    <div className='content'>
                        <span id='title'>ברכה אישית &nbsp;
                        <img src={flower} alt="" /></span>
                        <Formik
                            initialValues={{ subject: '', email: '', picked: 'זכר', note: '' }}
                            onSubmit={pay}
                            validationSchema={PrivateCongratulationSchema}>
                            <Form>
                                <div className='row'>
                                    <div className='col mr'>
                                        <div className='notP'>
                                            <Field className="field fieldContactus" type="email" name="email" placeholder='מייל' />
                                            <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="email" />
                                        </div>
                                        <div>
                                            <Field className="field fieldContactus" type="text" name="subject" placeholder='נושא' />
                                            <ErrorMessage className="fieldContactus alert alert-danger alert-large" component="div" name="subject" />
                                        </div>
                                        <div className="row mx-3 my-1 radioText">מין:</div>
                                        <div className="form-group row my-2 mx-1 privateCon">
                                            <div role="group" aria-labelledby="my-radio-group">
                                                <label className="form-check">
                                                    <Field type="radio" name="picked" value="זכר" />
                                                    <span className="radioText mx-2">זכר</span>
                                                    <Field type="radio" name="picked" value="נקבה" />
                                                    <span className="radioText mx-2">נקבה</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col ml'>
                                        <div className='textareaContent'>
                                            <Field name="note" as="textarea" className="field fieldContactus" type="text" placeholder='הערות' />
                                        </div>
                                    </div>
                                </div>
                                <button className='login-button my-5' type='submit'>
                                    <MdPayment className='send paymentIcon' />
                                </button>
                            </Form>
                        </Formik>
                    </div>
                    :

                    !loader ?
                        <div className='content'>
                            <span id='title' className='px-5'>
                                גולש יקר!<br />
                                כדי להזמין ברכה אישית <br />
                                יש להתחבר קודם<br />
                                עלות ברכה אישית היא 5 ש"ח<br />
                            </span>
                            <button className='login-button my-5' onClick={() => history.push("./login")}>
                                <span className='login-text'>להתחברות</span>
                            </button>
                        </div> : null
            }
            {
                loader ?
                    <div>
                        <div className="demo">
                            <div id="demo-content">
                                <div id="loader-wrapper">
                                    <div id="loader"className="top-loader"></div>
                                </div>
                            </div>
                        </div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                    </div>
                    : null
            }
            <div className='row py-5'></div>
            <div className='row py-4'></div>

        </div>
    )
}
export default connect(
    (state) => {
        return {
            myUser: state.userReducer.user
        }
    },

)(PrivateCongratulation);