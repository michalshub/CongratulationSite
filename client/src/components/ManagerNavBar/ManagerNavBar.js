
import React from "react";
import '../menu/menu.css';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import './managerNavBar.css'

export default function NavBar() {
    const history = useHistory();

    return (
        <div className="row navMargin pt-4">
            <Dropdown align="end" className="col con" >
                <Dropdown.Toggle className="categoryTitle navTitle" id="dropdown-autoclose-inside">
                    <span>קטגוריות</span>
                    <IoIosArrowDown className="navBarArrow"/>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item className="categoryContent navbarContent navTitle" href="#" onClick={() => { history.push("/addCategory"); }}><span>הוספת קטגוריה</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle my-1" href="#" onClick={() => { history.push("/updateCategory"); }}><span>עריכת קטגוריה</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle mt-1" href="#" onClick={() => { history.push("/deleteCategory"); }}><span>מחיקת קטגוריה</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end" className="col con" >
                <Dropdown.Toggle id="dropdown-autoclose-inside" className="categoryTitle navTitle">
                    <span>תת קטגוריה</span>
                    <IoIosArrowDown className="navBarArrow"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="categoryContent navbarContent navTitle" href="#" onClick={() => { history.push("/addSubCategory"); }}><span>הוספת תת קטגוריה</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle my-1" href="#" onClick={() => { history.push("/updateSubCategory"); }}><span>עריכת תת קטגוריה</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle mt-1" href="#" onClick={() => { history.push("/deleteSubCategory"); }}><span>מחיקת תת קטגוריה</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end" className="col con" >
                <Dropdown.Toggle id="dropdown-autoclose-inside" className="categoryTitle navTitle">
                    <span>ברכה אישית</span>
                    <IoIosArrowDown className="navBarArrow"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="categoryContent navbarContent navTitle" href="#" onClick={() => { history.push("/addPrivateCongratulation"); }}><span>הוספת ברכה אישית</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle my-1" href="#" onClick={() => { history.push("/updatePrivateCongratulation"); }}><span>עריכת ברכה אישית</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle mt-1" href="#" onClick={() => { history.push("/deletePrivateCongratulation"); }}><span>מחיקת ברכה אישית</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            
            <Dropdown align="end" className="col con" >
                <Dropdown.Toggle id="dropdown-autoclose-inside" className="categoryTitle navTitle">
                    <span>דוחות מנהל</span>
                    <IoIosArrowDown className="navBarArrow"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="categoryContent navbarContent navTitle" href="#" onClick={() => { history.push("/reportOfUser"); }}><span>דו"ח משתמשים</span></Dropdown.Item>
                    <Dropdown.Item className="categoryContent navbarContent navTitle mt-1" href="#" onClick={() => { history.push("/reportOfIncomes"); }}><span>דו"ח הכנסות</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

