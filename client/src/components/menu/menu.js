import React from 'react';
import './menu2.css';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import phone from './phone.png';
import flower from './flower.png';
import home from './home.png';
import person from './person.png';
import picture from './picture.png';
import user from './user.png';

function Menu(props) {
    const { myUser } = props;
    const history = useHistory();
    return (
        <div className='py-5'>
            <div className='row page'>
                <div className='col-5 loginOrRegister'>
                    <div className='register' onClick={() => { history.push('/register'); }}>
                        <span>הרשמה</span>
                    </div>
                    <div className='login' onClick={() => { history.push('/login'); }}>
                        <span>התחברות</span>
                    </div>
                    <div className='person mx-5'>
                        <div><img src={person} alt="" /></div>
                        {myUser.name ?
                            <div><span >{myUser.name}</span></div>
                            :
                            <div><span >משתמש אנונימי</span></div>
                        }
                    </div>
                </div>
                <div className='col-7 menu-li'>
                    <div className='row'>
                        <div className='col item'>
                            <img src={home} alt="" />
                            <span className='home' onClick={() => { history.push('/home'); }}>בית</span>
                        </div>
                        <div className='col item'>
                            <img src={picture} alt="" />
                            <span className='home' onClick={() => { history.push('/categories'); }}>ברכות</span>
                        </div>
                        <div className='col item'>
                            <img src={user} alt="" />
                            <span className='home' onClick={() => { history.push('/userCongratulation'); }}>אזור אישי</span>
                        </div>
                        <div className='col item'>
                            <img src={flower} alt="" />
                            <span className='home' onClick={() => { history.push('/privateCongratulation'); }}>ברכה אישית</span>
                        </div>
                        <div className='col item'>
                            <img src={phone} alt="" />
                            <span className='home' onClick={() => { history.push('/contactus'); }}>צור קשר</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}



export default connect(
    (state) => {
        return {
            myUser: state.userReducer.user,
        }
    },
    (dispatch) => {
        return {}
    }
)(Menu);

