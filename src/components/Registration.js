import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext.js";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import db from "../auth/Firebase";
import "../styles/Registration.css";

const Registration = ({ smartVote, account }) => {
  const [phase, setPhase] = useState();
  const [tcrId, setRegNumber] = useState();
  const [name, setName] = useState();
  const [dept, setDept] = useState();
  const [walletAddr, setWalletaddr] = useState();
  const [approved, setApprovedStatus] = useState("unregistered");
  console.log(smartVote);
  console.log(account);
  const { currentUser } = useAuth();

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  // const getPhase = async () => {
  //   const phaseStatus = await getDoc(doc(db, "phase", "current-phase"));

  //   setPhase(phaseStatus.data().phase);
  // };

  const getPhase = async (e) => {
    console.log("getPhase called");
    // console.log(account);
    // console.log(smartVote);

    const currentPhase = await smartVote.methods.getPhase().call();
    console.log(currentPhase);
    setPhase(currentPhase);
  };

  useEffect(() => {
    getPhase();
  }, []);

  // const setValues = async () => {
  //   setVal1("");
  //   setVal2("");
  //   const docSnap = await getDoc(doc(db, "voters", currentUser.email));

  //   if (docSnap.exists()) {
  //     const t = docSnap.data();
  //     setRegNumber(t.regNumber);
  //     setWalletaddr(t.walletAddr);
  //   } else console.log("No document exists");
  // };

  const setValues = async () => {
    console.log("setvalues called");
    setVal1("");
    setVal2("");
    const voter = await smartVote.methods.getVoter(account).call();
    console.log(voter);
    // console.log(voter.registration);
    setApprovedStatus(voter.registration);
    setRegNumber(voter.tcrid);
    setDept(voter.department);
    setWalletaddr(voter.walletAddr);
    // console.log(approved);
  };

  useEffect(() => {
    setValues();
  }, []);

  const addVoter = async (e) => {
    e.preventDefault();

    console.log(`Voter Added ${currentUser.displayName}`);

    // await setDoc(doc(db, "voters", currentUser.email), {
    //   name: currentUser.displayName,
    //   email: currentUser.email,
    //   regNumber: val1,
    //   walletAddr: val2,
    //   registration: "unregistered",
    // });
    setWalletaddr(account);
    smartVote.methods
      .addVoter(val1, name, val2, walletAddr, approved)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        window.alert("Successfully registered Voter");
      });
    console.log(name, val1, val2, walletAddr, approved);
    setRegNumber(val1);
    setDept(val2);
    // console.log(tcrId, dept);
    setValues();
  };

  const approvedStatus = async () => {
    // Fetch approved Status from Firebase
    // const appr = await getDoc(doc(db, "voters", currentUser.email));

    // if (appr.data().registration === "registered") setRegistration(true);
    // console.log(registration);
    console.log("approvedStatus called");
    const regStatus = await smartVote.methods.approvedStatus(account).call();
    // console.log(regStatus);
    if (regStatus === "registered") setApprovedStatus("registered");
    else setApprovedStatus("unregistered");

    console.log("approved called");
    // console.log(regStatus);
    // console.log(approved);
  };

  useEffect(() => {
    approvedStatus();
    setName(currentUser.displayName);
    // setValues();
  }, []);

  function maskInfo(text) {
    var string = String(text);
    var replaced =
      string.slice(0, 2) + string.slice(2).replace(/.(?=...)/g, "*");
    // console.log("Replaced:" + replaced);
    return replaced;
  }

  return (
    <div className="Registration">
      <div className="registrationForm">
        <div className="registrationFormCenter">
          <p className="registrationFormTitle">Register Yourself</p>
          {phase === "registration" ? (
            <form className="registrationFormFields">
              <div className="registrationFormField">
                <label
                  className="registrationFormFieldLabel"
                  htmlFor="regNumber"
                >
                  Enter your Registration Number
                  {/* {console.log(tcrId, dept)} */}
                </label>
                <input
                  type="text"
                  id="tcrId"
                  className="registrationFormFieldInput"
                  placeholder="Enter your Registration Number"
                  value={val1}
                  onChange={(e) => setVal1(e.target.value)}
                />
              </div>

              <div className="registrationFormField">
                <label
                  className="registrationFormFieldLabel"
                  htmlFor="metamask"
                >
                  Enter your Department
                </label>
                <input
                  type="password"
                  id="metamask"
                  className="registrationFormFieldInput"
                  placeholder="Enter your Department"
                  value={val2}
                  onChange={(e) => setVal2(e.target.value)}
                />
              </div>

              <div className="registrationFormField">
                <button
                  className="registrationFormFieldButton"
                  onClick={addVoter}
                >
                  Proceed
                </button>
              </div>
            </form>
          ) : (
            <h2>Registrations Phase Over! You can't register now.</h2>
          )}

          <table id="voters">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Registration Number</th>
                <th>Wallet Address</th>
                <th>Department</th>
                <th>Registration Status</th>
              </tr>
              <tr>
                <td>{name}</td>
                <td>{tcrId}</td>
                <td>{dept}</td>
                <td>{maskInfo(walletAddr)}</td>
                {/* {console.log(approvedStatus)} */}
                {approved === "registered" ? (
                  <td>
                    <button className="reg-btn">Registered</button>
                  </td>
                ) : (
                  <td>
                    <button className="unreg-btn">Unregistered</button>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registration;
