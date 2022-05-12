import React, { useState, useEffect } from 'react';
import "./home.css"
import Menu from '../menu/menu';
import home from './home.png';
import step1 from './step1.png';
import step2 from './step2.png';
import step3 from './step3.png';
import i1 from './i1.png';
import i2 from './i2.png';
import i3 from './i3.png';
import Carousel from 'react-bootstrap/Carousel';


export default function Home(props) {
    const [con, setCon] = useState([]);

    useEffect(() => {
        getLastCon();
    }, [])
    function getLastCon() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/getLastCongratulations`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setCon(response.congratulations)
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    return (
        <div id='pageHome' className='not-scroll'>

            <Menu />

            <div className='row'>
                <div className='col'>
                    <div className='row mx-5 p-5 homeTitle'><span className='homeText'>ברכות ואיחולים <br /> בעיצובים מדהימים <br /> לכל זמן ולכל יעד</span></div>
                    <div className='row home-button homeTitle'>
                        <a href='categories' className='login-text take_me'>קחו אותי לשם</a>
                    </div>
                </div>
                <div className='col'>
                    <img className='homeCon' src={home} alt=""></img>
                </div>
            </div>
            <div className='row my-5'>
                <div className='row howWork'>
                    <span className='textHowWork'>איך זה עובד?</span>
                </div>
                <div className='row'></div>
            </div>
            <div className='row'>
                <div className='col steps'>
                    <img className='imgSteps my-5' src={step1} alt="" />
                    <span className="step">בחירת הברכה הרצויה</span>
                    <img className='imgSteps my-2' src={i1} alt="" />

                </div>
                <div className='col steps'>
                    <img className='imgSteps my-5' src={step2} alt="" />
                    <span className="step">עיצוב בטעם אישי</span>
                    <img className='imgSteps my-2' src={i2} alt="" />

                </div>
                <div className='col steps'>
                    <img className='imgSteps my-5' src={step3} alt="" />
                    <span className="step">הורדת הברכה למחשב שלך</span>
                    <img className='imgSteps my-2' src={i3} alt="" />
                </div>
            </div>
            <div className='row newCon my-5'>
                <span className="newsText">חדש באתר</span>
            </div>


            <div className='row'>
                {
                    con.length > 8 ?
                        <Carousel className='mb-5'>

                            <Carousel.Item>
                                <div style={{ display: "flex" }}>
                                    <div className='col'></div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/1.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[0].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/2.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[1].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/3.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[2].content}</div>
                                    </div>
                                    <div className='col'></div>
                                </div>

                            </Carousel.Item>
                            <Carousel.Item>
                                <div style={{ display: "flex" }}>
                                    <div className='col'></div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/4.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[3].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/5.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[4].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/6.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[5].content}</div>
                                    </div>
                                    <div className='col'></div>
                                </div>

                            </Carousel.Item>
                            <Carousel.Item>
                                <div style={{ display: "flex" }}>
                                    <div className='col'></div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/3.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[6].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/8.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[7].content}</div>
                                    </div>
                                    <div className='col con'>
                                        <img className='conImg heightImg' src="./../private/9.png" alt="" />
                                        <div className='line-break centered smallWidthToHomePage smallOverflow'>{con[8].content}</div>
                                    </div>
                                    <div className='col'></div>
                                </div>


                            </Carousel.Item>
                        </Carousel>

                        : null
                }

            </div>
            <div className='row py-5'></div>
        </div>
    )
}



