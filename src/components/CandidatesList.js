import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import db from "../auth/Firebase";
import "../styles/CandidateList.css";
//look here
// function maskInfo(text) {
//   var string = String(text);
//   var replaced = string.slice(0, 2) + string.slice(2).replace(/.(?=...)/g, "*");
//   console.log("Replaced:" + replaced);
//   return replaced;
// }

const CandidateListRow = ({ name, party, dept, tcrId, photo }) => {
  return (
    <div className="CandidateListRow">
      <div>{name}</div>
      <div>{party}</div>
      <div>{dept}</div>
      <div>{tcrId}</div>
      <div>
        <img className="photo" src={photo} alt={name} />
      </div>
    </div>
  );
};

const CandidatesList = ({ smartVote, account }) => {
  console.log(account);
  console.log(smartVote);
  const [candid, setCandid] = useState([]);
  // const getCandidates = async (e) => {
  //   var querySnapshot = await getDocs(collection(db, "candidates"));

  //   var temp = [];

  //   querySnapshot.forEach((d) => {
  //     // console.log(d.data());
  //     temp.push(d.data());
  //   });
  //   console.log(temp);
  //   setCandid(temp);

  //   console.log(candid);
  // };

  // useEffect(() => {
  //   getCandidates();
  // }, []);

  const getCandidates = async (e) => {
    console.log("getcandidate called");
    console.log(account);
    console.log(smartVote);

    const candidateList = await smartVote.methods.getCandidateList().call();
    console.log(candidateList);
    setCandid(candidateList);
    // console.log(candid);
    // console.log(typeof candidateList);
  };

  useEffect(() => {
    getCandidates();
  }, []);
  return (
    <div className="CandidateListTable">
      <h1> Candidate's List </h1>
      <div className="CandidateListHeader">
        <div>Name</div>
        <div>Party</div>
        <div>Department</div>
        <div>Candidate Number</div>
        <div>Photo</div>
      </div>
      <div className="CandidateListBody">
        {candid.map((d) => (
          <CandidateListRow
            name={d.name}
            party={d.party}
            dept={d.department}
            tcrId={d.tcrid}
            photo={d.imageurl}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
