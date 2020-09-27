import React, {useEffect, useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import {Image} from "react-bootstrap"

import NETWORK from '../network'
import {SignInData} from "../models/login";
import labLogoSrc from "../assets/lab_logo.png"
import gLogoSrc from "../assets/g_normal.png"
import {LabLoader} from "../components/loader"
import {Footer} from '../components/footer'

import './login_view.scss'

interface RunsListProps {
    location: any
}


function LoginView(props: RunsListProps) {
    const clientID: any = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const [isClicked, setIsClicked] = useState(false)

    const params = new URLSearchParams(props.location.search)

    useEffect(() => {
        document.title = "Login"
    })

    function responseGoogle(response: any) {
        let data = {} as SignInData
        data.token = response.tokenObj.id_token
        data.type = 'google'

        NETWORK.sign_in(data).then((res) => {
            window.location.href = res.data.uri + params.get('redirect');
        })
    }

    function onRequest() {
        setIsClicked(true)
    }

    return <div>
        {isClicked ?
            <LabLoader isLoading={isClicked}/>
            :
            <div className={"login-view"}>
                <div className={"login-view-centre"}>
                    <Image src={labLogoSrc} thumbnail/>
                    <h1 className={"mt-3"}>LabML</h1>
                    <div className={"mt-5 mb-3"}>
                        <GoogleLogin
                            clientId={clientID}
                            render={renderProps => (
                                <a onClick={renderProps.onClick} className="customBtn" type='button'>
                                    <Image className={"icon"} src={gLogoSrc}/>
                                    <span className="buttonText ">Sign in with Google</span>
                                </a>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            onRequest={onRequest}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        }
    </div>
}

export default LoginView