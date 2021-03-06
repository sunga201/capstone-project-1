import axios from "axios";

const option = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

const loadTeamList = (setIsLoading, setTeamList, props, setDefaultCheckTeam=null, folderID=null) => {
    const tempList1 = [];
    const tempList2 = [];
    setIsLoading(true);
    axios
      .get(`${window.location.origin}/api/team`, option)
      .catch(error=>{
        props.errorCheck(error.response);
      }) 
      .then((content) => {
        content["data"].map((team, index) => {
          tempList1.push(team);
        });
        axios.get(`${window.location.origin}/api/join-team`, option)
          .catch(error=>{
            props.errorCheck(error.response);
          }) 
          .then((content) => {
            content["data"].map((team, index) => {

              tempList2.push(team);
            });
            const tempList3 = tempList1.concat(tempList2);
            tempList3.sort((a, b)=>{  // 팀 이름으로 오름차순 정렬
              return a.team_name>b.team_name;
            })
            setTeamList(tempList3);
            let defaultCheckTeam=[];
            if(setDefaultCheckTeam && folderID){
              for(let i in tempList3){
                for(let j in tempList3[i].share_folders){
                  if(tempList3[i].share_folders[j].pk==folderID){
                    defaultCheckTeam.push(Number(i));
                    break;
                  }
                }
              }
              setDefaultCheckTeam(defaultCheckTeam);
            }
            setIsLoading(false);
          })
      })
      .catch((error) => {
        props.notify(error);
        setIsLoading(false);
      });
  };

  export default loadTeamList;