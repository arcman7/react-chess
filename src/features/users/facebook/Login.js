import React, { useEffect } from 'react';

import { accountService } from './account.service';

function Login({ history }) {
    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.accountValue) {
            // history.push('/');
            console.log(accountService)
        }        
    }, [history]);

    return (
        <div className="col-md-6 offset-md-3 mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <button className="btn btn-facebook" onClick={accountService.login}>
                        <i className="fa fa-facebook mr-1"></i>
                        Login with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Login };