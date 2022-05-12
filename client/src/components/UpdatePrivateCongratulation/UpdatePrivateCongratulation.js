import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Modal1 from "../modal/modal";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ManagerNavBar from "../ManagerNavBar/ManagerNavBar";
import edit from './edit.png';
import './updatePrivateCongratulation.css'
import editBtn from './editBtn.png';


export default function UpdatePrivateCongratulation() {
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    const [congratulation, setCongratulation] = useState();

    const [conId, setConId] = useState("");
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emailUser, setEmailUser] = useState('');
    let rows = [];
    const [wall, setWall] = useState([]);

    useEffect(() => {
        let wallpaper = [];
        let i = 1;
        for (let index = 0; index < 12; index++) {
            wallpaper.push({ url: "./../private/" + i + ".png" });
            i++;
        }
        setWall(wallpaper);
    }, [])

    function updateCongratulation() {
        if (title !== "" && content !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "title": title,
                "content": content
            });
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/updatePerCongratulationById/${conId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setShow(false)
                    setOpenModal(true)
                    setTitleModal("עריכת ברכה אישית");
                    setBodyModal("הברכה עודכנה בהצלחה");
                    getCon("")
                    getCon(emailUser)
                })
                .catch(error => {
                    setShow(false)
                    setOpenModal(true)
                    setTitleModal("עריכת ברכה אישית");
                    setBodyModal("העידכון נכשל");
                    console.log('error', error)
                });
        }
    }
    function getCon(email) {

        if (email) {
            setEmailUser(email);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            fetch(`http://localhost:3400/getAllPerCongratulationsByUserId/${email.toLowerCase()}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    setCongratulation(response.congratulation);
                })
                .catch(error => console.log('error', error));
        }
        else
            setCongratulation()
    }
    let j = 0;

    function setJ() {
        if (j < wall.length - 1) j++;
        else j = 0;
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div className="my-5 centerdiv">
                <div className='row newCon pictureTitle my-4'>
                    <span className="newsText newsTextLarge pink">עריכת ברכה אישית &nbsp;
                        <img src={edit} alt="" /></span>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={
                        async (values, actions) => {
                            await updateCongratulation(values);
                            actions.resetForm({
                                values: {
                                },
                            });
                        }
                    } >
                    <Form className="mx-5"  >
                        <div className="row my-5">
                            <div>
                                <Field onChange={(e) => { getCon(e.target.value) }} className="field iconsEmail" type="email" name="email" placeholder='מייל' style={{ textAlign: "right" }} />
                                <ErrorMessage className="alert alert-danger" component="div" name="email" />
                            </div>
                        </div>
                        <div className="row my-5">
                            {
                                congratulation ?
                                    congratulation.forEach((item, index) => {
                                        rows.push(
                                            <div className="col con">
                                                <img className="conImgSubCategory" src={(wall[j].url)} alt="card image2" />

                                                <div className="centered smallWidth centerT overflow">
                                                    <b className="line-break">{item.title}</b><br />
                                                    <span className="line-break">{item.content}</span>
                                                </div>
                                                <div className="marginB">
                                                    <img className="p-2 cursor" alt="" src={editBtn} onClick={(e) => { setTitle(item.title); setContent(item.content); setConId(item._id); setShow(true) }} />
                                                </div>
                                                {setJ()}

                                            </div>
                                        )
                                    })
                                    : null
                            }
                            {rows}
                        </div>

                        {show ?
                            <Modal show={show} onHide={() => { setShow(false) }} style={{ direction: "rtl" }}>
                                <Modal.Header >
                                    <Modal.Title>עריכת ברכה אישית</Modal.Title>
                                    <IoMdClose onClick={() => setShow(false)} style={{ fontSize: "1.7rem", color: "gray" }} />
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col" style={{ textAlign: "right" }}>
                                            <label>כותרת</label>
                                        </div>
                                        <div className="col">
                                            <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" name="title" style={{ textAlign: "right" }} />
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col" style={{ textAlign: "right" }}>
                                            <label>תוכן</label>
                                        </div>
                                        <div className="col">
                                            <textarea onChange={(e) => setContent(e.target.value)} value={content} className="form-control" type="name" name="title" style={{ textAlign: "right" }} />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => { updateCongratulation() }}>עדכון</Button>
                                </Modal.Footer>
                            </Modal>
                            : null
                        }

                        {
                            openModal && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModal(false) }} close={() => { setOpenModal(false) }} />
                                : null
                        }
                    </Form>
                </Formik>
            </div>
            <div className='row py-5 my-5'></div>
            <div className='row py-5'></div>

        </div>
    )
}