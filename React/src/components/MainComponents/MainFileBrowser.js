import React, { useState, Fragment, useEffect, useRef } from "react";
import classNames from "classnames";
import UploadModal from '../Modal/UploadModal/UploadModal';
import ItemReplacementModal from '../Modal/ItemReplacementModal/ItemReplacementModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardDeck,
  Container,
  Progress,
  Spinner
} from "reactstrap";

import "./Content.css";
import Item from "./Item/Item";
import MyContextMenu from "./ContextMenu/MyContextMenu";
import SubSideBar from "../sidebar/SubSideBar/SubSideBar";
import CustomDownload from "../StorageComponents/CustomDownload";
import DeleteEntry from "../StorageComponents/DeleteEntry";

import loadTeamList from './Contents/TeamContent/LoadTeamList';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { SelectableGroup } from "react-selectable-fast";

/*modal import*/
import ShareModal from '../Modal/ShareModal/ShareModal';
import PreviewModal from '../Modal/PreviewModal/PreviewModal';
import RecoverModal from "../Modal/RecoverModal/RecoverModal";
import EmptyTrashModal from "../Modal/EmptyTrashModal/EmptyTrashModal";

const MainFileBrowser = (props) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [mkdirModal, setMkdirModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [clearModal, setClearModal] = useState(false);
  const [recoverModal,setRecoverModal] = useState(false);
  const [flow, setFlow] = useState(null);
  const [modalHeadText, setModalHeadText] = useState("업로드 경로 선택");
  const toggleUploadModal = () => setUploadModal(!uploadModal);
  const toggleMkdirModal = () => setMkdirModal(!mkdirModal);
  const toggleMoveModal = () => setMoveModal(!moveModal);
  const togglePreviewModal = () => setPreviewModal(!previewModal);
  const toggleShareModal =() => setShareModal(!shareModal);
  const toggleClearModal = () => setClearModal(!clearModal);
  const toggleRecoverModal = () => setRecoverModal(!recoverModal);
  const [newPath, setNewPath] = useState(''); // 파일 이동 명령에 사용할 경로, 공유폴더에 접근중일 경우 pk가 저장되며,
                                              // 아닐 경우 경로명이 저장된다. 
  const [newFolderName, setNewFolderName] = useState('');
  const [isRename, toggleRename] = useState(false);
  const [newName, setNewName] = useState(""); // 새로 바꿀 이름
  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [defaultCheckTeam, setDefaultCheckTeam] = useState([]); //공유 설정 modal에서 현재 공유설정 되어있는
                                                                // 팀 목록 저장할때 사용
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  let shareTeamChecked=[];
  const myFileGroupRef=useRef(), myFolderGroupRef=useRef();
  //import GroupItem from "./GroupItem";
  
  const option = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const valChange=(e)=>{
    setNewFolderName(e.target.value);
  }
  const [currentItemInfo, setCurrentItemInfo] = useState({ //오른쪽 사이드바에 표시할 데이터
  });
  const [multiItemInfo, setMultiItemInfo] = useState({});
  useEffect(() => {
    if(!props.isSharingInit) props.loadFilesNFolders('', props.rootDirID); 
    else props.loadFilesNFolders('', ''); // 특정 팀에 설정되어 있는 공유폴더 목록 불러오기
  },[]);

  const showFileInfo = (index) => {
    setCurrentItemInfo(props.fileList[index]);
  };

  const showFolderInfo = (index) => {
    if(props.folderList[index].name=='...') return;
    if(props.isRecycle)
      setCurrentItemInfo(props.folderList[index]);
    else{
      axios.get(`${window.location.origin}/api/directory/${props.folderList[index]["pk"]}`, option)
      .catch(error=>{
        props.errorCheck(error.response);
      })
      .then(content => {
        content=content.data;
        if(content.hasOwnProperty['error']) throw Error(content['error'])
        const folderInfo = {
        ...props.folderList[index],
        subfolderNum:Object.keys(content['subdirectories']).length,
        fileNum:Object.keys(content['files']).length,
        }
        setCurrentItemInfo(folderInfo);
      })
      .catch(e=>props.notify(e))
    } 
    // setCurrentFileInfo(folderList[index]);
  };

  const handleDownload=()=>{ // 오른쪽 클릭 -> 다운로드
    let chk=false;
    let params='';
    if(multiItemInfo.length>1){
      for(let i in multiItemInfo){
        params+=multiItemInfo[i].pk + (i==multiItemInfo.length-1 ? '' : ' ');
        if(currentItemInfo.pk==multiItemInfo[i].pk){
          if(!chk) chk=true;
        }
      }
    }

    if(chk) CustomDownload('', params); // 파일 여러 개 다운로드
    else{
      CustomDownload(currentItemInfo.name, currentItemInfo.pk, props.notify, props.loadFilesNFolders); //단일 파일 다운로드, 또는 파일 여러개 선택했지만
                                                                //선택 안한 다른 파일에 다운로드 누른 경우
    }                                                       
  }
  
  const handleDelete=()=>{ //오른쪽 클릭 -> 삭제
    let chk=false;
    let params='';
    if(multiItemInfo.length>1){ //한번에 여러개 삭제
      for(let i in multiItemInfo){
        if(multiItemInfo[i].type=='folder' && multiItemInfo[i].name=='...') continue;
        params+=multiItemInfo[i].pk + (i==multiItemInfo.length-1 ? '' : ' ');
        if(currentItemInfo.pk==multiItemInfo[i].pk){
          if(!chk) chk=true;
        }
      }
    }

    if(chk) { //파일 및 폴더 여러 개 삭제
      DeleteEntry(props.notify, props.errorCheck, props.loadFilesNFolders, props.curFolderID, params, props.checkUserState); 
    }
    else { // 파일 및 폴더 한개만 삭제하거나, 여러 개 선택해놓고 다른 단일 파일 삭제 시도할 경우
      DeleteEntry(props.notify, props.errorCheck, props.loadFilesNFolders, props.curFolderID, currentItemInfo.pk, props.checkUserState);
    }
  }

  const handleFavorite = () => {
      let data = {
        favorite:currentItemInfo.favorite ? false : true
    }


    axios.put(`${window.location.origin}/api/${currentItemInfo.type=="file" ? "file" : "directory"}/${currentItemInfo.pk}`, JSON.stringify(data), option)
    .catch(res=>{
      props.errorCheck(res.response, res.response.data);
      if(res.response.status>=400) throw Error(res.response.data);
    })
    .then(content=> {
      props.notify(currentItemInfo.favorite ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
      let newInfo=currentItemInfo;
      newInfo.favorite=!newInfo.favorite;
      setCurrentItemInfo(newInfo);
      if(props.isFavoriteInit)
        props.loadFilesNFolders();
      else
        props.loadFilesNFolders('',props.curFolderID);

  })
}

const clearTrash = () => {
  axios.delete(`${window.location.origin}/api/recycle`,option)
  .catch(res=>{
    props.errorCheck(res.response, res.response.data);
    if(res.response.status>=400) throw Error(res.response.data);
  })
  .then(content => {
    toggleClearModal();
    props.notify('휴지통을 성공적으로 비웠습니다.');
    props.checkUserState();
    props.loadFilesNFolders();
  })
}
const itemRecover = () => {
  if(multiItemInfo.length>1) {
    if(multiItemInfo[0].itemType == "file") {
      let data = [];
      multiItemInfo.map(item=> {
        data.push([item.itemType == "file" ? item.pk : item.pk[0],props.curFolderID])
      })
      axios.post(`${window.location.origin}/api/recover`,JSON.stringify(data),option)
      .catch(res=>{
        props.errorCheck(res.response, res.response.data);
        if(res.response.status>=400) throw Error(res.response.data);
      })
      .then(content=> {
        props.notify('복구 완료.');
        props.loadFilesNFolders();
      })
    }
    else
    {
      multiItemInfo.map(item=> {
        let data=[
          [item.pk, props.curFolderID]
        ]
        axios.post(`${window.location.origin}/api/recover`,JSON.stringify(data),option)
        .catch(res=>{
          props.errorCheck(res.response, res.response.data);
          if(res.response.status>=400) throw Error(res.response.data);
        })
        .then(content=> {
          props.loadFilesNFolders();
          props.loadFilesNFolders();
        })
      })
      props.notify('복구 완료.');
    }
  }
  else {
    let data= [
      [currentItemInfo.type=="file" ? currentItemInfo.pk : currentItemInfo.pk, props.curFolderID]
    ]
    axios.post(`${window.location.origin}/api/recover`,JSON.stringify(data),option)
    .catch(res=>{
      props.errorCheck(res.response, res.response.data);
      if(res.response.status>=400) throw Error(res.response.data['error']);
    })
    .then(content => {
      props.notify('복구 완료.');
      props.loadFilesNFolders();
    })
    .catch(e=>props.notify(e))
  }
  toggleRecoverModal();
}

const handleRecover = () => {
  toggleRecoverModal();
}

  const handleRename=()=>{ //오른쪽 클릭 -> 이름 바꾸기
    setNewName(currentItemInfo.name);
    toggleRename(true);
  }

  const onChangeNewName=(e)=>{
    setNewName(e.target.value);
  }

  const handleMove=()=>{//오른쪽 클릭 -> 이동
    toggleMoveModal();
  }

  const submitReplace=()=>{
    let data={
      parent: newPath
    };
    if(multiItemInfo.length>1){ //여러 개 한번에 옮기기
      if(multiItemInfo[0].itemType=='file'){
        data['type']='file';
      }
      else{ //폴더
        data['type']='directory';
      }

      for(let idx in multiItemInfo){
        data['file'+(Number(idx)+1)] = multiItemInfo[idx].pk;
      }
    }
    else{ //한개씩 옮기기
      if(currentItemInfo.type=='file'){
        data['type']='file';
      }
      else{
        data['type']='directory';
      }
      data['file1']=currentItemInfo.pk;
    }
    
    axios.put(`${window.location.origin}/api/replacement`, data, option)
    .catch(error=>{
      props.errorCheck(error.response);
    })
    .then(content=>{
      content=content.data;
      if(content.hasOwnProperty('error')){
        throw Error(content['error']);
      }
      props.notify('경로 이동 완료!');
      props.loadFilesNFolders();
      toggleMoveModal();
    })
    .catch(e=>{
      props.notify(e);
      toggleMoveModal();  
    });
  }

  const handlePreview=()=>{ //오른쪽 클릭 -> 미리보기
    togglePreviewModal();
  }

  const multiFileCheck=(e)=>{
    toggleRename(false);
    if(e.length>=1){ // 폴더 그룹 클릭했다가 파일 그룸 클릭할 때, 폴더 그룹 선택 해제
      if(e['0'].props.itemType=='file') myFolderGroupRef.current.clearSelection();
      else if(myFileGroupRef.current) myFileGroupRef.current.clearSelection(); //처음 공유폴더목록을 보여줄 때 
                                                                               //파일 목록이 나타나지 않기 때문에
                                                                               //current가 존재하는지 체크해준다. 
    }

    let arr=[];
    for(let i in e){
      arr.push(e[i].props);
    }
    setMultiItemInfo(arr);
  }

  const renameCheck=(e)=>{
    if(isRename) toggleRename(false);
  }

  const check=(flow)=>{
    setFlow(flow);
  }

  const submitNewName=(target)=>{
    if(target.charCode==13){
      if(newName==currentItemInfo.name){ //이름이 안바뀐 경우
        toggleRename(false);
        return; 
      }
  
      let url=`${window.location.origin}/api/`;
      if(currentItemInfo.type=='file'){ //파일
        url+='file/' + currentItemInfo.pk;
      }

      else{//디렉토리
        url+='directory/' + currentItemInfo.pk;
      }

      let data={
        'name' : newName
      }
      axios.put(url, JSON.stringify(data), option)
      .catch(res=>{
        props.errorCheck(res.response, res.response.data);
        if(res.response.status>=400) throw Error(res.response.data);
      })
      .then(response=>{
        let index=multiItemInfo['0'].index;
        if(currentItemInfo.type=='file'){
          props.fileList[index].name=newName;
          props.setFileList(props.fileList);
        }
        else{
          props.folderList[index].name=newName;
          props.setFolderList(props.folderList);
        }
        setNewName('');
        toggleRename(false);
        props.notify("이름 변경 완료!");
      })
      .catch(e=>{
          props.notify(e);
      })
    }
  }

  const handleShare=()=>{//폴더에 오른쪽 클릭 -> 공유 설정
    loadTeamList(setIsTeamLoading, setTeamList, props, setDefaultCheckTeam, currentItemInfo.pk);
    toggleShareModal(!shareModal);
  }

  const shareTeamOnCheck=(value)=>{
    shareTeamChecked=value;
  }

  const submitShareTeam=()=>{
    let deleteTeam=defaultCheckTeam.filter(x=>!shareTeamChecked.includes(x));
    let newTeam=shareTeamChecked.filter(x=>!defaultCheckTeam.includes(x))
    let newData={}, deleteData={};
    for(let i in newTeam){
      newData['team'+(Number(i)+1)]=teamList[newTeam[i]]._id;
    }
    for(let i in deleteTeam){
      deleteData['team'+(Number(i)+1)]=teamList[deleteTeam[i]]._id;
    }
    let url=`${window.location.origin}/api/sharing/${currentItemInfo.pk}`;
    axios.put(url, newData, option)
    .then(response=>{
      response=response.data;
      if(response.hasOwnProperty('error')) throw Error(response['error']);
    })
    .then(()=>{
      axios.delete(url, {
        data: deleteData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      .then(response=>{
        response=response.data;
        if(response.hasOwnProperty('error')) throw Error(response['error']);
        props.notify('공유 설정 변경 완료!');
        props.loadFilesNFolders();
        toggleShareModal();
      })
    })
    .catch(e=>{
      props.notify(e);
      toggleShareModal();
    });
    
  }

  const createDir=()=>{ //홈 화면에서 폴더 생성
    if(newFolderName=='...'){
      props.notify("error : ...은 폴더 이름으로 할 수 없습니다.");
      return;
    }
    let url=`${window.location.origin}/api/mkdir`;
    let data={
      "parent" : props.isSharing ? props.curFolderID : props.curFolderPath,
      'name' : newFolderName
    }
    axios.post(url, data, option)
    .catch(error=>{
      if(error.response.status==400) throw Error('이미 동일한 이름의 폴더가 존재합니다.');
      props.errorCheck(error.response);
    })
    .then(content=>{
        props.notify('폴더 생성 완료!');
        toggleMkdirModal();
        setNewFolderName('');
        let urlPart=content.headers['location'].split('/');
        let id=urlPart[urlPart.length-1];
        props.loadFilesNFolders('', props.curFolderID);
    })
    .catch(e=>props.notify(e));
  }

  const changePath=(path)=>{
    setNewPath(path);
  }

  const changeSearchKeyword=(e)=>{
    setSearchKeyword(e.target.value);
  }

  const submitSearchKeyword=(e)=>{
    e.preventDefault();
    if(searchKeyword.length==0){
      props.setShowSearchResult(false);
      props.loadFilesNFolders('', props.searchRootDirID)
      return;
    }
    if(searchKeyword.length<2){
      props.notify('검색어는 두 글자 이상으로 입력해주세요.');
      return;
    }
    let url=`${window.location.origin}/api/search/${props.searchRootDirID}/${searchKeyword}`;
    setIsSearching(true);

    axios.get(url, option)
    .catch(error=>{
      props.errorCheck(error.response);
    })
    .then(content=>{
        content=content.data;
        if(content.hasOwnProperty('error')) throw Error(content['error']);
        setIsSearching(false);
        props.setShowSearchResult(true);
        setSearchKeyword('');
        props.loadFilesNFolders('', props.curFolderID, '', true, content['files'], content['subdirectories']);
    })
    .catch(e=>{
      props.notify(e);
      setIsSearching(false);
    });
  }

  return (  
      <Fragment>
      
      {/*업로드 modal*/}
      {uploadModal && (
              <UploadModal
                    uploadModal={uploadModal}
                    toggleUploadModal={toggleUploadModal}
                    modalHeadText={modalHeadText}
                    isSharing={props.isSharing} //공유 폴더일 때 업로드 처리
                    flow={flow} 
                    setFlow={setFlow}
                    setModalHeadText={setModalHeadText}
                    notify={props.notify}
                    rootDirID={props.rootDirID}
                    errorCheck={props.errorCheck}
                    checkUserState={props.checkUserState}
                    curFolderID={props.curFolderID}
                    curFolderPath={props.curFolderPath}
                    loadFilesNFolders={props.loadFilesNFolders}
                    check={check}
              />
            )}

      {/*위치 이동 modal*/}
      <ItemReplacementModal
          isSharing={props.isSharing}
          moveModal={moveModal}
          toggleMoveModal={toggleMoveModal}
          changePath={changePath}
          submitReplace={submitReplace} 
          notify={props.notify}
          rootDirID={props.rootDirID}
          changePath={changePath}
          errorCheck={props.errorCheck}
          checkUserState={props.checkUserState}
          curFolderID={props.curFolderID}
          curFolderPath={props.curFolderPath}
          loadFilesNFolders={props.loadFilesNFolders}
      />

      {/*미리보기 modal*/}
      <PreviewModal 
          isOpen={previewModal} 
          toggle={togglePreviewModal}
          fileName={currentItemInfo.name}
          fileID={currentItemInfo.pk}
          hasThumbnail={currentItemInfo.has_thumbnail && `${window.location.origin}/api/thumbnail/${currentItemInfo.pk}`}
          isVideo={currentItemInfo.is_video}
          notify={props.notify}
          loadFilesNFolders={props.loadFilesNFolders}

      />

      {/*디렉토리 공유 설정 modal*/}
      <ShareModal
          shareModal={shareModal}
          toggleShareModal={toggleShareModal}
          shareTeamOnCheck={shareTeamOnCheck}
          defaultCheckTeam={defaultCheckTeam}
          teamList={teamList}
          submitShareTeam={submitShareTeam}
      />

      {/* 휴지통 비우기 modal */}
      <EmptyTrashModal
          clearModal={clearModal}
          toggleClearModal={toggleClearModal}
          clearTrash={clearTrash}
      />

      {/* 파일 복구 modal */}
      <RecoverModal     
          recoverModal={recoverModal}
          toggleRecoverModal={toggleRecoverModal}
          changePath={changePath}
          notify={props.notify}
          rootDirID={props.rootDirID}
          changePath={changePath}
          errorCheck={props.errorCheck}
          checkUserState={props.checkUserState}
          curFolderID={props.curFolderID}
          curFolderPath={props.curFolderPath}
          loadFilesNFolders={props.loadFilesNFolders} 
          itemRecover = {itemRecover}
          changeDirID = {props.changeDirID}
      />


      <MyContextMenu
          handlePreview={handlePreview} 
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          handleRename={handleRename}
          handleMove={handleMove}
          handleShare={handleShare}
          handleFavorite={handleFavorite}
          handleRecover={handleRecover}
        />

      <Container fluid className={classNames("round", "content")} color="light">
      {!props.isSharingInit && !props.isRecycle && !props.isFavorite &&
      <div className="searchbar-wrapper"> 
        <form onSubmit={submitSearchKeyword} method='GET'> {/*검색 창*/}
        <InputGroup className="searchbar-group"> 
          <InputGroupAddon addonType="append" className="searchbar">
              <Input 
                className="search-input"
                id='searchKeyword'
                value={searchKeyword}
                onChange={changeSearchKeyword}
              />
              <Button 
                type='submit'
                className="search-icon-button"
              >
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </Button>
          </InputGroupAddon>
        </InputGroup>
        </form>
        </div>
      }
        
        {props.showSearchResult && <div className="search-result-header">검색결과</div>}
        {props.isFavorite && <div className="search-result-header">즐겨찾기</div>}
        {props.isRecycle && <div className="search-result-header">휴지통</div>}

        {/*파일 표시*/}
        {!props.isSharingInit &&
        <div className="current-content">
          
          <span className="content-name">파일</span>
          <div className="add-item">
            {!props.isFavorite && !props.isRecycle && !props.showSearchResult && 
              <button
                className="add-item-label"
                onClick={toggleUploadModal}
              >
                업로드
              </button>
            }
            {props.isRecycle &&
               <button
               className="add-item-label"
               onClick={toggleClearModal}
             >
               휴지통 비우기
             </button>
            }
          </div>
        </div>
        }
          <div>
            {!props.isSharingInit &&
            <SelectableGroup
              className="main"
              clickClassName="tick"
              ref={myFileGroupRef}
              enableDeselect={true}
              allowClickWithoutSelected={true}
              tolerance={10}
              resetOnStart
              onSelectionFinish={multiFileCheck}
              onSelectionClear={renameCheck}
              isRecycle={props.isRecycle}
            >
              <CardDeck className="current-items">
                <Progress />

                {props.isLoading || isSearching?
                  <Spinner size='lg' color='primary' className='file-spinner'/>
                  :
                  props.fileList.map((item, index) => (
                  <Item
                    showFileInfo={showFileInfo}
                    pk={item.pk}
                    thumbnailUrl={
                      item.has_thumbnail &&
                      `${window.location.origin}/api/thumbnail/${item.pk}`
                    }
                    itemType="file"
                    curPk={currentItemInfo.pk}
                    name={item.name}
                    index={index}
                    isVideo={item.is_video}
                    isMultiCheck={multiItemInfo.length>1 ? true : false}
                    isRename={isRename}
                    togglePreviewModal={togglePreviewModal}
                    newName={newName}
                    onChangeNewName={onChangeNewName}
                    submitNewName={submitNewName}
                    favorite={item.favorite}
                    isRecycle={props.isRecycle}
                  />
                ))}
              </CardDeck>
            </SelectableGroup>
            }
            <div className="current-content">
              <span className="content-name">{(props.isSharingInit ? '공유 폴더 목록' : '폴더')}</span> 
              <span className="content-name browser-path">{( props.isSharingInit 
                                                          || props.showSearchResult
                                                          || props.isFavorite 
                                                          || props.isRecycle
                                                          ) 
                                                            ?
                                                              '' 
                                                            :
                                                              '현재 경로 : ' + props.curFolderPath}</span>
                <div className="add-item">
                {!props.isSharingInit && !props.showSearchResult && !props.isFavorite && !props.isRecycle &&
                  <button
                    className="add-item-label"
                    onClick={toggleMkdirModal}
                  >
                  폴더 생성
                </button>
                }

              {/*폴더 생성 modal*/}
              <Modal
                isOpen={mkdirModal}
                toggle={toggleMkdirModal}
                
                unmountOnClose={false}
              >
                <ModalHeader toggle={toggleMkdirModal}>
                  <div className="modal-head">폴더 생성</div>
                </ModalHeader>
                <ModalBody>
                      <div>새로운 폴더명을 입력해주세요.</div>
                      <InputGroup className="content-input-group">
                      <InputGroupAddon addonType='append'>
                          <Input 
                              type='text' 
                              name="withdrawalText"
                              id='withdrawalText'
                              value={newFolderName} 
                              onChange={valChange}
                              className="content-input"
                          />
                              <Button
                                  outline 
                                  className="content-input-button"
                                  onClick={createDir}
                              >
                              입력
                              </Button>
                          </InputGroupAddon>
                      </InputGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={toggleMkdirModal}
                    className="close-button content-button"
                  >
                    닫기
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </div>
          </div>
                      
            {/*폴더 표시*/}
            <SelectableGroup
              className="main"
              clickClassName="tick"
              enableDeselect
              ref={myFolderGroupRef}
              allowClickWithoutSelected={true}
              tolerance={10}
              resetOnStart
              onSelectionFinish={multiFileCheck}
            >
            
              <CardDeck className="current-items">
                {props.isLoading || isSearching?
                  <Spinner size='lg' color='primary' className='file-spinner'/>
                :
                props.folderList.map((folder, index) => (
                    <Item
                      showFileInfo={showFolderInfo}
                      pk={folder.pk}
                      itemType="folder"
                      curPk={currentItemInfo.pk}
                      name={folder.name}
                      index={index}
                      loadFilesNFolders={props.loadFilesNFolders}
                      isMultiCheck={multiItemInfo.length>1 ? true : false}
                      isRename={isRename}
                      newName={newName}
                      browserPath={currentItemInfo.browser_path}
                      onChangeNewName={onChangeNewName}
                      submitNewName={submitNewName}
                      isRecycle={props.isRecycle}
                      favorite={folder.favorite}
                    />
                ))}

              </CardDeck>
            </SelectableGroup>
          </div>

      </Container>
       <SubSideBar    
         name={currentItemInfo.name}
         uploadDate={currentItemInfo.uploaded_at}
         size={currentItemInfo.size}
         pk={currentItemInfo.pk}
         type={currentItemInfo.type}
         thumbnailUrl={
           currentItemInfo.has_thumbnail &&
           `${window.location.origin}/api/thumbnail/${currentItemInfo.pk}`
         }
         browserPath={currentItemInfo.browser_path}
         searchRootDirName={props.searchRootDirName}
         subfolderNum={currentItemInfo.subfolderNum}
         favorite = {currentItemInfo.favorite}
         fileNum={currentItemInfo.fileNum}
         owner={currentItemInfo.owner}
       />  
    </Fragment>
  );
}

export default MainFileBrowser;
