import React, { useState, useEffect } from "react";

import '../menu/menu.css';
import { IoIosArrowBack } from 'react-icons/io';
import html2canvas from 'html2canvas'
import { useHistory } from 'react-router-dom';
import '../desine.css';
import { connect } from 'react-redux'
import Menu from "../menu/menu";
import './subCategory.css'
import edit from './edit.png'
import download from './download.png'

function SubCategory(props) {
    const history = useHistory();
    const [wall, setWall] = useState([])
    const [con, setCon] = useState([])
    const [conCopy, setConCopy] = useState([])
    let j = 0;
    let rows = [];
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (props.location.subCategory === undefined) {
            history.push("./categories")
        }
        else {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            fetch(`http://localhost:3400/getSubCategoriesByCategoryName/${props.location.subCategory.name}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    setCon(response.subcategories.congratulation);
                    shortCon(response.subcategories.congratulation)
                    setWall(response.subcategories.wallpapers);
                    setShow(true)
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
    }, [])

    function shortCon(con) {
        let congratulation = []
        for (let i = 0; i < con.length; i++) {
            let rows = con[i].content.split("\n");
            let content = ""
            if (rows.length > 10) {
                for (let j = 0; j < 8; j++) {
                    if (j != 7)
                        content += rows[j] + " \n";
                    else
                        content += rows[j] + "...";
                }
                congratulation[i] = content;
            }
            else
                congratulation[i] = con[i].content;

        }
        setConCopy(congratulation)
    }

    function setJ() {
        if (j < wall.length - 1) j++;
        else j = 0;
    }
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }

    function DownloadAsImage(ev) {
        var name = "picture.jpg";
        var element = document.querySelectorAll(".imgToDownload")[ev.target.dataset.index];

        html2canvas(element).then(function (canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, name);
        });
    }

    return (
        show ?
            <div id='pageHome' className='not-scroll'>
                <Menu />
                <div className='row newCon my-5'>
                    <span className="newsText newsTextLarge">{props.location.subCategory.name}</span>
                    <span className="newsText newsTextSmall"><span className="cat" onClick={() => { history.push('/categories') }}>{props.location.category}</span>
                        <IoIosArrowBack className="mx-1" />{props.location.subCategory.name}</span>
                </div>
                <div>
                    <div className="row allSub">
                        {
                            con.forEach((element, index) => {
                                rows.push(
                                    <div className='col con' key={element._id}>
                                        <div className="imgToDownload">
                                            <img className='conImgSubCategory' src={(wall[j].url)} alt="" />
                                            <div className='centered smallWidth centerT'>
                                                <strong className="line-break">{element.title}</strong><br />
                                                <span className="line-break">{conCopy[index]}</span>
                                            </div>
                                        </div>

                                        <div className="marginB">
                                            <img alt="" className="p-2 cursor" src={edit} onClick={() => { history.push({ pathname: '/picture', category: props.location.category, subCategory: props.location.subCategory, title: element.title, content: element.content, public: true }); }} />
                                            <img alt="" className="p-2 cursor" data-index={j} src={download} onClick={(e) => { DownloadAsImage(e) }} />
                                        </div>
                                        {setJ()}
                                    </div>

                                )
                            })

                        }
                        {rows}
                    </div>
                    <div className='row py-5'></div>
                    <div className='row py-5'></div>

                </div>
            </div>
            :
            <div id='pageHome' className='not-scroll'>
                <Menu />
                <div className="demo">
                    <div id="demo-content">
                        <div id="loader-wrapper">
                            <div id="loader"></div>
                        </div>
                    </div>
                </div>
                <div className='row py-5'></div>
                <div className='row py-5'></div>
                <div className='row py-5'></div>
                <div className='row py-5'></div>
                <div className='row py-5'></div>

            </div>
    )
}



export default connect(
)(SubCategory);

