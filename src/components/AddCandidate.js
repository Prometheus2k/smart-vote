import React, { useState } from "react";
import "../styles/AddCandidate.css";
import { setDoc, doc } from "firebase/firestore";
import db from "../auth/Firebase";

const AddCandidate = () => {
  const [name, setName] = useState();
  const [party, setParty] = useState();
  const [qual, setQual] = useState();
  const [number, setNumber] = useState();
  const [wallet, setWallet] = useState();
  const [photo, setPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "candidates", number), {
        name: name,
        party: party,
        qualification: qual,
        number: number,
        walletAddr: wallet,
        photo: photo,
        votes: 0,
      });
      alert("Candidate Added Successfully");
      // console.log("Candidate Added Successfully");
    } catch (e) {
      alert("Error : ", e);
      console.log("Error adding document: ", e);
    }
  };

  return (
    <div className="AddCandidate">
      <div className="addCandidateForm">
        <div className="addCandidateFormCenter">
          <p className="addCandidateFormTitle">Add Candidate </p>
          <form className="addCandidateFormFields">
            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="name">
                Candidate Name
              </label>
              <input
                type="text"
                id="name"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="party">
                Candidate Party
              </label>
              <input
                type="text"
                id="party"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate party"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label
                className="addCandidateFormFieldLabel"
                htmlFor="qualification"
              >
                Qualification
              </label>
              <input
                type="text"
                id="qual"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's qualifications"
                value={qual}
                onChange={(e) => setQual(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="number">
                Candidate Number
              </label>
              <input
                type="text"
                id="number"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="wallet">
                Candidate Wallet Address
              </label>
              <input
                type="password"
                id="wallet"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's wallet address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="imageUrl">
                Candidate Photo
              </label>
              <input
                type="text"
                id="photo"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's image url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <button
                className="addCandidateFormFieldButton"
                onClick={handleSubmit}
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
