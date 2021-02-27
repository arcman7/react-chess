import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, setUserInfo } from './usersSlice'
import { accountService } from './facebook/account.service'

export const FacebookLogin = ({ /*history*/ }) => {
  const dispatch = useDispatch()
    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.accountValue) {
            // history.push('/');
            dispatch(setUserInfo(accountService.accountValue))
        }        
    }, [/*history*/])


    const style = {
      backgroundColor: '#3B5998',
      color: 'white',
      border: '2px solid white',
      borderRadius: '5px',
      borderStyle: 'outset',
      font: '14px "Century Gothic", Futura, sans-serif',
      padding: '8px 6px',
      display: 'inline-block',
      textAlign: 'center',
      alignItems: 'flex-start',
      cursor: 'pointer',
    }

    return (
      <div className="facebook-login-wrapper"
        style={{
          backgroundColor: 'white',
          display: 'inline-block',
          borderRadius: '3px',
        }}>
        <button className="facebook-login"
          style={style}
          onClick={async() => {
            await dispatch(userLogin(accountService.login))
          }}>
            Login with Facebook
        </button>
      </div>
    )
}
