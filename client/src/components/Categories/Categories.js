
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { setAllCategories } from '../../redux/actions/fetchDataActions';
import { useHistory } from 'react-router-dom';
import '../desine.css';
import "./categories.css"
import Menu from "../menu/menu";

function Categories(props) {
    const history = useHistory();
    useEffect(() => {
        getAllCategories();
}, [])
    const { allCategories, setAllCategories } = props;
    const [isOpened, setIsOpened] = useState(false)
    const [show, setShow] = useState(false)
    const [textOpened, setTextOpened] = useState('')
    let secound = 0;
    const [opacity, setOpacity] = useState(0);
    let rows = [];
    let rows2 = [];

    function setText(text) {
        setOpacity("0")
        if (textOpened === text && isOpened === true) {
            setTimeout(() => {
                setIsOpened(false);
            }, (secound - 1) * 300 + 1000)
        }
        else {
            setIsOpened(true);
            setTimeout(() => {
                setOpacity("1")
            }, 10
            )
        }
        setTextOpened(text);
    }
    function setSecound() {
        secound += 0.3;
    }
    function getAllCategories() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/getAllCategories`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setAllCategories(response.allCategories.sort(
                    (a, b) => a.name > b.name ? 1 : -1
                ));
                setShow(true);
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    return (
        <div id='pageHome' className='not-scroll'>
            <Menu />
            <div className='row newCon my-5'>
                <span className="newsText">קטגוריות</span>
            </div>
            {
                show ?
                    <>
                        <div>

                            <div className="row mx-4 bigBook">
                                {
                                    allCategories.forEach(element => {
                                        rows.push(
                                            <div className="col con" key={element._id}>
                                                <div onClick={() => { setText(element.name); }} className="categoryTitle">
                                                    <span>{element.name}</span>
                                                </div>
                                                {
                                                    isOpened === true && textOpened === element.name ?
                                                        <div>
                                                            {
                                                                element.subCategories.forEach(item => {
                                                                    rows2.push(
                                                                        <div key={item._id}>
                                                                            <div className="categoryContent my-1" style={{ opacity: opacity, transition: "opacity 1s " + secound + "s", marginBottom: "2%" }}
                                                                                onClick={() => {
                                                                                    history.push({ pathname: '/subCategory', category: element.name, subCategory: item });
                                                                                }}>
                                                                                <span>{item.name}</span>
                                                                            </div>
                                                                            {setSecound()}
                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                            {rows2}
                                                        </div>
                                                        : null
                                                }

                                            </div>
                                        )
                                    })
                                }
                                {rows}
                            </div>
                            <div className='row py-5'></div>
                        </div>
                    </>
                    :
                    <>
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

                    </>
            }
        </div>

    )
}

export default connect(
    (state) => {
        return {
            allCategories: state.fetchDataReducer.allCategories,
        }
    },
    (dispatch) => {
        return {
            setAllCategories: (categories) => dispatch(setAllCategories(categories)),
        }
    }
)(Categories);

