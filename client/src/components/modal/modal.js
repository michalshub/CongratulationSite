import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

export default function Modal1(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        props.close()
    };
    const ok = () => {
        props.ok();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ direction: "rtl" }}>
                <Modal.Header >
                    <Modal.Title>{props.title}</Modal.Title>
                    <IoMdClose onClick={handleClose} style={{ fontSize: "1.7rem", color: "gray" }} />
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ok}>אישור</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

