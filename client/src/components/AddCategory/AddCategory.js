import React, { useEffect, useState } from "react";
import { IoIosAdd } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import Modal1 from "../modal/modal";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'
import add from './add.png'
import './addCategory.css'

const AddCategorySchema = Yup.object().shape({
    category: Yup.string().required('שדה חובה')
})

export default function AddCategory() {
    const [row, setRow] = useState([]);
    let sub = [];
    const [index, setIndex] = useState(1);
    const [i, setI] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    useEffect(() => {
        fill()
    }, [])

    function fill() {
        let rows = [];
        if (i < 4) {
            setI(i + 1)
            rows.push(row);
            rows.push(
                <div className="row my-2">
                    <div className="col">
                        <Field className="field fullField" type="text" name={"subCategory" + index} placeholder='תת קטגוריה' />
                    </div>
                    <div className="col">
                        <Field className="field fullField" type="text" name={"subCategory" + (index + 1)} placeholder='תת קטגוריה' />
                    </div>
                    <div className="col">
                        <Field className="field fullField" type="text" name={"subCategory" + (index + 2)} placeholder='תת קטגוריה' />
                    </div>
                </div>
            )
            setIndex(index + 3);
            setRow(rows);
        }

    }

    function addCategory(e) {
        for (let j = 0; j < index; j++)
            if (e["subCategory" + j] !== "" && e["subCategory" + j] !== undefined)
                sub.push({ "name": e["subCategory" + j] });

        if (e.category !== "" && e.category !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "name": e.category, "subCategories": sub });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            fetch("http://localhost:3400/createCategory", requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setTitleModal("הוספת קטגוריה")
                    setBodyModal("הקטגוריה נוספה בהצלחה")
                    setOpenModal(true)
                })
                .catch(error => {
                    setTitleModal("הוספת קטגוריה")
                    setBodyModal("ההוספה נכשלה")
                    setOpenModal(true)
                    console.log('error', error)
                });
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-4'>
                    <span className="newsText newsTextLarge pink">הוספת קטגוריה חדשה &nbsp;
                    <img src={add}  alt=""/></span>
                </div>
                <Formik
                    initialValues={{ category: '', subCategory: '' }}
                    validationSchema={AddCategorySchema}

                    onSubmit={
                        async (values, actions) => {
                            addCategory(values);
                            actions.resetForm({
                                values: {
                                    category: '',
                                    subCategory1: '',
                                    subCategory2: '',
                                    subCategory3: '',
                                    subCategory4: '',
                                    subCategory5: '',
                                    subCategory6: '',
                                    subCategory7: '',
                                    subCategory8: '',
                                    subCategory9: '',
                                    subCategory10: '',
                                    subCategory11: '',
                                    subCategory12: '',
                                },
                            });
                        }
                    }
                >
                    <Form className="mx-5">

                        <div className='row'>
                            <div>
                                <Field className="field iconsCategory" type="text" name="category" placeholder='קטגוריה' style={{ textAlign: "right" }} />
                                <ErrorMessage className="alert alert-danger" component="div" name="category" />
                            </div>
                            <div className="row form-group my-3">
                                <div className="col-3 mx-1">
                                    <label className="smallTitle" htmlFor="exampleFormControlSelect1">תת קטגוריה</label>
                                </div>
                                <div className="col">
                                    <IoIosAdd className="addIcon" onClick={() => { fill() }} />
                                </div>
                            </div>
                            {row}
                            <button className='login-button my-4' type='submit'>
                                <span className='login-text'>הוספה</span>
                            </button>

                            {
                                openModal && titleModal !== "" ?
                                    <Modal1 title={titleModal} body={bodyModal} ok={() => setOpenModal(false)} close={() => setOpenModal(false)} />
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


