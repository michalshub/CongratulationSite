import React, { useState } from "react";

import upload from './upload.png'
import Modal1 from '../modal/modal';
import './addWallpaper.css'

export default function AddWallpaper(props) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
                uploadImage(reader.result, e.target.files[0].name.split('.')[0], e.target.files[0].name.split('.')[1])
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    function uploadImage(urlPicture, pictureName, pictureType) {
        if (urlPicture !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "name": pictureName, "url": urlPicture, "type": pictureType });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/createWallpapers/${props.subCategorySelectId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setTitleModal("הוספת רקע");
                    setBodyModal("הרקע נוסף בהצלחה");
                    setOpenModal(true);
                    setImgData();
                    props.refresh()
                })
                .catch(error => {
                    setTitleModal("הוספת רקע");
                    setBodyModal("ההוספה נכשלה");
                    setOpenModal(true);
                    console.log('error', error)
                });
        }
    }

    return (
        <div className="row">
            <button onClick={() => { document.getElementById('profilePic').click() }} className='login-button buttons buttonsUpload my-4'>

                <span className='login-text'>
                    <img className="uploadImg" src={upload} alt="" />
                    העלאת חדש</span>
            </button>
            <div className="register_profile_image">
                <input id="profilePic" type="file" style={{ display: "none" }} onChange={onChangePicture} />
            </div>
            {
                openModal && titleModal !== "" ?
                    <Modal1 title={titleModal} body={bodyModal} ok={() => setOpenModal(false)} close={() => { setOpenModal(false) }} />
                    : null
            }
        </div>
    );
};
