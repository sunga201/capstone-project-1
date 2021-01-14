import React, { Component } from 'react';
import MailValidationForm from "../components/LoginComponents/MailValidationForm"
import { withRouter } from 'react-router-dom';
import axios from 'axios';
class MailValidation extends Component{

    constructor(props){
        super(props);
        this.state={
            guideText: "",
            isValid: true,
        }

        this.toHome=this.toHome.bind(this);
    }

    componentDidMount(){
        let url=`${window.location.origin}/api/activate/${document.location.href.split("mail-validation/")[1]}`;
        let isErr=false;
     
        const option = {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios.get(url, option)
        .catch(error=>{
            if(error.response){
                this.setState({
                    guideText: "만료된 링크입니다.",
                    isValid: false
                });
                isErr=true;
            }
        })
        .then(content=>{
            content=content.data;
            if(!isErr){
                this.setState({
                    guideText: "메일 인증이 완료되었습니다. Moonge drive의 기능을 즐겨보세요!",
                });
                this.props.userStateChange(true,
                                           true,
                                           content.username, 
                                           content.nickname, 
                                           content.email, 
                                           content.rootDir
                                           );
            }
        });
    }

    toHome(){
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                <MailValidationForm
                    toHome={this.toHome}
                    guideText={this.state.guideText}
                    isValid={this.state.isValid}
                />
            </div>
        )
    }
}

export default withRouter(MailValidation);