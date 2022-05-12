import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import Modal1 from "../modal/modal";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'
import add from './add.png'



const AddSubCategorySchema = Yup.object().shape({
    subCategoryToAdd: Yup.string().required('שדה חובה')
})

export default function AddSubCategory() {
    const [row, setRow] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [categories, setCategories] = useState([]);
    const [categorySelect, setCategorySelect] = useState('בחר קטגוריה');
    const [category, setCategory] = useState({});
    let rows = [];

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

    function filterCategory(name) {
        if (name !== 'בחר קטגוריה') {
            let cat = categories.filter((element) => (element.name === name))
            setCategory(cat[0])
            fill(cat[0])
        }
        else
            setRow([])
    }
    function fill(cat) {
        let rows2 = []
        if (cat.subCategories) {
            cat.subCategories.forEach((item, index) => {
                if (item.name) {
                    rows2.push(
                        <div className="col my-2 colSub">
                            <div className="field fieldSub" style={{ lineHeight: "3" }}>{item.name}</div>
                        </div>
                    )
                }
            })
        }
        setRow(rows2)
    }

    function addSubCategory(e) {
        if (categorySelect !== "" && categorySelect !== undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "subCategory": e.subCategoryToAdd });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/createSubCategory/${category._id}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setTitleModal("הוספת תת קטגוריה")
                    setBodyModal("תת קטגוריה נוספה בהצלחה")
                    setOpenModal(true)
                    getData();
                    setRow([])
                    let selectTags = document.getElementById('categoryName')
                    selectTags.selectedIndex = 0;
                })
                .catch(error => {
                    setTitleModal("הוספת תת קטגוריה")
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
                <div className='row newCon pictureTitle my-5'>
                    <span className="newsText newsTextLarge pink">הוספת תת קטגוריה &nbsp;
                    <img src={add} alt="" /></span>
                </div>
                <Formik
                    initialValues={{ subCategoryToAdd: '' }}
                    onSubmit={
                        async (values, actions) => {
                            await addSubCategory(values);
                            actions.resetForm({
                                values: {
                                    subCategoryToAdd: ''
                                },
                            });
                        }
                    }
                    validationSchema={AddSubCategorySchema}>
                    <Form className="my-3"  >
                        <div className="row mx-5 rowSmall">
                            <div className='col'>
                                <Field className="field fieldContactus" id="categoryName" onChange={(e) => {
                                    (setCategorySelect(e.target.value)); filterCategory(e.target.value)
                                }} as="select" name="categorySelected">
                                    <option key="0">בחר קטגוריה</option>
                                    {categories.forEach((item) => {
                                        rows.push(
                                            <option key={item._id}>{item.name}</option>
                                        )
                                    })}
                                    {rows}
                                </Field>
                                <ErrorMessage className="fieldContactus alert alert-danger" component="div" name="categorySelected" />
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="row mx-5 mt-4 px-2">
                            <label className="smallTitle" htmlFor="exampleFormControlSelect1">תת קטגוריות</label>
                        </div>
                        <div className="row mx-5 my-3">
                            {row}
                        </div>
                        <div className="row mx-5 px-2">
                            <label className="smallTitle" htmlFor="exampleFormControlSelect1">תת קטגוריה להוספה</label>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Field className="field" type="text" name="subCategoryToAdd" placeholder='תת קטגוריה' style={{ textAlign: "right" }} />
                                <ErrorMessage className="alert alert-danger" component="div" name="subCategoryToAdd" />
                            </div>
                        </div>
                        <button className='login-button my-4' type='submit'>
                            <span className='login-text'>הוספה</span>
                        </button>
                        {
                            openModal && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={() => {
                                    setOpenModal(false);
                                }} close={() => { setOpenModal(false) }} />
                                : null
                        }
                    </Form>
                </Formik>
            </div>
            <div className='row py-5'></div>


        </div>
    )
}