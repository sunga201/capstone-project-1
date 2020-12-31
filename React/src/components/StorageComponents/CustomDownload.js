/*
streamsaver.js
The MIT License (MIT)

Copyright (c) 2016 Jimmy Karl Roland Wärting

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import streamSaver from 'streamsaver';

const CustomDownload=(fileName, fileID, notify, loadFilesNFolders)=>{
    let fileStream=null;

    let errorCheck = response =>{
      console.log("response : ", response);
      if(!response.ok){
        loadFilesNFolders();
        throw Error('파일이 존재하지 않습니다.');
      }
      
      return response;
    }

    let data={};
    let idSplit=fileID.split(' ');
    for(let id in idSplit){
      data['file' + String(Number(id)+1)] = idSplit[id];
    }

    fetch(`${window.location.origin}/api/download`, { //axios에서 stream 지원을 하지 않으므로 대신 fetch 사용
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
      credentials: 'include'

    })
    .then(errorCheck)
    .then(content=>{
      console.log("download, content : ", content, content.body);
      if(idSplit.length>1){ // 파일 여러 개, 압축 파일 이름 downloadFiles.zip으로 통일
        fileStream=streamSaver.createWriteStream('downloadFiles.zip');
      }

      else{
        console.log("here.");
        console.log("content : ", content);
        fileStream=streamSaver.createWriteStream(fileName); // filename_here에 파일의 실제 이름을 넣는다. 
                                                                   // 특정 디렉토리에 들어갈 때 파일의 이름 및 썸네일 정보를 가져오므로
                                                                   // 거기에서 이름을 가져오면 됨.
      }

      const readableStream=content.body;
      if(window.WritableStream && readableStream.pipeTo){
        return readableStream.pipeTo(fileStream)
          .then(()=>console.log("finish writing."));
      }
    
      const writer=fileStream.getWriter()
      const reader=readableStream.getReader()
      const pump = () => reader.read()
      .then(res => res.done ? writer.close() : writer.write(res.value).then(pump))
    
      pump();
    }).catch(e=>notify(e))
    
}

export default CustomDownload;
