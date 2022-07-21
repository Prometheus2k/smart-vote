import {
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext.js";
import db from "../auth/Firebase.js";
import "../styles/Voting.css";

const CandidateListRow = ({
  name,
  party,
  image,
  regNumber,
  dept,
  votes,
  wallet,
  status,
  setStatus,
}) => {
  const vote = async () => {
    if (status === "voted") alert("Already Voted!");
    else {
      // Update Firebase
      console.log("Voted!");
      const candRef = doc(db, "candidates", regNumber);
      await updateDoc(doc(db, "candidates", regNumber), {
        votes: votes + 1,
      });
      setStatus("voted");
    }
  };

  return (
    <div className="CandidateListRow">
      <div>
        <img src={image} className="candidate-img" alt={name} />
      </div>
      <div>{name.toUpperCase()}</div>
      <div>{party.toUpperCase()}</div>
      <div>
        {status === "not-voted" ? (
          <button className="enabledBtn" onClick={vote}>
            {" "}
            Vote{" "}
          </button>
        ) : (
          <button className="disabledBtn" disabled>
            {" "}
            Vote{" "}
          </button>
        )}
      </div>
    </div>
  );
};

const Voting = () => {
  const [status, setStatus] = useState("not-voted");

  const [candList, setCandList] = useState([]);

  const [phase, setPhase] = useState();
  const [approved, setApproved] = useState(false);

  const { currentUser } = useAuth();

  const getCandidates = async (e) => {
    const candidatesList = await getDocs(collection(db, "candidates"));

    const temp = [];
    candidatesList.forEach((d) => {
      console.log(d.data());
      temp.push(d.data());
    });

    setCandList(temp);
  };

  const approvedStatus = async () => {
    // Fetch approved Status from Firebase
    const appr = await getDoc(doc(db, "voters", currentUser.email));

    if (appr.data().registration === "registered") setApproved(true);

    // console.log(approved);
  };

  const getPhase = async () => {
    // Fetch Phase from Firebase

    const phaseStat = await getDoc(doc(db, "phase", "current-phase"));

    setPhase(phaseStat.data().phase);
  };

  useEffect(() => {
    getCandidates();
    getPhase();
    approvedStatus();

    // getAccounts();
  }, []);

  return (
    <div className="voting">
      <h1 className="heading-text">Cast your Vote!</h1>
      {phase === "voting" && approved === true ? (
        <div className="CandidateListTable">
          <div className="CandidateListHeader">
            <div>Image</div>
            <div>Name</div>
            <div>Party</div>
            <div>Votes</div>
          </div>
          <div className="CandidateListBody">
            {candList.map((d) => (
              <CandidateListRow
                name={d.name}
                party={d.party}
                image={d.photo}
                regNumber={d.regNumber}
                dept={d.department}
                votes={d.votes}
                wallet={d.walletAddr}
                status={status}
                setStatus={setStatus}
              />
            ))}
          </div>
        </div>
      ) : approved === false ? (
        <h2 className="unreg-text">You haven't Registered! You can't Vote</h2>
      ) : (
        <h2 className="unreg-text">Voting Phase is yet to Start / is Over!</h2>
      )}
    </div>
  );
};

export default Voting;
