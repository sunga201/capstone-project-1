import React, { Component } from 'react';
import MailResendForm from "../components/LoginComponents/MailResendForm"
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class MailResend extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            nickname: this.props.nickname,
            state: this.props.nickname,
            email : this.props.useremail,
        };
        this.resendAuthEmail=this.resendAuthEmail.bind(this);
    }
    
    async resendAuthEmail(e){
        e.preventDefault();
        this.props.toggleLoadingState();

        const option = {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        
        axios.get(`${window.location.origin}/api/send-auth-email`, option)
        .then(this.props.errorCheck)
        .then(content=>{
            content=content.data;
            this.props.toggleLoadingState();
        })
        .catch(e=>{
            this.props.notify(e);
            this.props.toggleLoadingState();
        });
    }

    render(){     
        return(
            <div>
            { this.state && this.state.username!="" && this.state.email!=""&&
                <MailResendForm
                username={this.state.username}
                nickname={this.state.nickname}
                email={this.state.email}
                resendAuthEmail={this.resendAuthEmail}
                isLoading={this.props.isLoading}
                logout={this.props.logout}
            />
            }
            </div>
        );
    }
}

export default withRouter(MailResend);
