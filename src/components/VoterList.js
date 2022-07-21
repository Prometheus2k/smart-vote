import React, { useEffect, useState } from "react";
import { getDocs, collection, setDoc, doc, getDoc } from "firebase/firestore";
import db from "../auth/Firebase";
import "../styles/VoterList.css";

const VoterListRow = ({ vName, vEmail, tcrId, address, registered }) => {
  const [reg, setReg] = useState(registered === "unregistered" ? true : false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (reg) {
      await setDoc(doc(db, "voters", vEmail), {
        regNumber: tcrId,
        email: vEmail,
        name: vName,
        walletAddr: address,
        registration: "registered",
      });
      console.log(`${vName} registered!`);
      setReg(false);
    } else {
      await setDoc(doc(db, "voters", vEmail), {
        regNumber: tcrId,
        email: vEmail,
        name: vName,
        walletAddr: address,
        registration: "unregistered",
      });
      console.log(`${vName} unregistered!`);
      setReg(true);
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
      <div>{vName}</div>
      <div>{vEmail}</div>
      <div>{tcrId}</div>
      <div>{maskInfo(address)}</div>
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

const VoterList = () => {
  const [voters, setVoters] = useState([]);

  const getVoters = async () => {
    var querySnapshot = await getDocs(collection(db, "voters"));

    var temp = [];
    querySnapshot.forEach((d) => {
      temp.push(d.data());
    });

    console.log(temp);
    setVoters(temp);
  };

  useEffect(() => {
    getVoters();
  }, []);

  return (
    <div className="VoterListTable">
      <h1>Voter's List</h1>
      <div className="VoterListHeader">
        <div>Name</div>
        <div>Email</div>
        <div>Register Number</div>
        <div>Wallet Address</div>
        <div>Register</div>
      </div>
      <div className="VoterListBody">
        {voters.map((rowData) => {
          return (
            <VoterListRow
              vName={rowData.name}
              vEmail={rowData.email}
              tcrId={rowData.regNumber}
              address={rowData.walletAddr}
              registered={rowData.registration}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VoterList;
