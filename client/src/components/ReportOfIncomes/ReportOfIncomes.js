import React, { useEffect, useState } from "react";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import { FiDownload } from "react-icons/fi";
import ManagerNavBar from '../ManagerNavBar/ManagerNavBar'

import '../menu/menu.css';

export default function ReportOfIncomes(props) {
    const [allusers, setAllusers] = useState([{}]);
    const [b, setB] = useState(false);

    let rows = []
    let rows2 = []
    let sumIncomes = 0;
    let numPage;
    let j = 0;
    useEffect(() => {
        getAllUsers()
    }, [])
    function pluseNumPage() {
        if (!numPage)
            numPage = 0
        numPage++
    }
    function resetNumPage() {
        numPage = 0;
    }

    function getAllUsers() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:3400/getUsersWithCons`, requestOptions)
            .then(response =>
                response.json()
            )
            .then(response => {
                setAllusers(response);

            })
            .catch(error =>
                console.log('error', error)
            );
    }
    function download() {

        setB(true)

        setTimeout(() => {
            const input = document.getElementById('divToPrint2');
            const inputHeight = input.clientHeight;
            const inputWidth = input.clientWidth;
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
            const pdf = new jsPDF(orientation, unit, size);
            let height = pdf.internal.pageSize.height + 5;
            let pageHeightInPixels = inputHeight;
            let pages = pageHeightInPixels / height;

            const roundOff = Number(pages.toString().split('.')[1].substring(0, 1));
            const pageNo = (roundOff > 0 ? pages + 1 : pages);
            let pageCount = pages < 1 ? 1 : Math.trunc(pageNo);

            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    for (let i = 1; i <= pageCount; i++) {
                        let pdfStartingHeight = height * (i - 1);
                        pdf.addImage(imgData, 'PNG', 0, -pdfStartingHeight, inputWidth * 0.8, inputHeight * 0.8);
                        if (i < pageCount) {
                            pdf.addPage();
                        }
                    }
                    pdf.save("download.pdf");
                    setB(false)
                });
        }, 1000)

    }
    function addTitle(i) {
        if (i % 15 === 0) {
            j++;
            rows2.push(
                <tr className="tr-download my-5 py-5 spacer" key={"titleToAdd" + j}>
                    <th style={{paddingTop: "20px"}} scope="col" key={"titleToAdd" + j + "1"}></th>
                    <th style={{paddingTop: "20px"}}  scope="col" key={"titleToAdd" + j + "2"}>שם</th>
                    <th style={{paddingTop: "20px"}}  scope="col" key={"titleToAdd" + j + "3"}>מייל</th>
                    <th style={{paddingTop: "20px"}}  scope="col" key={"titleToAdd" + j + "4"}>כמות ברכות</th>
                    <th style={{paddingTop: "20px"}}  scope="col" key={"titleToAdd" + j + "5"}>סה"כ לתשלום</th>
                </tr>
            )
        }
    }

    return (
        <div id='pageHome' className='not-scroll'>
            <ManagerNavBar />
            <div>
                <FiDownload className="downloadIcon m-5" onClick={() => { download() }} />
            </div>
            <div id="divToPrint" className="container my-5 real-w">
                <table className="table">
                    {allusers ?
                        <tbody key="tbody2">
                            <tr className="tableTitle" key="trTitle">
                                <th className="smallTitle pink" key="trTitle1" scope="col"></th>
                                <th className="smallTitle pink" key="trTitle2" scope="col">שם</th>
                                <th className="smallTitle pink" key="trTitle3" scope="col">מייל</th>
                                <th className="smallTitle pink" key="trTitle4" scope="col">כמות ברכות</th>
                                <th className="smallTitle pink" key="trTitle5" scope="col">סה"כ לתשלום</th>
                            </tr>

                            {
                                allusers.forEach((element, index) => {

                                    if (element.congratulation?.length > 0) {
                                        pluseNumPage()
                                        rows.push(
                                            <tr className="elemClass tr-h" key={"elemClass" + index}>
                                                <th className="smallTitle lh-3 pink" key={"elemClass" + index + "1"} scope="row">{index + 1}</th>
                                                <td className="smallTitle lh-3" key={"elemClass" + index + "2"} >{element.name}</td>
                                                <td className="smallTitle lh-3" key={"elemClass" + index + "3"} >{element.email}</td>
                                                <td className="smallTitle lh-3" key={"elemClass" + index + "4"} >{element.congratulation.length}</td>
                                                <td className="smallTitle lh-3" key={"elemClass" + index + "5"} >{element.congratulation.length * 2.5} ש"ח</td>
                                            </tr>

                                        )
                                        sumIncomes += element.congratulation.length * 2.5;
                                    }

                                })
                            }
                            {rows}

                        </tbody>
                        : null
                    }

                </table>
                <p className="smallTitle centerText">סה"כ הכנסות: {sumIncomes} ש"ח</p>
            </div>
            {b ?
                <div id="divToPrint2" className="my-5 download-w">
                    <table className="table">
                        {allusers ?
                            <tbody key="tbody1">
                                {
                                    allusers.forEach((element, index) => {
                                        resetNumPage()
                                        if (element.congratulation?.length > 0) {
                                            pluseNumPage()
                                            addTitle(index)
                                            rows2.push(
                                                <tr className="elemClass tr-h" key={"elemClassToPrint" + index}>
                                                    <th className="lh-3" key={"elemClassToPrint" + index + "1"} scope="row">{index + 1}</th>
                                                    <td className="lh-3" key={"elemClassToPrint" + index + "2"} >{element.name}</td>
                                                    <td className="lh-3" key={"elemClassToPrint" + index + "3"} >{element.email}</td>
                                                    <td className="lh-3" key={"elemClassToPrint" + index + "4"} >{element.congratulation.length}</td>
                                                    <td className="lh-3" key={"elemClassToPrint" + index + "5"} >{element.congratulation.length * 2.5} ש"ח</td>
                                                </tr>
                                            )
                                        }
                                    })

                                }
                                {rows2}
                            </tbody>
                            : null
                        }

                    </table>
                    <p className="centerText">סה"כ הכנסות: {sumIncomes} ש"ח</p>
                </div>
                : null
            }
        </div>
    )
}

