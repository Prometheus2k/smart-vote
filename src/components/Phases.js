import React, { useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import db from "../auth/Firebase";
import "../styles/Phases.css";

const Phases = () => {
  const [currPhase, setCurrPhase] = useState();

  const setPhase = async () => {
    await setDoc(doc(db, "phase", "current-phase"), {
      phase: currPhase,
    });
  };

  useEffect(() => {
    setPhase();
  }, [currPhase]);

  return (
    <div className="Phases">
      <h1>Select a phase</h1>
      <h3>Current Phase: {currPhase}</h3>
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
