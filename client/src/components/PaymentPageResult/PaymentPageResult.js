

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserName, setUserPassword, setUserMail, setUserToken, setUserCongratulation } from '../../redux/actions/userActions'
import { setAllWallpapers } from '../../redux/actions/fetchDataActions'
import Menu from '../menu/menu';

export function PaymentPageResult(props) {

    const [msg, setMsg] = useState("");
    const { pcDetails } = props
    const history = useHistory();

    useEffect(() => {
        history.push('./paymentPageResult')
        let flag = false;
        loginUser({ name: window.localStorage.getItem("userName"), password: window.localStorage.getItem("userPassword") })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch(`http://localhost:3400/paymentgetResult`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setMsg(response.message)
                if (response.message === "העסקה אושרה" || response.message === "הפעולה בוצעה בהצלחה") {
                    submitRequest();
                    flag = true;
                    setTimeout(() => { history.push("/privateCongratulation") }, 7000)
                }
                else {
                    flag = true;
                    setTimeout(() => { history.push("/") }, 7000)
                }
            })
            .catch(error => console.log('error', error));
        if (!flag) {
            setMsg("הפעולה בוטלה")
            setTimeout(() => { history.push("/") }, 7000)
        }

    }, [])

    const submitRequest = async () => {
        const response = await fetch("http://localhost:3400/sendMail", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ to: 'CongratulationsWebsite@gmail.com', sub: "ברכה אישית", txt: " ברכה למייל: " + window.localStorage.getItem('email') + "\n נושא: " + window.localStorage.getItem('subject') + "\n הערות: " + window.localStorage.getItem('note') + "\n מין: " + window.localStorage.getItem('picked') })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");
        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }
    };

    function loginUser(values) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`http://localhost:3400/login/${values.name}/${values.password}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.messege) {
                    props.setUserName(response.user.name);
                    props.setUserPassword(response.user.password);
                    props.setUserMail(response.user.email);
                    props.setUserCongratulation(response.user.congratulation);
                    props.setUserToken(response.token)
                    getAllWallpapers();
                }
            })
            .catch(error => console.log('error', error));
    }

    function getAllWallpapers() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/getAllWallpaper`, requestOptions)
            .then(response => response.json())
            .then(response => {
                props.setAllWallpapers(response.wallpapers);
                console.log(props.allWallpapers);
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            <div className='content' style={{height:"300px"}}>
                <span id='title' className='px-5'>{msg}</span>
            </div>
            <div className='row py-5'></div>
            <div className='row py-5'></div>

        </div>
    )
}


export default connect(
    (state) => {
        return {
            pcDetails: state.fetchDataReducer.privteCongratulationDetails
        }
    },
    (dispatch) => {
        return {
            setUserName: (name) => dispatch(setUserName(name)),
            setUserPassword: (pass) => dispatch(setUserPassword(pass)),
            setUserMail: (mail) => dispatch(setUserMail(mail)),
            setUserToken: (token) => dispatch(setUserToken(token)),
            setUserCongratulation: (congratulation) => dispatch(setUserCongratulation(congratulation)),
            setAllWallpapers: (wallpapers) => dispatch(setAllWallpapers(wallpapers)),
        }
    }
)(PaymentPageResult);