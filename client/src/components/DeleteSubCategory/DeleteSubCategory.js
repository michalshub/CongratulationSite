import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik'
import Modal1 from "../modal/modal";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar';
import deleteImg from './delete.png'


export default function DeleteCategory() {
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    const [subCategorySelect, setSubCategorySelect] = useState({});
    let rows = [];
    let rows2 = [];

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch(`http://localhost:3400/getAllCategories`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setCategories(response.allCategories.sort(
                    (a, b) => a.name > b.name ? 1 : -1
                ));
            })
            .catch(error => console.log('error', error));
    }, [])

    function filterCategory(name) {
        if (name !== 'בחר קטגוריה') {
            let cat = categories.filter((element) => (element.name === name))
            setSubCategory(cat[0].subCategories.sort(
                (a, b) => a.name > b.name ? 1 : -1
            ));
        }
    }
    function filterSubCategory(name) {
        if (name !== 'בחר תת קטגוריה') {
            let sub = subCategory.filter((element) => (element.name === name))
            setSubCategorySelect(sub[0])
        }
    }


    function deleteSubCategory(e) {

        if (subCategorySelect.name !== "" && subCategorySelect.name !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "subCategory": e.subCategory });
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/deleteSubcategoryById/${subCategorySelect._id}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setOpenModal(true)
                    setTitleModal("מחיקת תת קטגוריה")
                    setBodyModal("תת קטגוריה נמחקה בהצלחה")
                })
                .catch(error => {
                    setTitleModal("מחיקת תת קטגוריה")
                    setBodyModal("המחיקה נכשלה")
                    setOpenModal(true)
                    console.log('error', error)
                });
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-5'>
                    <span className="newsText newsTextLarge pink">מחיקת תת קטגוריה &nbsp;
                    <img src={deleteImg} alt=""/></span>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={
                        async (values, actions) => {
                            await deleteSubCategory(values);
                            actions.resetForm({
                                values: {
                                },
                            });
                        }
                    } >
                    <Form className="mx-1 my-3"  >
                        <div className="row">
                            <div className="col">
                                <Field className="field" onChange={(e) => {
                                    filterCategory(e.target.value)
                                }} as="select" name="categorySelected">
                                    <option key="0">בחר קטגוריה</option>
                                    {categories.forEach((item) => {
                                        rows.push(
                                            <option key={item._id} >{item.name}</option>
                                        )
                                    })}
                                    {rows}
                                </Field>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Field className="field" onChange={(e) => {
                                    (setSubCategorySelect(e.target.value)); filterSubCategory(e.target.value)
                                }} as="select" name="subCategorySelected">
                                    <option key="0">בחר תת קטגוריה</option>
                                    {subCategory.forEach((item) => {
                                        rows2.push(
                                            <option key={item._id} >{item.name}</option>
                                        )
                                    })}
                                    {rows2}
                                </Field>
                            </div>
                        </div>
                        <button className='login-button my-4' type='submit'>
                            <span className='login-text'>מחיקה</span>
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
        </div>
    )
}