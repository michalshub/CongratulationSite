import React, { useState, useEffect } from 'react';
import Modal1 from '../modal/modal';
import AddCongratulation from '../AddCongratulation/AddCongratulation';
import '../menu/menu.css';
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import deleteImg from './delete.png'
import edit from './edit.png'
import add from './add.png'


export default function UpdateCongratulation(props) {

    const [subCategorySelect, setSubCategorySelect] = useState({});
    const [titleModal, setTitleModal] = useState("");
    const [bodyModal, setBodyModal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openModalRes, setOpenModalRes] = useState(false);

    const [conId, setConId] = useState("");
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    let rows = [];
    let length = 0;
    let j = 0;

    useEffect(() => {
        setSubCategorySelect(props.subCategorySelect);
    }, [])
    function setJ() {
        if (j < length - 1) j++;
        else j = 0;
    }

    function ok() {
        setOpenModal(false)
        if (conId !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };
            fetch(`http://localhost:3400/deleteCongratulationById/${conId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setTitleModal("מחיקת ברכה");
                    setBodyModal("הברכה נמחקה בהצלחה");
                    setOpenModalRes(true);
                    props.refresh()

                })
                .catch(error => {
                    setTitleModal("מחיקת ברכה");
                    setBodyModal("המחיקה נכשלה");
                    setOpenModalRes(true);
                    console.log('error', error)
                });
        }

    }

    function updateCongratulation() {
        if (title !== "" && content !== "" && conId !== "") {
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
            fetch(`http://localhost:3400/updateCongratulationById/${conId}`, requestOptions)
                .then(response => {
                    response.text()
                }).then(() => {
                    setShow(false)
                    props.refresh()
                })
                .catch(error => {
                    setShow(false)
                    console.log('error', error)
                });
        }
    }
    const setLength = () => {
        length = subCategorySelect.wallpapers.length
    }

    return (
        <div className="row">

            <div className="row" style={{ margin: "auto" }}>
                {
                    subCategorySelect.congratulation && subCategorySelect.wallpapers.length > 0 ?
                        subCategorySelect.congratulation.forEach((item, index) => {
                            rows.push(
                                <div className="col con" key={index}>
                                    {subCategorySelect.wallpapers ?
                                        <img className="conImgSubCategory" src={(subCategorySelect.wallpapers[j].url)} alt="card image2" style={{ opacity: "0.7" }} />
                                        : <img className="conImgSubCategory" src='' alt="card" style={{ opacity: "0.7" }} />
                                    }
                                    <div className='centered smallWidth centerT overflow'>
                                        <strong className="line-break">{item.title}</strong><br />
                                        <span className="line-break">{item.content}</span>
                                    </div>
                                    <div className="marginB">
                                        <img className="p-2 cursor" alt="" data-index={j} src={edit} onClick={() => { setTitle(item.title); setContent(item.content); setConId(item._id); setShow(true) }} />

                                        <img className="p-2 cursor" src={deleteImg} alt="" onClick={() => {
                                            setTitleModal("מחיקת ברכה");
                                            setBodyModal("האם אתה בטוח שברצונך למחוק את הברכה?");
                                            setOpenModal(true);
                                            setConId(item._id)
                                        }} />
                                    </div>

                                    {setLength()}
                                    {setJ()}
                                </div>
                            )
                        })
                        : null
                }
                {rows}
                {
                    openModal && titleModal !== "" ?
                        <Modal1 title={titleModal} body={bodyModal} ok={ok} close={() => { setOpenModal(false) }} />
                        : null
                }
                {
                    openModalRes && titleModal !== "" ?
                        <Modal1 title={titleModal} body={bodyModal} ok={() => setOpenModalRes(false)} close={() => { setOpenModalRes(false) }} />
                        : null
                }
                {show ?
                    <Modal show={show} onHide={() => { setShow(false) }} style={{ direction: "rtl" }}>
                        <Modal.Header >
                            <Modal.Title>עריכת ברכה</Modal.Title>
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
            </div>

            {subCategorySelect._id ?
                <div className="row" style={{ margin: "auto" }}>
                    <div className="centerElement">
                        <img className="p-2" src={edit} alt="" />
                    </div>
                    <div className='row newCon pictureTitle my-4'>
                        <span className="newsText newsTextLarge pink"> הוספת ברכה &nbsp;
                            <img src={add} alt="" /></span>
                    </div>
                    {setLength()}
                    {length > 0 ?
                        <>
                            <AddCongratulation subCategoryId={subCategorySelect._id} refresh={() => props.refresh()} />
                        </>
                        :
                        <b className="side" style={{ color: "red" }}>כדי להוסיף ברכה, יש להוסיף רקע מהמחשב תחילה</b>
                    }
                </div>
                : null
            }
        </div>
    );
}