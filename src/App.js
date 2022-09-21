import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/Authcontext";

import WelcomePage from "./pages/Welcomepage";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Adminlogin.js";
import AdminDashboard from "./pages/Admin-Dashboard";
import Vote from "./web3/VoteABI.json";

import Web3 from "web3";

import "./App.css";

class App extends Component {
  // async componentWillMount() {
  //   await this.loadWeb3();
  //   await this.loadBlockchainData();
  // }

  async connectwithMetamask() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();

    this.setState({ account: accounts[0] });

    const networkAdress = "0xaf1c0b08999580BF03EdCC1080DD02E1132fD70D";
    console.log("HHHH");
    if (networkAdress) {
      console.log("Hello");
      const smartVote = new web3.eth.Contract(Vote, networkAdress);
      this.setState({ smartVote });
      console.log("here");
      console.log(smartVote);

      const candidateCount = await smartVote.methods.candidatesCount().call();
      console.log(candidateCount);

      // to be completed
    } else {
      window.alert("SmartVote contract not deployed to detected network.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      smartVote: null,
      loading: true,
    };
  }
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              exact
              path="/admin-login"
              element={
                <AdminLogin
                  loadWeb3={async () => this.connectwithMetamask()}
                  smartVote={this.state.smartVote}
                  account={this.state.account}
                />
              }
            />
            <Route
              exact
              path="/admin-dashboard/*"
              element={
                <AdminDashboard
                  smartVote={this.state.smartVote}
                  account={this.state.account}
                />
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
