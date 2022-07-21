import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/Authcontext.js";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import db from "../auth/Firebase";
import "../styles/Registration.css";

const Registration = () => {
  const [phase, setPhase] = useState();
  const [name, setName] = useState();
  const [regNumber, setRegNumber] = useState();
  const [wallet, setWallet] = useState();
  const [approved, setApproved] = useState(false);

  const { currentUser } = useAuth();

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  const getPhase = async () => {
    const phaseStatus = await getDoc(doc(db, "phase", "current-phase"));

    setPhase(phaseStatus.data().phase);
  };

  const setValues = async () => {
    setVal1("");
    setVal2("");
    const docSnap = await getDoc(doc(db, "voters", currentUser.email));

    if (docSnap.exists()) {
      const t = docSnap.data();
      setRegNumber(t.regNumber);
      setWallet(t.walletAddr);
    } else console.log("No document exists");
  };

  const addVoter = async (e) => {
    e.preventDefault();

    console.log(`Voter Added ${currentUser.displayName}`);

    console.log(val1, val2);

    await setDoc(doc(db, "voters", currentUser.email), {
      name: currentUser.displayName,
      email: currentUser.email,
      regNumber: val1,
      walletAddr: val2,
      registration: "unregistered",
    });
    console.log("Document written!");
    setValues();
  };

  const approvedStatus = async () => {
    // Fetch approved Status from Firebase
    const appr = await getDoc(doc(db, "voters", currentUser.email));

    if (appr.data().registration === "registered") setApproved(true);
    console.log(approved);
  };

  useEffect(() => {
    getPhase();
    approvedStatus();
    setName(currentUser.displayName);
    setValues();
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
                  Enter your MetaMask Wallet Address
                </label>
                <input
                  type="password"
                  id="metamask"
                  className="registrationFormFieldInput"
                  placeholder="Enter your Metamask Wallet Address"
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
                <th>Registration Status</th>
              </tr>
              <tr>
                <td>{name}</td>
                <td>{regNumber}</td>
                <td>{maskInfo(wallet)}</td>
                {approved ? (
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
