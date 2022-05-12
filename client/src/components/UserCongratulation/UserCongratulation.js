import React, { useState, useEffect } from "react";

import '../menu/menu.css';
import html2canvas from 'html2canvas'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import Menu from "../menu/menu";
import edit from './edit.png'
import download from './download.png'
import { setAllWallpapers } from '../../redux/actions/fetchDataActions'


function UserCongratulation(props) {
    const history = useHistory();
    let j = 0;
    let rows = [];
    let wallpaper = [];
    const [show, setShow] = useState(false);
    const [wall, setWall] = useState([]);
    const [con, setCon] = useState([])

    useEffect(() => {
        if (props.myUser.email && props.myUser.email !== "") {
            setShow(true);
            let i = 1;
            for (let index = 0; index < 12; index++) {
                wallpaper.push({ url: "./../private/" + i + ".png" });
                i++;
            }
            props.setAllWallpapers(wallpaper);
            shortCon(props.myUser.congratulation)
            setWall(wallpaper)
        }
    }, [])

    function setJ() {
        if (j < wall.length - 1) j++;
        else j = 0;
    }
    
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
        setCon(congratulation)
    }
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }

    function DownloadAsImage(ev) {
        if (ev.target.dataset.index) {
            var name = wall[ev.target.dataset.index].url;
            var element = document.querySelectorAll(".con")[ev.target.dataset.index];
            html2canvas(element).then(function (canvas) {
                var myImage = canvas.toDataURL();
                downloadURI(myImage, name);
            });
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            {
                show ?
                    <div>
                        <div className='row newCon my-5'>
                            <span className="newsText newsTextLarge">אזור אישי</span>
                        </div>

                        <div className="row allSub">
                            {wall && wall.length > 0 ?
                                props.myUser.congratulation.forEach((element,index) => {
                                    rows.push(
                                        <div className='col con' key={element._id}>
                                            <img className='conImgSubCategory' src={(wall[j].url)} alt="" />
                                            <div className='centered smallWidth centerT'>
                                                <strong className="line-break">{element.title}</strong><br />
                                                <span className="line-break">{con[index]}</span>
                                            </div>
                                            <div className="marginB">
                                                <img className="p-2 cursor" alt="" src={edit} onClick={() => { history.push({ pathname: '/picture', category: props.location.category, subCategory: props.location.subCategory, title: element.title, content: element.content, public: false }); }} />
                                                <img className="p-2 cursor" alt="" data-index={j} src={download} onClick={(e) => { DownloadAsImage(e) }} />
                                            </div>
                                            {setJ()}
                                        </div>
                                    )
                                }) :
                                <div className="demo">
                                    <div id="demo-content">
                                        <div id="loader-wrapper">
                                            <div id="loader" className="top-loader"></div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {rows}
                        </div>
                    </div>
                    :
                    <div className='content'>
                        <span id='title' className='px-5'>
                            גולש יקר!<br />
                            כדי לצפות בברכות <br />
                            שבאיזור האישי<br />
                            יש להתחבר קודם<br />
                        </span>
                        <button className='login-button my-5' onClick={() => history.push("./login")}>
                            <span className='login-text'>להתחברות</span>
                        </button>
                    </div>
            }
            <div className='row py-5'></div>
            <div className='row py-4'></div>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            myUser: state.userReducer.user,
            allWallpapers: state.fetchDataReducer.allWallpapers,
        }
    },
    (dispatch) => {
        return {
            setAllWallpapers: (wallpapers) => dispatch(setAllWallpapers(wallpapers)),
        }
    }
)(UserCongratulation);