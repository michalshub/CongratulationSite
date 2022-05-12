import React, { useState } from 'react';
import Modal1 from '../modal/modal';
import './addCongratulation.css'
import pluse from './pluse.png'

export default function AddCongratulation(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");

    function ok() {
        setOpenModal(false)
        setTitle("")
        setContent("")
    }
    function close() {
        setOpenModal(false)
    }



    function AddCongratulation() {
        if (title !== "" && content !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "title": title,
                "content": content
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            fetch(`http://localhost:3400/createCongratulation/${props.subCategoryId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setTitleModal("הוספת ברכה")
                    setBodyModal("הברכה נוספה בהצלחה")
                    setOpenModal(true)
                    props.refresh()

                })
                .catch(error => {
                    setTitleModal("הוספת ברכה")
                    setBodyModal("ההוספה נכשלה")
                    console.log('error', error)
                });
        }
    }

    return (
        <div>

            <input onChange={(e) => setTitle(e.target.value)} className="row newCon titleCon" type="text" name="title" value={title} placeholder='כותרת' />
            <textarea onChange={(e) => setContent(e.target.value)} name="content" as="textarea"
                className="row newCon titleCon contentCon my-3" type="text" value={content} placeholder='תוכן הברכה' />

            <button onClick={() => { AddCongratulation(); setOpenModal(true) }} className='login-button buttons my-4'>
                <span className='login-text'>
                    <img className="addImg" src={pluse} alt=""/>
                    הוסף
                </span>
            </button>
            {
                openModal && titleModal !== "" ?
                    <Modal1 title={titleModal} body={bodyModal} ok={ok} close={close} />
                    : null
            }

        </div>
    );
}