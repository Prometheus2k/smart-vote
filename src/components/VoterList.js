import React, { useEffect, useState } from "react";
// import { getDocs, collection, setDoc, doc, getDoc } from "firebase/firestore";
// import db from "../auth/Firebase";
import "../styles/VoterList.css";

const VoterListRow = ({
  tcrId,
  name,
  dept,
  walletAddr,
  registered,
  smartVote,
  account,
}) => {
  const [reg, setReg] = useState(registered === "unregistered" ? true : false);
  console.log(account);
  console.log(reg);
  const handleClick = async (e) => {
    e.preventDefault();

    // if (reg) {
    //   await setDoc(doc(db, "voters", vEmail), {
    //     regNumber: tcrId,
    //     email: vEmail,
    //     name: vName,
    //     walletAddr: address,
    //     registration: "registered",
    //   });
    //   console.log(`${vName} registered!`);
    //   setReg(false);
    // } else {
    //   await setDoc(doc(db, "voters", vEmail), {
    //     regNumber: tcrId,
    //     email: vEmail,
    //     name: vName,
    //     walletAddr: address,
    //     registration: "unregistered",
    //   });
    //   console.log(`${vName} unregistered!`);
    //   setReg(true);
    // }

    if (reg) {
      console.log("bala bla");
      const newVoterList = await smartVote.methods.Register(account).call();
      setReg(false);
      console.log(newVoterList);
    } else {
      const newVoterList = await smartVote.methods.Unregister(account).call();
      setReg(true);
      console.log(newVoterList);
    }
  };
  function maskInfo(text) {
    var string = String(text);
    var replaced =
      string.slice(0, 2) + string.slice(2).replace(/.(?=...)/g, "*");
    console.log("Replaced:" + replaced);
    return replaced;
  }
  return (
    <div className="VoterListRow">
      <div>{tcrId}</div>
      <div>{name}</div>
      <div>{dept}</div>
      <div>{maskInfo(walletAddr)}</div>
      <div>
        {reg ? (
          <button className="registerButton" onClick={handleClick}>
            Register
          </button>
        ) : (
          <button className="unRegisterButton" onClick={handleClick}>
            Unregister
          </button>
        )}
      </div>
    </div>
  );
};

const VoterList = ({ smartVote, account }) => {
  const [voters, setVoters] = useState([]);

  console.log(account);

  // const getVoters = async () => {
  //   var querySnapshot = await getDocs(collection(db, "voters"));

  //   var temp = [];
  //   querySnapshot.forEach((d) => {
  //     temp.push(d.data());
  //   });

  //   console.log(temp);
  //   setVoters(temp);
  // };

  const getVoters = async () => {
    const voterList = await smartVote.methods.getVoterList().call();
    console.log(voterList);
    setVoters(voterList);
  };

  useEffect(() => {
    getVoters();
  }, []);

  return (
    <div className="VoterListTable">
      <h1>Voter's List</h1>
      <div className="VoterListHeader">
        <div>Registration Number</div>
        <div>Name</div>
        <div>Department</div>
        <div>Wallet Address</div>
        <div>Register</div>
      </div>
      <div className="VoterListBody">
        {voters.map((voterData) => {
          return (
            <VoterListRow
              tcrId={voterData.tcrid}
              name={voterData.name}
              dept={voterData.department}
              walletAddr={voterData.walletAddr}
              registered={voterData.registration}
              smartVote={smartVote}
              account={account}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VoterList;
