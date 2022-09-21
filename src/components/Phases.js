import React, { useEffect, useState } from "react";
// import { setDoc, doc } from "firebase/firestore";
// import db from "../auth/Firebase";
import "../styles/Phases.css";

const Phases = ({ smartVote, account }) => {
  const [currPhase, setCurrPhase] = useState();
  const [currentPhase, setCurrentPhase] = useState([]);

  // const setPhase = async () => {
  //   await setDoc(doc(db, "phase", "current-phase"), {
  //     phase: currPhase,
  //   });
  // };
  const setPhase = async () => {
    smartVote.methods
      .setPhase(currPhase)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log(currPhase);
      });
  };

  useEffect(() => {
    setPhase();
  }, [currPhase]);

  const getPhase = async (e) => {
    console.log("getPhase called");
    console.log(account);
    console.log(smartVote);

    const currentPhase = await smartVote.methods.getPhase().call();
    console.log(currentPhase);
    setCurrentPhase(currentPhase);
  };

  useEffect(() => {
    getPhase();
  }, []);

  return (
    <div className="Phases">
      <h1>Select a phase</h1>
      <h3>Current Phase: {currentPhase}</h3>
      <button
        value="registration"
        onClick={(e) => setCurrPhase(e.target.value)}
      >
        Registration
      </button>
      <button value="voting" onClick={(e) => setCurrPhase(e.target.value)}>
        Voting
      </button>
      <button value="results" onClick={(e) => setCurrPhase(e.target.value)}>
        Results
      </button>
    </div>
  );
};

export default Phases;
