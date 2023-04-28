import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import {MTTADDRESS, RVTADDRESS, MTTAbi, RVTAbi} from "./ethereum/MTT"

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionData, setTransactionData] = useState("");
 
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  
  const getallowance = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(MTTADDRESS, MTTAbi, signer)
    const resp = await contract.allowance(document.getElementById("owner").value, document.getElementById("spenderMTTallowance").value)
    alert("allowance is :" + resp/1000000000000000000)
  }

  const approve = async()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(MTTADDRESS, MTTAbi, signer)

    const resp = await contract.approve(document.getElementById("spenderMTTapproveaddress").value, document.getElementById("spenderMTTapproveamount").value)
    setTransactionData(resp.hash)
  }

  const getallowanceRVT = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(RVTADDRESS, RVTAbi, signer)
    const resp = await contract.allowance(document.getElementById("owner").value, document.getElementById("spenderRVTallowance").value)
    alert("allowance is :" + resp/1000000000000000000)
  }

  const approveMTT = async()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(RVTADDRESS, RVTAbi, signer)

    const resp = await contract.approve(document.getElementById("spenderRVTapproveaddress").value, document.getElementById("spenderRVTapproveamount").value)
    setTransactionData(resp.hash)
  }


  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Token</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">MTT</h1>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter owner  address (0x...)"
                    defaultValue={walletAddress}
                    id = "owner"
                  />
                </div>
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender address (0x...)"
                    id = "spenderMTTallowance"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium" onClick={getallowance}>
                    GET allowance
                  </button>
                </div>
              </div>
              <div className="columns">
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender address (0x...)"
                    id = "spenderMTTapproveaddress"
                  />
                </div>
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender amount"
                    defaultValue={1000000000000000000}
                    id = "spenderMTTapproveamount"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium" onClick={approve}>
                    Approve button
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p> {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">RVT</h1>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter owner  address (0x...)"
                    defaultValue={walletAddress}
                    id = "owner"
                  />
                </div>
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender address (0x...)"
                    id = "spenderRVTallowance"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium" onClick={getallowanceRVT}>
                    GET allowance
                  </button>
                </div>
              </div>
              <div className="columns">
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender address (0x...)"
                    id = "spenderRVTapproveaddress"
                  />
                </div>
                <div className="column is-fifths-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter spender amount"
                    defaultValue={1000000000000000000}
                    id = "spenderRVTapproveamount"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium" onClick={approveMTT}>
                    Approve button
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p> {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
