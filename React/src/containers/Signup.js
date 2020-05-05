import React, { Component } from "react";
import SignupForm from "../components/auth/SignupForm";

// 회원가입할 때 사용하는 컴포넌트
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      username_err_message:"",
      password: "",
      password_err_message:"",
      password_val: "",
      password_val_err_message:"",
      email: "",
      email_err_message:"",
      phone: "",
      phone_err_message:"",
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  
  validate(id) { //여기서 회원가입 필드들의 유효성 확인. 아이디 8자 이상, 비밀번호 8자 이상 15자 이하, 비밀번호와 비밀번호 확인필드 동일해야함.
    //return (username && username.length >= 8) && (password) && (password==password_val);
    let val = true;
    const idPasswordTest=/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const emailTest=/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    const phoneNumberTest = /^\d{3}-\d{3,4}-\d{4}$/;
    
    if(id=='username'){
      console.log(this.state.username);
      if(!this.state.username||!idPasswordTest.test(this.state.username)) val=false;
    }
    else if(id=='password'){
      if(!this.state.password||!idPasswordTest.test(this.state.password)) val=false;
    }
    else if(id=='password_val'){
      if(!this.state.password_val||this.state.password!=this.state.password_val) val=false;
    }
    else if(id=='email'){
      if(!this.state.email||!emailTest.test(this.state.email)) val=false;
    }
    else if(id=='phone'){
      if(this.state.phone&&!phoneNumberTest.test(this.state.phone)) val=false;
    }
    return val;
  }

  validateForm(username, password, password_val, email, phone) {
    let val = true;
    const idPasswordTest=/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const emailTest=/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    const phoneNumberTest = /^\d{3}-\d{3,4}-\d{4}$/;
    if(!username||!idPasswordTest.test(username)) val=false;
    if(!password||!idPasswordTest.test(password)) val=false;
    if(!password_val||password!=password_val) val=false;
    if(!email||!emailTest.test(email)) val=false;
    if(phone&&!phoneNumberTest.test(phone)) val=false;
    return val;
  }

  handleChange(event){
    event.persist();
    let target="";
    let target_err_message="";
    if(event.target.id=='username'){
      target="username_err_message";
      target_err_message="8자 이상 15자 이하의 숫자, 영문자를 포함한 값으로 입력해주세요.";
    }
    else if(event.target.id=='password'){
      target='password_err_message';
      target_err_message="8자 이상 15자 이하의 숫자, 영문자를 포함한 값으로 입력해주세요.";
    }
    else if(event.target.id=='password_val'){
      target='password_val_err_message';
      target_err_message="비밀번호가 일치하지 않습니다.";
    }
    else if(event.target.id=='email'){
      target='email_err_message';
      target_err_message="이메일 형식을 확인해주세요.";
    }
    else if(event.target.id=='phone'){
      target='phone_err_message';
      target_err_message="다음과 같은 형태로 입력해주세요. 010-XXXX-XXXX";
    }

    this.setState({
      [event.target.id]: event.target.value //SignupForm.js에서 정해놓은 input id값 및 value값
    }, ()=> {
      if(!this.validate(event.target.id)){
        this.setState({
          [target]: target_err_message  //대괄호에 문자열을 넣으면 해당 문자열로 state를 업데이트 할 수 있음.
        }); 
      }
      else{
        this.setState({
          [target]: ""
        });
      }
    }
    );
  }

  async handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone_num: this.state.phone,
      social_auth: "",
      is_mail_authenticated: false,
    };
    
    console.log("data : " + JSON.stringify(data))
    submitEvent.preventDefault();

    let handleErrors = response => {
      if (response.hasOwnProperty('username')) {
        throw Error("이미 존재하는 아이디입니다.");
      }
      else if(response.hasOwnProperty('email')){
        throw Error("이미 존재하는 이메일입니다.");
      }
      return response;
    }

    fetch('http://localhost/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(handleErrors)
    .then(json => {
      console.log(json);
      if (json.user.username) {
        console.log("회원가입 완료!");
        this.props.userHasAuthenticated(true, false, json.user.username, json.user.email); //회원가입 하고 바로 로그인 상태로 바뀌게 하고 싶을 때 사용
        let mailPage = response => {
          console.log(response);
          this.props.history.push('/mail-resend');
          return response;
        }
    
        let loginData={
          username: this.state.username,
          password: this.state.password
        }
        // 서버로부터 새로운 access token 발급받음
        fetch('http://localhost/api/jwt-login', {
          //보통 fetch는 쿠키를 보내거나 받지 않는다. 쿠키를 전송하거나 받기 위해서는 credentials 옵션을 반드시 설정해야 한다.
          method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials : 'include', //서버에 실을 때 수정
            body: JSON.stringify(loginData)
          })
        .then(res => res.json())
        .then(mailPage)
      }
    }).catch(error => alert(error));
  }

  render() {
    return (
      <SignupForm
        username={this.state.username}
        username_err_message={this.state.username_err_message}
        password={this.state.password}
        password_err_message={this.state.password_err_message}
        password_val={this.state.password_val} //비밀번호 확인 필드를 위해 추가
        password_val_err_message={this.state.password_val_err_message}
        email={this.state.email}
        email_err_message={this.state.email_err_message}
        phone={this.state.phone}
        phone_err_message={this.state.phone_err_message}
        handleChangeUsername={e => this.handleChange(e)}
        handleChangePassword={e => this.handleChange(e)}
        handleChangePassword_val={e => this.handleChange(e)}
        handleChangeEmail={e => this.handleChange(e)}
        handleChangePhone={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        validate={this.validateForm}
      />
    );
  }
}