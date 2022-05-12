import React, { useState } from 'react';
import deleteImg from './delete.png'
import Modal1 from '../modal/modal';

export function DeleteWallpaper(props) {
    const { wall } = props;
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openModalRes, setOpenModalRes] = useState(false);

    function deleteWall(wallId) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/deleteWallpaperById/${wallId}`, requestOptions)
            .then(response => {
                response.text()
            }).then(() => {
                setTitleModal("מחיקת רקע");
                setBodyModal("הרקע נמחק בהצלחה");
                setOpenModalRes(true);
                props.refresh()
            })
            .catch(error => {
                setTitleModal("מחיקת רקע");
                setBodyModal("אירעה שגיאה");
                setOpenModalRes(true);
                console.log('error', error)
            });
    }

    return (
        <div>
            <div className="marginB">
                <img className="p-2 cursor" src={deleteImg} alt="" onClick={() => {
                    setTitleModal("מחיקת רקע");
                    setBodyModal("האם אתה בטוח שברצונך למחוק את הרקע?");
                    setOpenModal(true);
                }} />
            </div>
            {
                openModal && titleModal != "" ?
                    <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModal(false); deleteWall(wall._id) }} close={() => { setOpenModal(false) }} />
                    : null
            }
              {
                openModalRes && titleModal != "" ?
                    <Modal1 title={titleModal} body={bodyModal} ok={() => { setOpenModalRes(false); }} close={() => { setOpenModalRes(false) }} />
                    : null
            }
        </div>
    );
}
