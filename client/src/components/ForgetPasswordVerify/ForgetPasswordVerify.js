import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import Menu from '../menu/menu';
import edit from './edit.png'

const ForgetPasswordVerifySchema = Yup.object().shape({
    code: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('מייל לא תקין'),
})

export default function ForgetPasswordVerify(props) {
    const history = useHistory();
    useEffect(() => {
        if (props.location.email === undefined || props.location.code === undefined) {
            history.push("./forgetPassword")
        }
    }, [])
    const verify = (e) => {
        if (e.code === props.location.code) {
            history.push({ pathname: '/updatePassword', email: e.email });
        }
        else {
            alert("קוד אימות שגוי")
        }
    }
    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            <div className='content'>

                <Formik
                    initialValues={{ email: props.location.email, code: '' }}
                    onSubmit={verify}
                    validationSchema={ForgetPasswordVerifySchema}>
                    <Form>
                        <span id='title'>אימות מייל &nbsp;
                        <img src={edit} alt="" /></span>
                        <div>
                            <Field disabled={true} className="field icons2" type="email" name="email" placeholder='מייל' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="email" />
                        </div>

                        <div>
                            <Field className="field icons3" type="text" name="code" placeholder='קוד אימות' style={{ textAlign: "right" }} />
                            <ErrorMessage className="alert alert-danger" component="div" name="code" />
                        </div>
                        <button type='submit' className='login-button my-5'>
                            <span className='login-text'>אימות</span>
                        </button>
                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>
            <div className='row py-4'></div>
        </div>
    )
}
