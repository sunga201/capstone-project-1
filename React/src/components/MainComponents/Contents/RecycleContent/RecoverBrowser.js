import React, { Component, Fragment } from "react";
import FileBrowser, { Icons } from 'react-keyed-file-browser';
import axios from 'axios';

export default class RecoverBrowser extends Component{
  constructor(props){
    super(props);
    this.state={
      currentPath: this.props.curFolderPath,
      currentFolderID: this.props.curFolderID,
      notify: this.props.notify,
      files: [
        {
          key: this.props.rootKey,
          id: this.props.rootDirID
        },
      ],
      isCheck: [] //폴더 정보를 체크했으면, 해당 폴더의 id를 이 배열에 추가하여 다시 정보를 로드하지 않도록 한다.
    };
  }  

  getDirectoryInfo(key, folderID){
    if(!this.state.isCheck.includes(folderID)){ //폴더 정보 불러온 적이 없을 경우
      let url=`${window.location.origin}/api/directory/${folderID}`;
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      
      axios.get(url, option)
      .catch(error=>{
        this.props.errorCheck(error.response);
      })
      .then(content=>{
        content=content.data;
        let files=content.files; //루트 디렉토리에 들어있는 파일 목록
        let subdirectories=content.subdirectories;

        for(let directory in subdirectories){
          this.setState(state => {
            state.files = state.files.concat([{
              key: key + directory + '/',
              id: subdirectories[directory].pk
            }])
            return state
          })
        }
        this.setState(state=>{
          state.files=Array.from(new Set(state.files));
          state.isCheck=state.isCheck.concat([folderID]);
          return state;
        })
      })
      .catch(e=>this.state.notify(e));
    }
  }



  handleOnSelect=(e)=>{ //폴더 클릭, 업로드 경로 설정
    if(e===undefined) return; //폴더 새로 만드는 도중에 클릭한 경우
    let path='';
    if(this.props.isSharing) path=e['key'];
    else path=e['key'].substr(4);
    this.props.changePath(path); //현재 클릭중인 디렉토리에 맞춰서 업로드 경로 변경
    this.setState({
      currentPath: path,
      currentFolderID: e['id']
    });
    this.props.changeDirID(e['id']);
  }

  handleOnFolderOpen=(e)=>{ //폴더 열릴 때, 서버에서 해당 폴더의 정보 받아오기
    this.getDirectoryInfo(e.key, e.id);
  }

  myDetailRenderer=()=>{
    return(<div/>);
  }



  render(){
      return(
          <Fragment>
            <div>
            <FileBrowser
                        files={this.state.files}
                        icons={Icons.FontAwesome(4)}
                        onSelectFolder={this.handleOnSelect}
                        onFolderOpen={this.handleOnFolderOpen}
                        detailRenderer={this.myDetailRenderer}

            />
            <h5>{this.props.guideText} : {this.state.currentPath}</h5>
            </div>
          </Fragment>
      );
  }
}