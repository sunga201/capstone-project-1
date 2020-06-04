import React, { Component, Fragment, forwardRef } from "react";
import UploadForm from "./UploadForm";
import Flow from '@flowjs/flow.js';
import CustomFileBrowser from './CustomFileBrowser'
import './UploadContent.css';
import {Button} from 'reactstrap';
//업로드
class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileID: "",
        fileList: [],
        uploadDir: '/',
        isSubmitted: false,
        isCompleted: true,
        flow: props.flow,
        isPathSet: false
    };
    this.myRef=React.createRef()
    this.props.setModalHeadText('업로드 경로 설정');
    console.log("upload content, props : ", props);
  }


  componentWillUnmount() {
    this.props.setFlow(this.state.flow);
  }

  showProcess=(array)=>{
    this.setState({
      isSubmitted: true,
      fileList: array
    });
  }

  changeUploadPath=(path)=>{ //업로드 경로 변경
    console.log('in upload, change path : ', path);
    this.setState({
      uploadDir: path
    })
  }

  componentDidMount=()=>{
    let target='http://localhost/api/upload/flow';
    if(!this.state.flow||!this.state.flow.isUploading()){
      this.state.flow=new Flow({
          target: function(file, url){
              if(file.targetUrl==null){
                console.log("에러!!!!!!!!!!!!!!!!!!!!!!! target 설정 안됨!!!, file : ", file, " url : ", file.targetUrl);
                file.cancel();
                console.log('캔슬!');
                return "test.";
              }
              else
                console.log('success, file : ', file, ' url : ', file.targetUrl);
              return file.targetUrl;
          },

          simultaneousUploads : 1,
          withCredentials : true,
          chunkSize : 100*1024*1024
      });
    }
    else{
      this.showProcess(this.state.flow.files);
    }
    this.setUploadAreaEvent(); //업로드 공간에 업로드 처리 컴포넌트 배정

    if(!this.state.flow.support) console.log("flow.js 지원 안함.");

    this.state.flow.on('fileAdded', function(file){
        console.log('file size : ', file.size);
        let data= {
            fileSize: file.size,
            fileName: file.name,
            directory: this.state.uploadDir
        };
        console.log("upload path : ", this.state.uploadDir);
        const formData  = new FormData();
        for(const name in data) {
            console.log("name : ", name, data[name])
            formData.append(name, data[name]);
        }

        console.log('formData : ', formData);
        let errorCheck = response => {
            this.props.errorCheck(response);
            if(response.status==400){
                console.log("this : ", this);
                this.remove(file);
                throw Error("디렉토리 내에 동일한 파일 이름이 존재합니다.");
            }
            else if(response.status==403){
                throw Error('저장 공간이 부족합니다.');
            }
            console.log("promise 1, response : ", response);
            return response;
        };
        console.log("파일 등록!");
        fetch("http://localhost/api/upload/flow", {
            method: "POST",
            credentials: 'include',
            body: formData,
        })
        .then(errorCheck)
        .then(res=>res.json())
        .then(response=>{ // 실제 서버에서 사용
            console.log("promise 2, response : ", response);
            //let url = response.headers.get('Location'); //docker로 구동 시에 사용
            let url=response['Location']; //테스트용, build 할 때 지우기
            console.log('url : ', url);
            file.targetUrl=url; //여기서 등록 안될때가 있다.
            console.log('end!');
            return file;
        })
        .then(file=>{
          let isSetting=false;
          function check(file){
            if(file.targetUrl!=null&&file.targetUrl!=''){
              console.log('check!, isSetting', isSetting);
              isSetting=true;
              clearInterval(wait);
            }
            else{
              console.log('here, error check!!, repeat.');
            }
          }
          let wait=setInterval(function(){
            console.log('file : ', file);
            check(file);
            console.log('here, isSetting : ', isSetting);
            if(isSetting) file.resume();
            else console.log('not setting!!!!!');
          }, 200);
          
        })
        .catch(e=>this.props.notify(e));
        
    }.bind(this));

    this.state.flow.on('filesSubmitted', function(array, event){
      for(let i=0; i<array.length; i++){
        console.log('file ', i, ' 추가 완료!, url : ', array[i].targetUrl, this.myRef);     
        
      }
      console.log('파일 큐에 추가 완료!  ', this.state.flow.files, ' this : ', this);
      this.showProcess(array);
      console.log(this.state.fileList);
    }.bind(this))

    this.state.flow.on('fileRetry', function(file, chunk){ //파일 재시도
        console.log('재시도중!');
    });

    this.state.flow.on('fileRemoved', function(file){ //파일이 업로드 큐에서 제거되었을 때 호출되는 이벤트
      console.log('파일 ', file, ' 제거됨!');
      if(this.state.flow.files.length==0){
          console.log("all file removed!", this.myRef);
          this.setState({
              isSubmitted: false
          })
      }
    }.bind(this));

    this.state.flow.on('fileSuccess', function(file, message, chunk){ //파일 업로드가 성공헀을 때 호출되는 이벤트
        let string=file.name + ' 업로드 완료!';
        if(file.name.length>30){
          string=<div>{file.name.substr(0, 30) + '...'}<br />업로드 완료!</div>;
        }
        else if(file.name.length>20){
          string=<div>{file.name}<br />업로드 완료!</div>;
        }
        console.log("string : ", string);
        this.props.notify(string);
    }.bind(this));

    this.state.flow.on('fileError', function(file, message){ //파일 업로드 실패했을 때 호출되는 이벤트
        console.log(file, message, "에러!");
    });
    
    this.state.flow.on('fileProgress', function(file, chunk){
      console.log(file.name, " 업로드중...", file.timeRemaining(), file.sizeUploaded())
      let array=this.state.fileList;
      for(let i=0; i<array.size; i++){
        if(file.uniqueIdentifier==array[i].uniqueIdentifier){
            array[i]=file;
            break;
        }
      }
      this.setState({
        fileList: array
      })
    }.bind(this))

    this.state.flow.on('complete', function(){
      console.log("업로드 끝!, this : ", this);
      this.props.checkUserState();
    }.bind(this))
  }

  setUploadAreaEvent=()=>{
    console.log("call!, isPathSet : ", this.state.isPathSet);
    if(this.state.isPathSet){
      this.state.flow.assignBrowse(this.myRef.current);
      this.state.flow.assignDrop(this.myRef.current);
    }
  }

  stop=(file)=>{
    console.log("pause call!, file : ", file);
    file.pause();
    this.setState({
        fileList: this.state.fileList
    })
  }

  resume=(file)=>{
    console.log("resume call!, file : ", file);
    file.resume();
  }

  remove=(file)=>{
    console.log("remove call!, file : ", file, 'type : ', typeof(this.state.fileList), file.targetUrl);
    let list=this.state.fileList;
    const idx=this.state.fileList.findIndex((f)=>{return f.uniqueIdentifier==file.uniqueIdentifier})
    file.cancel();
    this.setState({
      fileList: list.slice(0, idx).concat(list.slice(idx+1, list.length))
    })

    if(file.targetUrl){
      let id=file.targetUrl.split('/').reverse()[0];
      let url='http://localhost/api/partial/' + id;
      console.log("id : ", id);

      fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type' : 'application/json',
        },
        credentials: 'include',
      })
      .then(this.props.errorCheck)
      .then(()=>{
        this.props.notify(file.name+' 업로드를 중단했습니다.');
        this.setUploadAreaEvent();
      })
      .catch(e=>this.props.notify(e))
    }

    else if(this.state.flow.files.length==0){
      console.log('here!, ref : ', this.myRef);
      this.setUploadAreaEvent();
    }
  }

  toggleIsPathSet=()=>{
    console.log("giowejoiw");
    this.props.setModalHeadText("업로드");
    this.setState({
      isPathSet: true
    }, ()=>this.setUploadAreaEvent());
    
  }

  render() {
    console.log("upload render start, myRef : ", this.myRef, this.state.isPathSet);

    return (
      <Fragment>
                 {!this.state.isPathSet&&
                  <div className='upload-file-browser'>
                    <CustomFileBrowser 
                      notify={this.props.notify}
                      rootDirID={this.props.rootDirID}
                      changeUploadPath={this.changeUploadPath}
                      errorCheck={this.props.errorCheck}
                      checkUserState={this.props.checkUserState}
                    />
                    <Button outline className="custom-button" onClick={this.toggleIsPathSet}>결정</Button>
                  </div>
                 }

                 {this.state.isPathSet&&
                  <UploadForm
                      myRef={this.myRef} //이 값을 등록한 버튼을 this.myRef.current를 통해 찾을 수 있다.
                      isSubmitted={this.state.isSubmitted}
                      fileList={this.state.fileList}
                      stop={this.stop}
                      resume={this.resume}
                      remove={this.remove}
                  />
                 }
      </Fragment>
    );
  }
}

export default UploadContent;
