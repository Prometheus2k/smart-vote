import React, { useEffect, useState } from "react";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import db from "../auth/Firebase.js";
import "../styles/Results.css";

const ResultsRow = ({ name, party, photo, votes }) => {
  return (
    <div className="ResultsListRow">
      <div>{name}</div>
      <div>{party}</div>
      <div>
        <img className="photo" src={photo} alt={name} />
      </div>
      <div>{votes}</div>
    </div>
  );
};

export default function Results() {
  const [phase, setPhase] = useState();

  const getPhase = async () => {
    // Fetch Phase from Firebase
    const phaseStat = await getDoc(doc(db, "phase", "current-phase"));

    setPhase(phaseStat.data().phase);

    console.log(phase);
  };

  const [results, setResults] = useState([]);

  const getResults = async () => {
    const resList = await getDocs(collection(db, "candidates"));

    var temp = [];
    resList.forEach((d) => {
      temp.push(d.data());
    });

    setResults(temp);
  };

  useEffect(() => {
    getPhase();
    getResults();
  }, []);

  return (
    <div className="ResultTable">
      <h1>Results</h1>
      {phase !== "results" ? (
        <h1>Results Phase not started! </h1>
      ) : (
        <>
          <div className="ResultListHeader">
            <div>Name</div>
            <div>Party</div>
            <div>Photo</div>
            <div>Votes</div>
          </div>
          <div className="ResultListBody">
            {results.map((d) => {
              return (
                <ResultsRow
                  name={d.name}
                  party={d.party}
                  photo={d.photo}
                  votes={d.votes}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
