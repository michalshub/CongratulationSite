import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Modal1 from "../modal/modal";
import ManagerNavBar from "../ManagerNavBar/ManagerNavBar";
import deleteImg from './delete.png'
import deleteBtn from './deleteBtn.png'


export default function DeletePrivateCongratulation() {

    const [openModal, setOpenModal] = useState(false);
    const [openModalRes, setOpenModalRes] = useState(false);
    const [congratulation, setCongratulation] = useState();
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [emailUser, setEmailUser] = useState('');

    const [conId, setConId] = useState("");

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


    function ok() {
        setOpenModal(false)
        if (conId !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };
            fetch(`http://localhost:3400/deletePerCongratulationById/${conId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setOpenModalRes(true);
                    setTitleModal("מחיקת ברכה");
                    setBodyModal("הברכה נמחקה בהצלחה");
                    getCon("")
                    getCon(emailUser)
                })
                .catch(error => {
                    setOpenModalRes(true);
                    setTitleModal("מחיקת ברכה");
                    setBodyModal("המחיקה נכשלה");
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
            fetch(`http://localhost:3400/getAllPerCongratulationsByUserId/${email}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    setCongratulation(response.congratulation);
                })
                .catch(error => console.log('error', error));
        }
        else {
            setCongratulation()
        }
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
                    <span className="newsText newsTextLarge pink">מחיקת ברכה אישית &nbsp;
                        <img src={deleteImg} alt="" /></span>
                </div>
                <Formik
                    initialValues={{}}>
                    <Form className="mx-5"  >
                        <div className="row my-5">
                            <div className="col">
                                <Field onChange={(e) => { getCon(e.target.value) }} className="field iconsEmail" type="email" name="email" placeholder='מייל' />
                                <ErrorMessage className="alert alert-danger" component="div" name="email" />
                            </div>
                        </div>
                        <div className="row my-5">

                            {
                                congratulation ?
                                    congratulation.forEach((item, index) => {
                                        rows.push(
                                            <div className="col con" key={item._id}>
                                                <img className="conImgSubCategory" src={(wall[j].url)} alt="card image2" />

                                                <div className="centered smallWidth centerT overflow">
                                                    <strong className="line-break">{item.title}</strong><br />
                                                    <span className="line-break">{item.content}</span>
                                                </div>
                                                <div className="marginB">
                                                    <img className="p-2 cursor" src={deleteBtn} alt=""
                                                        onClick={() => {
                                                            setTitleModal("מחיקת ברכה");
                                                            setBodyModal("האם אתה בטוח שברצונך למחוק את הברכה?");
                                                            setOpenModal(true);
                                                            setConId(item._id)
                                                        }} />
                                                </div>
                                                {setJ()}

                                            </div>
                                        )
                                    })
                                    : null
                            }
                            {rows}
                        </div>

                        {
                            openModal && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={ok} close={() => { setOpenModal(false) }} />
                                : null
                        }
                        {
                            openModalRes && titleModal !== "" ?
                                <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModalRes(false) }} close={() => { setOpenModalRes(false) }} />
                                : null
                        }
                    </Form>
                </Formik>
            </div>
            <div className='row py-4'></div>
            <div className='row py-5'></div>
        </div>
    )
}