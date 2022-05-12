import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Modal1 from "../modal/modal";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'
import edit from './edit.png'
import './updateCategory.css'

export default function UpdateCategory() {

    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [cat, setCat] = useState();
    const [subCategory, setSubCategory] = useState([]);
    let rows = [];
    let copySub = [];

    function filterCategory(name) {
        document.getElementById("categoryField").value = "";
        if (name !== 'בחר קטגוריה') {
            let cat = categories.filter((element) => (element.name === name))
            setCategory(cat[0]);
            setCat(cat[0].name);
            cat[0].subCategories.forEach((item) => {
                copySub.push({ _id: item._id, name: item.name });
            })
            setSubCategory(copySub);
        }
    }
    function setSubCategoryArray(id, val) {
        let subCat = [...subCategory];
        subCat.forEach((item) => {
            if (item._id === id)
                item.name = val;
        })
        setSubCategory(subCat)
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

    function updateCategory() {
        if (cat !== "" && cat !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "name": cat, "subCategories": subCategory });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/updateCategoryById/${category._id}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setOpenModal(true)
                    setTitleModal("עדכון קטגוריה");
                    setBodyModal("הקטגוריה עודכנה בהצלחה");
                    getData();
                    let selectTags= document.getElementById('categoryName')
                    selectTags.selectedIndex=0;
                    setSubCategory([]);
                    setCat('')
                })
                .catch(error => {
                    setOpenModal(true);
                    setTitleModal("עדכון קטגוריה");
                    setBodyModal("העידכון נכשל");
                    console.log('error', error)
                });
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-5'>
                    <span className="newsText newsTextLarge pink">עריכת קטגוריה &nbsp;
                    <img src={edit} alt=""/></span>
                </div>
                <Formik
                    initialValues={{ category: '' }}
                    onSubmit={
                        async (values, actions) => {
                            await updateCategory(values);
                            actions.resetForm({
                                values: {
                                    category: ''
                                },
                            });
                        }
                    }>
                    <Form className="my-3">
                        <div className="row mx-5">
                            <div className='col'>
                                <Field className="field fieldContactus" id="categoryName" onChange={(e) => {
                                    filterCategory(e.target.value)
                                }} as="select" name="categorySelected">
                                    <option key="0" id="">בחר קטגוריה</option>
                                    {categories.forEach((item) => {
                                        rows.push(
                                            <option key={item._id} id="">{item.name}</option>
                                        )
                                    })}
                                    {rows}
                                </Field>
                            </div>
                            <div className="col">
                                <Field id="categoryField" className="field fieldContactus" type="text" placeholder="קטגוריה" name="category"
                                    onChange={(e) => {
                                        setCat(e.target.value)
                                    }} value={cat} />
                                <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="category" />
                            </div>
                        </div>
                        <div className="row mx-5 px-2 my-3">
                            <div className="col-3">
                                <label className="smallTitle" htmlFor="exampleFormControlSelect1">תת קטגוריה</label>
                            </div>
                        </div>
                        <div className="row mx-5 my-3">
                            {
                                subCategory ?
                                    subCategory.map((item, index) => {
                                        return (
                                            <div className="col my-2 colSub" key={index}>
                                                <Field className="field fieldSub" type="text" name={`subCategory.${index}`}
                                                    value={item.name}
                                                    onChange={(e) => setSubCategoryArray(item._id, e.target.value)} />
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                        <button className='login-button my-4' onClick={() => updateCategory()}>
                            <span className='login-text'>עדכון</span>
                        </button>

                        {
                            openModal && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModal(false) }} close={() => { setOpenModal(false) }} />
                                : null
                        }
                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>

        </div>
    )
}


