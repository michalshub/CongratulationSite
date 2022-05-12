import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik'
import Modal1 from "../modal/modal";
import deleteImg from './delete.png'
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'


export default function DeleteCategory() {
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [categories, setCategories] = useState([]);
    const [categorySelect, setCategorySelect] = useState('בחר קטגוריה');
    const [category, setCategory] = useState({});
    let rows = [];

    function filterCategory(name) {
        let cat = categories.filter((element) => (element.name === name))
        setCategory(cat[0])
    }

    useEffect(() => {
        getData();
    }, [])
    function getData() {
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
    }


    function deleteCategory(e) {
        if (categorySelect !== "בחר קטגוריה" && categorySelect !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "name": categorySelect });
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/deleteCategoryById/${category._id}`, requestOptions)
                .then(response => {
                    response.json()
                }).then(() => {
                    setTitleModal("מחיקת קטגוריה");
                    setBodyModal("הקטגוריה נמחקה בהצלחה");
                    setOpenModal(true);
                    getData();
                    let selectTags= document.getElementById('categoryName')
                    selectTags.selectedIndex=0;
                })
                .catch(error => {
                    setTitleModal("מחיקת קטגוריה");
                    setBodyModal("המחיקה נכשלה");
                    setOpenModal(true);
                });
        }
        else {
            setOpenModal(true);
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-5'>
                    <span className="newsText newsTextLarge pink">מחיקת קטגוריה &nbsp;
                    <img src={deleteImg} alt="" /></span>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={
                        async (values, actions) => {
                            await deleteCategory(values);
                            actions.resetForm({
                                values: {
                                },
                            });
                        }
                    } >
                    <Form className="mx-1 my-3"  >
                        <div className="row ">
                            <div className="col">
                                <Field className="field" id="categoryName" onChange={(e) => {
                                    (setCategorySelect(e.target.value)); filterCategory(e.target.value)
                                }} as="select" name="categorySelected">
                                    <option key="0">בחר קטגוריה</option>
                                    {categories.forEach((item) => {
                                        rows.push(<option key={item._id}>{item.name}</option>)
                                    })}
                                    {rows}
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
            <div className='row py-3'></div>

        </div>
    )
}