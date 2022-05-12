import React, { useState, useEffect } from 'react';
import { FaFont } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa';
import { FaBold } from 'react-icons/fa';
import { FaItalic } from 'react-icons/fa';
import '../menu/menu.css';
import { Sketch } from '@uiw/react-color';
import { IoIosArrowBack } from 'react-icons/io';
import html2canvas from 'html2canvas'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Menu from '../menu/menu';
import './picture.css'
import edit from './edit.png'
import palette from './palette.png'
import download from './download.png'



function Picture(props) {
    const history = useHistory();
    const [hex, setHex] = useState("rgb(255, 0, 0)");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [fontSize, setFontSize] = useState(1.5)
    const [font, setFont] = useState("Segoe UI")
    const [underLine, setUnderLine] = useState(false)
    const [italic, setItalic] = useState(false)
    const [bold, setBold] = useState(false)
    const [mainPicture, setMainPicture] = useState();
    const [wallpapersBySubcategoryId, setWallpapersBySubcategoryId] = useState();
    const [content, setContent] = useState("");
    const [isWall, setIsWall] = useState(false);



    useEffect(() => {
        setIsWall(false);
        if (props.location.public === undefined) {
            history.push("./categories")
        }
        else {
            if (props.location.public) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                };
                fetch(`http://localhost:3400/getWallpaperBySubcategoryId/${props.location.subCategory._id}`, requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        setContent(props.location.content);
                        setWallpapersBySubcategoryId(response.wallpapers);
                        setMainPicture(response.wallpapers[0].url);
                        setIsWall(true);
                    })
                    .catch(error => console.log('error', error));
            }
            else {
                setContent(props.location.content);
                setWallpapersBySubcategoryId(props.allWallpapers);
                setMainPicture(props.allWallpapers[0].url);
                setIsWall(true);
            }
        }
    }, [])
    function reset() {
        setHex("rgb(255, 0, 0)");
        setFontSize(2);
        setFont("Segoe UI");
        setUnderLine(false);
        setItalic(false);
        setBold(false);
    }
    const options = [
        { label: 'Segoe UI', value: "'Segoe UI'" },
        { label: 'Amatic SC', value: "'Amatic SC', cursive" },
        { label: 'Bellefair', value: "'Bellefair', serif" },
        { label: 'David Libre', value: "'David Libre', serif" },
        { label: 'Noto Serif', value: "'Noto Serif Hebrew', serif" },
        { label: 'Open Sans', value: "'Open Sans', sans-serif" },
        { label: 'Rubik', value: "'Rubik', sans-serif" },
        { label: 'Rubik Beastly', value: "'Rubik Beastly', cursive" },
        { label: 'Tinos', value: "'Tinos', serif" }
    ]
    function setBigPicture(e) {
        setMainPicture(e.target.src)
    }
    let rows = [];

    function changeDisplayColorPicker(e) {
        setDisplayColorPicker(!displayColorPicker)
    }
    function changeDisplayColorPickerToFalse(e) {
        let flag = false;
        let a = e.target;
        while (a) {
            if (a.id === 'sketch') {
                flag = true;
                break;
            }
            a = a.parentNode;
        }
        if (displayColorPicker && !flag)
            setDisplayColorPicker(false)
    }

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }

    function DownloadAsImage(ev) {
        var e = document.getElementsByTagName('textarea')[0];
        var d = document.createElement('p');
        var text = e.value.replaceAll("\n", "<br>");
        d.innerHTML = text;
        d.style.fontSize = e.style.fontSize;
        d.style.color = e.style.color;
        d.style.textDecoration = e.style.textDecoration;
        d.style.fontStyle = e.style.fontStyle;
        d.style.fontWeight = e.style.fontWeight;
        d.style.fontFamily = e.style.fontFamily;
        d.style.padding = "calc(55% - 160px)";

        d.style.width = "25rem";
        d.style.opacity = "0.5";
        d.style.height = "35rem";
        d.classList.add('centerText');
        d.classList.add('conImgPicture');
        e.parentNode.replaceChild(d, e);
        var name = "picture.jpg";
        var element = document.querySelector(".pictureToDownload");
        html2canvas(element).then(function (canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, name);
        });
        let t = d.innerHTML.replaceAll("<br>", "\n");
        e.innerHTML = t;
        d.parentNode.replaceChild(e, d);
    }
    return (
        <div id='pageHome' className='not-scroll' onClick={changeDisplayColorPickerToFalse}>
            <Menu />
            <div className='row newCon pictureTitle my-5'>
                {props.location.public ?
                    <strong className="newsText newsTextLarge pink">{props.location.title}</strong> :
                    <span className="newsText newsTextLarge pink cursor" onClick={() => { history.push({ pathname: '/userCongratulation' }) }}>חזור</span>
                }
                {props.location.public ?
                    <span className="newsText newsTextSmall dark">
                        <span className="cat" onClick={() => { history.push('/categories') }}>{props.location.category}</span>
                        <IoIosArrowBack className="mx-1" />
                        <span className="cat" onClick={() => { history.push({ pathname: '/subCategory', category: props.location.category, subCategory: props.location.subCategory }) }}>{props.location.subCategory.name}</span>
                        <IoIosArrowBack className="mx-1" />{props.location.title}
                    </span> : null
                }
            </div>
            <div className="row">
                <div className="col steps">
                    <img className='imgSteps editIcon my-3' src={edit} alt="" />

                    <select
                        className='font my-2' style={{ width: "15%" }} value={font} onChange={(e) => { setFont(e.target.value); }} >
                        <option key="0" value="בחר גופן" className='selectFont'>בחר גופן</option>
                        {options.map((option, index) => (
                            <option key={index} id='op' className='selectFont' value={option.value}>{option.label}</option>
                        ))}
                    </select>


                    <div className='sizeFont'>
                        <FaFont id='fontIcon1' className='p-1 fontIcon' onClick={() => { setFontSize(1); }} />
                        <FaFont id='fontIcon2' className='p-1 fontIcon' onClick={() => { setFontSize(1.2); }} />
                        <FaFont id='fontIcon3' className='p-1 fontIcon' onClick={() => { setFontSize(1.5); }} />
                        <FaFont id='fontIcon4' className='p-1 fontIcon' onClick={() => { setFontSize(2); }} />
                    </div>
                    <div className='sizeFont'>
                        <FaFont className='p-1 fontIcon' onClick={changeDisplayColorPicker} style={{ color: hex }} />
                        {
                            displayColorPicker ?
                                <Sketch id="sketch" className='sketch' color={hex} onChange={(color) => { setHex(color.hex); }} />
                                : null
                        }
                        <FaUnderline onClick={() => { setUnderLine(!underLine); }} className='p-1 fontIcon' />
                        <FaBold onClick={() => { setBold(!bold); }} className='p-1 fontIcon' />
                        <FaItalic onClick={() => { setItalic(!italic); }} className='p-1 fontIcon' />
                    </div>
                    <img className='imgSteps my-3' src={palette} alt="" />
                    <div className='sizeFont'>
                        <div onClick={() => { setHex("#a9aae5") }} className='colors mx-1' id='color1'></div>
                        <div onClick={() => { setHex("#208567") }} className='colors mx-1' id='color2'></div>
                        <div onClick={() => { setHex("#c00808") }} className='colors mx-1' id='color3'></div>
                        <div onClick={() => { setHex("#5456c1") }} className='colors mx-1' id='color4'></div>
                    </div>
                    <div className='sizeFont'>
                        <div onClick={() => { setHex("#2a6806") }} className='colors mx-1' id='color5'></div>
                        <div onClick={() => { setHex("#99b80f") }} className='colors mx-1' id='color6'></div>
                        <div onClick={() => { setHex("#2a2b5e") }} className='colors mx-1' id='color7'></div>
                        <div onClick={() => { setHex("#06f6f6") }} className='colors mx-1' id='color8'></div>
                    </div>
                    <div className='sizeFont'>
                        <div onClick={() => { setHex("#fd0a84") }} className='colors mx-1' id='color9'></div>
                        <div onClick={() => { setHex("#000") }} className='colors mx-1' id='color10'></div>
                        <div onClick={() => { setHex("#e68f3f") }} className='colors mx-1' id='color11'></div>
                        <div onClick={() => { setHex("#ffffff") }} className='colors mx-1' id='color12'></div>
                    </div>
                    <div className='reset my-3' onClick={() => { reset() }}>
                        <span className='reset-text'>איפוס</span>
                    </div>
                </div>

                {isWall ?
                    <div className='col con pictureToDownload'>
                        <img className='conImgPicture' src={mainPicture} alt="" />
                        <div className='centered'>
                            <textarea id="txt" className="centerText conImgPicture"
                                onChange={(e) => {
                                    if (e.target.value.match(/^[\u0590-\u05FF!?@#$%^&*)(-}...{|+_=<>–,.;":'/0-9 \u000A-]+$/i)) {
                                        setContent(e.target.value)
                                        let t = document.querySelector("#txt")
                                        t.classList.add("centerText")
                                    }
                                }}
                                style={{
                                    resize: "none",
                                    fontSize: fontSize + "rem",
                                    color: hex,
                                    textDecoration: underLine ? "underline" : "none",
                                    fontStyle: italic ? "italic" : "normal",
                                    fontWeight: bold ? "bold" : "normal",
                                    fontFamily: font,
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                    padding: "calc(55% - 160px)"
                                }}
                                value={content}
                            >

                            </textarea>
                        </div>

                    </div>
                    :
                    <div className="conImgPicture">
                        <div className="demo">
                            <div id="demo-content">
                                <div id="loader-wrapper">
                                    <div id="loader" className="top-loader"></div>
                                </div>
                            </div>
                        </div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>
                        <div className='row py-5'></div>

                    </div>
                }
                <div className="col steps steps3">
                    <img className='down' src={download} alt="" />
                    <div className='reset download my-3' onClick={DownloadAsImage}>
                        <span className='download-text'>הורדה</span>
                    </div>
                </div>
            </div>
            <div className='row newCon my-5'>
                <span className="newsText newsTextLarge">רקעים לבחירה</span>
            </div>
            {wallpapersBySubcategoryId !== undefined ?
                <div className='row wall'>
                    {
                        wallpapersBySubcategoryId.forEach((element, index) => {
                            rows.push(
                                <div className='col con my-3' key={index}>
                                    <img onClick={setBigPicture} className='conImgSubCategory' src={element.url} alt="" />
                                </div>
                            )
                        })
                    }
                    {rows}
                </div>

                : null
            }
        </div >
    );
}

export default connect(
    (state) => {
        return {
            allWallpapers: state.fetchDataReducer.allWallpapers,
        }
    },
    (dispatch) => {
        return {

        }
    }
)(Picture);
