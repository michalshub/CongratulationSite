import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import Modal1 from "../modal/modal";
import UpdateCongratulation from '../UpdateCongratulation/UpdateCongratulation';
import UpdateWallpaper from '../UpdateWallpaper/UpdateWallpaper'
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'
import edit from './edit.png'
import flower from './flower.png'
import wall from './wall.png'

const UpdateSubCategorySchema = Yup.object().shape({
    subCategory: Yup.string().required('שדה חובה'),
})

export default function UpdateSubCategory(props) {

    const [categories, setCategories] = useState(['בחר קטגוריה']);
    const [subCategory, setSubCategory] = useState(['בחר קטגוריה']);
    const [openModal, setOpenModal] = useState(false);
    const [subCategorySelect, setSubCategorySelect] = useState();
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    let rows = [];
    let rows2 = [];

    useEffect(() => {
        getData()
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
    function filterCategory(categoryId, secound) {
        if (categoryId !== 'בחר קטגוריה' && categoryId !== '') {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            fetch(`http://localhost:3400/getSubCategoriesByCategoryId/${categoryId}`, requestOptions)
                .then(response =>
                    response.json())
                .then(response => {
                    setSubCategory(response.subcategories.sort(
                        (a, b) => a.name > b.name ? 1 : -1
                    ));

                    if (secound === true) {
                        let sub = response.subcategories.filter((element) => (element._id === subCategorySelect._id))
                        setSubCategorySelect(sub[0])
                    }
                    else {
                        setSubCategorySelect()
                    }
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
    }
    function filterSubCategory(subCategoryId) {
        if (subCategoryId !== 'בחר תת קטגוריה') {
            let sub = subCategory.filter((element) => (element._id === subCategoryId))
            setSubCategorySelect(sub[0])
        }
    }


    function refresh() {
        if (subCategorySelect.categoryCongratulateId) {
            filterCategory(subCategorySelect.categoryCongratulateId, true)
        }
    }

    function updateSubCategory(e) {
        if (e.subCategory !== "" && e.subCategory !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "name": e.subCategory });
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/updateSubcategoryById/${subCategorySelect._id}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setOpenModal(true)
                    setTitleModal("עריכת תת קטגוריה");
                    setBodyModal("תת קטגוריה עודכנה בהצלחה");
                    getData();
                    setSubCategory([])
                    let selectTags = document.getElementById('categoryName')
                    selectTags.selectedIndex = 0;
                    let selectTags2 = document.getElementById('subCategoryName')
                    selectTags2.selectedIndex = 0;
                })
                .catch(error => {
                    setOpenModal(true)
                    setTitleModal("עריכת תת קטגוריה");
                    setBodyModal("העידכון נכשל");
                    console.log('error', error)
                });
        }
    }


    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-4'>
                    <span className="newsText newsTextLarge pink">עריכת תת קטגוריה &nbsp;
                        <img src={edit} alt="" /></span>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={
                        async (values, actions) => {
                            await updateSubCategory(values);
                            actions.resetForm({
                                values: {
                                    subCategory: ''
                                },
                            });
                        }
                    }
                    validationSchema={UpdateSubCategorySchema}
                >
                    <Form className="my-3"  >

                        <div>
                            <div className="row mx-5">

                                <div className="col">
                                    <Field className="field fieldContactus" id="categoryName" onChange={(e) => {
                                        filterCategory(e.target.value, false)
                                    }} as="select" name="categorySelected">
                                        <option key="categorySelected0">בחר קטגוריה</option>
                                        {categories.forEach((item) => {
                                            rows.push(
                                                <option key={"categorySelected" + item._id} value={item._id}>{item.name}</option>
                                            )
                                        })}
                                        {rows}
                                    </Field>
                                </div>
                                <div className="col">
                                    <Field className="field fieldContactus" id="subCategoryName" onChange={(e) => {
                                        (setSubCategorySelect(e.target.value)); filterSubCategory(e.target.value)
                                    }} as="select" name="subCategorySelected">
                                        <option key="subCategorySelected0">בחר תת קטגוריה</option>
                                        {subCategory.forEach((item) => {
                                            rows2.push(
                                                <option key={"subCategorySelected" + item._id} value={item._id}>{item.name}</option>
                                            )
                                        })}
                                        {rows2}
                                    </Field>
                                </div>

                            </div>

                            <div className="row mx-5 mb-5">
                                <div className="col">
                                    {
                                        subCategorySelect && subCategorySelect.name ?
                                            (<>
                                                <Field className="field fieldContactus" type="text" name="subCategory" placeholder='תת קטגוריה' style={{ textAlign: "right" }} />
                                                <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="subCategory" />
                                            </>)
                                            :
                                            null
                                    }
                                </div>
                                <div className="col"></div>
                            </div>
                            <button onClick={() => { setOpenModal(true) }} className='login-button buttons my-4' type='submit'>
                                <span className='login-text'>עדכון</span>
                            </button>
                            {
                                subCategorySelect ?
                                    <>
                                        <div className='row newCon pictureTitle my-5'>
                                            <span className="newsText newsTextLarge pink">ברכות &nbsp;
                                                <img src={flower} alt="" /></span>
                                        </div>
                                        <UpdateCongratulation subCategorySelect={subCategorySelect} refresh={() => refresh()} />
                                        <div className='row newCon pictureTitle my-4'>
                                            <span className="newsText newsTextLarge pink">רקעים &nbsp;
                                                <img src={wall} alt="" /></span>
                                        </div>
                                        <UpdateWallpaper subCategorySelect={subCategorySelect} refresh={() => refresh()} />
                                    </> : null
                            }

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
            <div className='row py-5'></div>

        </div >
    )
}

