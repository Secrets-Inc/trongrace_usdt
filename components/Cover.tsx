// @ts-ignore
// This file intentionally ignores type-checking for various reasons

import styles from "../styles/Cover.module.css"
import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";
// import { useAccount, useConnect, useDisconnect } from 'wagmi';
import TronWeb, { Contract } from 'tronweb';
var crypto = require('crypto');
import { useAdapters } from "../utils/AdaptersContext";

let balance_: number;
let minPurchase_: number;
let maxPurchase_: number;
let bscscanTokenUrl_;
let bscscanContractUrl_;
let audited_;
let totalSupply_;
let tokenForPresale_;
let verified_;
let tokenImageUrl_;
let percentage_;
let defAdminAddress: string = "0x00000"

const Cover: React.FC = () => {
  const adapters = useAdapters();
  // const connectedAddress =  localStorage.getItem("connectedAddress") == null ? adapters[1].address : localStorage.getItem("connectedAddress");
  const connectedAddress = adapters[1].address;

    let tokenData = {
        "id": "1",
        "token": "TGMQP9qdoX6vn3xCoP9p4tWMDz98PrgmKX",
        "presaleContract": "TGMQP9qdoX6vn3xCoP9p4tWMDz98PrgmKX",
        "contractABI": "",
        "tokenIconURL": "",
        "tokenName": "Tron Wealth",
        "tokenSymbol": "USDT",
        "tokenForPresaleInitial": "2",
        "tokenForPresaleNumberOfZeros": "14",
        "totalSupplyInitial": "1",
        "totalSupplyNumberOfZeros": "15",
        "decimals": "4",
        "hardCap": "600",
        "rate": "2600000000",
        "type": "BEP20",
        "presaleRunning": "true",
        "kycVerified": "",
        "smartContractAudit": "",
    }

    const [userbalance, setUserBalance] = useState(0)
    const [totalROI, setTotalROI] = useState(0)
    const [withdrawCount, setWithdrawCount] = useState(0)
    const [nextEarning, setNextEarning] = useState("00:00")
    // const { address, isConnected } = useAccount()
    const [usdtcontract, setUsdtContract] = useState(null)
    const [contract, setContract] = useState<any>(null);
    
  const [notification, setNotification] = useState(false);
  const [txHash, setTxHash] = useState('');
  let address = null

    // let abi = JSON.parse(tokenData.contractABI);
    const abi = [{"entrys":[{"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"Event"},{"name":"claimOwnership","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"_bytecode","type":"bytes"},{"name":"_address","type":"address"}],"inputs":[{"name":"_salt","type":"uint256"}],"name":"getDeposit","stateMutability":"view","type":"function"},{"outputs":[{"type":"bytes7"}],"name":"getFactoryVersion","stateMutability":"pure","type":"function"},{"outputs":[{"type":"address"}],"name":"owner","stateMutability":"view","type":"function"},{"outputs":[{"type":"address"}],"name":"recipient","stateMutability":"view","type":"function"},{"outputs":[{"type":"address"}],"name":"token","stateMutability":"view","type":"function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_salt","type":"uint256"}],"name":"withdraw","stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_anotherAddress","type":"address"},{"name":"_token","type":"address"},{"name":"_salt","type":"uint256"}],"name":"withdrawToAnotherAddress","stateMutability":"nonpayable","type":"function"}]}];
    let contractAddress = tokenData.presaleContract;
    var privateKey = crypto.randomBytes(32).toString('hex');
    

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { 'TRON-PRO-API-KEY': '4e836296-0309-4890-9fb0-8fb6c63021ec' },
      privateKey: privateKey
    });
    

    useEffect(() => {
      console.log(tronWeb.address.toHex("TKBxjzHSPVRZaNo9z5E5wxaSxgi3AKzECo"));
      async function init() {
        const newAccount = await tronWeb.createAccount();
        let rcontract = await tronWeb.contract().at(contractAddress); 
        setContract(rcontract)
      }

      init()
       
        if(connectedAddress != null) {
          // console.log(connectedAddress)
          address = connectedAddress
          minPurchase_ = 0.000001
          maxPurchase_ = 100000000000

          //user details
          contract.getUserBalance(address).call().then((result: any) => {
            if (typeof result === 'number') {
              setUserBalance(result);
            } else {
              console.error('Unexpected result type for getUserBalance:', result);
            }
          }).catch((err: any) => console.log(err));
                
          contract.getUserTotalROI(address).call().then((result: any) => {
            if (typeof result === 'number') {
              setTotalROI(result);
            } else {
              console.error('Unexpected result type for getUserTotalROI:', result);
            }
          }).catch((err: any) => console.log(err));
                
          contract.getUserDepositsCount(address).call().then((result: any) => {
            if (typeof result === 'number') {
              setWithdrawCount(result);
            } else {
              console.error('Unexpected result type for getUserWithdrawCount:', result);
            }
          }).catch((err: any) => console.log(err));
          const buyButton = document.getElementById('buy-button') as HTMLButtonElement | null;
          if (buyButton) {
            buyButton!.disabled = true;
          }
          document.getElementById("buy-button")!.style.background = "black"
          document.getElementById("buy-button")!.style.boxShadow = "none"
          document.getElementById("buy-button")!.style.cursor = "not-allowed"
        }
    }, [])

    useEffect(() => {
    })

    // Convert TRX to SUN
function trxToSun(trxAmount: number) {
  const sunAmount = trxAmount * 1000000;
  return sunAmount;
}

function getRefFromUrl(): string {
  // Get the current URL
  const currentUrl: string = window.location.href;
  // Create a URLSearchParams object
  const urlParams: URLSearchParams = new URLSearchParams(currentUrl);
  // Get the value of the 'ref' parameter
  const refValue: string | null = urlParams.get('ref');
  return refValue == null ? defAdminAddress : refValue;
}

    
const deposit = async (amount: number, refer: string) => {
    try {
      const depositValue = trxToSun(amount); // Specify the amount you want to deposit
      const feeLimitInSun = 5000000;
  
      const tx = await contract.deposit(refer)
        .send({
        callValue: depositValue,
        feeLimit: feeLimitInSun,
      });
      
      setTxHash(tx.transactionHash)
      setNotification(true)
  
      console.log("Transaction hash:", tx.transactionHash);
      alert("Deposit successful!");
    } catch (error) {
      console.error("Error depositing USDT:", error);
    }
  };

  // New function to handle withdrawals
const withdrawToWallet = async () => {
  const feeLimitInSun = 5000000;
  const result = await contract.withdraw().send({
    callValue: 0, // Set callValue as needed
    feeLimit: feeLimitInSun, // Set an appropriate fee limit
    shouldPollResponse: true, // Poll for transaction result
  });
  setTxHash(result.transactionHash)
  setNotification(true)
  };
 // New function to handle reinvests
 const reinvest = async () => {
  const feeLimitInSun = 5000000;
  const result = await contract.reinvest().send({
    callValue: 0, // Set callValue as needed
    feeLimit: feeLimitInSun, // Set an appropriate fee limit
    shouldPollResponse: true, // Poll for transaction result
  });
  setTxHash(result.transactionHash)
  setNotification(true)
  };
  
  function validateExchangeAmount(e: any): void {
    (document.getElementById("error-text") as HTMLElement).style.display = "none";
    (document.getElementById("notice-text") as HTMLElement).style.display = "none";
    console.log(minPurchase_, maxPurchase_);
    let value = (document.getElementById('quantity') as HTMLInputElement).value;
    let walletBalance = balance_ / 10 ** 18;
    let minPurchase = minPurchase_ / 10 ** 18;
    let maxPurchase = maxPurchase_ / 10 ** 18;
    var valid = true;
    if (parseFloat(value) > balance_) {
        (document.getElementById('quantity') as HTMLInputElement).value = Number(walletBalance.toString().slice(0, 6)).toString();
        value = (document.getElementById('quantity') as HTMLInputElement).value;
        (document.getElementById('notice-text') as HTMLElement).innerHTML = "You'll get ~ " + parseFloat(value) * 2 + " " + tokenData.tokenSymbol;
        (document.getElementById('notice-text') as HTMLElement).style.display = "flex";
        validateExchangeAmount(e);
    }
    else if (parseFloat(value) < minPurchase_) {
        valid = false;
        (document.getElementById("error-text") as HTMLElement).innerHTML = "minimum deposit amount is " + minPurchase_ + " USDT";
        (document.getElementById("error-text") as HTMLElement).style.display = "flex";
        (document.getElementById("buy-button") as HTMLButtonElement).disabled = true;
        (document.getElementById("buy-button") as HTMLButtonElement).style.background = "black";
        (document.getElementById("buy-button") as HTMLButtonElement).style.boxShadow = "none";
        (document.getElementById("buy-button") as HTMLButtonElement).style.cursor = "not-allowed";
    }
    else if (parseFloat(value) > maxPurchase_) {
        valid = false;
        (document.getElementById("error-text") as HTMLElement).innerHTML = "maximum deposit amount is " + maxPurchase_ + " USDT";
        (document.getElementById("error-text") as HTMLElement).style.display = "flex";
    }
    if (valid && balance_ > minPurchase_) {
        (document.getElementById('notice-text') as HTMLElement).innerHTML = "You'll get ~ " + parseFloat(value) * 2 + " " + tokenData.tokenSymbol;
        (document.getElementById('notice-text') as HTMLElement).style.display = "flex";
        (document.getElementById("buy-button") as HTMLButtonElement).disabled = false;
        (document.getElementById("buy-button") as HTMLButtonElement).style.background = "linear-gradient(to bottom, rgb(255,180,60),rgb(146, 90, 0))";
        (document.getElementById("buy-button") as HTMLButtonElement).style.boxShadow = "0px 0px 5px rgb(255,180,60)";
        (document.getElementById("buy-button") as HTMLButtonElement).style.cursor = "pointer";
        (document.getElementById("buy-button") as HTMLButtonElement).style.color = "black";
    }
}

function buyButtonPressed(): void {
    let value = (document.getElementById('quantity') as HTMLInputElement).value;
    deposit(parseFloat(value), getRefFromUrl());
}

    bscscanTokenUrl_ = "https://tronscan.org/#/contract/" + tokenData.token;
    bscscanContractUrl_ = "https://tronscan.org/#/contract/" + tokenData.presaleContract;
    tokenImageUrl_ = tokenData.tokenIconURL;
    audited_ = tokenData.smartContractAudit;
    verified_ = tokenData.kycVerified;

    useEffect(() => {
        percentage_ = localStorage.getItem("percentage")
    })

    function copyAddress(): void {
      var copyText = document.getElementById("contract-address") as HTMLElement;
      navigator.clipboard.writeText(copyText.innerHTML);
      alert("Address Copied to Clipboard");
  }
  

    return <>
        <section className={styles.cover}>
            <video autoPlay muted loop className={styles.video}>
                <source src="/cover-video.mp4" type="video/mp4" />
            </video>

            <div className={styles.particlesWrapper}>
                <div id="particles-js"></div>
            </div>
            <div className={styles.tokenPresaleContainer}>
                <div className={styles.tokenPresaleContainerInner} id="presale-container">
                    <div className={styles.cardHeader}>
                        <div className={styles.primeBlock}>
                            <h2 className={styles.tokenNamePrime}>{tokenData.tokenName}</h2>
                            <p className={styles.exchangeMode}>{tokenData.tokenSymbol}</p>
                            <a target="_blank" href={bscscanTokenUrl_} rel="noreferrer">View on Tronscan</a>
                        </div>
                        <div className={styles.badgeHeader}>
                            <a target="_blank" rel="noreferrer" href={tokenData.smartContractAudit} className={styles.auditedBadge} title="Smart Contract Audited" id='audited'><i className="las la-check-circle"></i>Audited</a>

                            <a target="_blank" rel="noreferrer" href={tokenData.kycVerified} className={styles.verifiedBadge} title="KYC Verified" id='verified'><i className="las la-shield-alt"></i>Verified</a>
                        </div>
                    </div>
                  
                    <div className={styles.actionBlockPrime}>
                        <input type="number" className={styles.quantityInput} placeholder="Deposit Amount" id='quantity' onChange={validateExchangeAmount}></input>
                        <small className={styles.balanceText}>Your Wallet Balance: <small id="balance-text"></small> USDT</small>
                        <small id='notice-text' className={styles.noticeText}></small>
                        <small id='error-text' className={styles.errorText}></small>
                        <button className={styles.buyButton} onClick={buyButtonPressed} id='buy-button'>Deposit</button>
                    </div>


                   
                </div>
                <div className={styles.brandText}><Link href={bscscanContractUrl_} target="_blank" rel="noreferrer" id="host">Invest & Earn</Link></div>

            </div>



            <div className={styles.textSection}>

                <h2 className={styles.header}>TRON WEALTH</h2>
                <h4 className={styles.tag} style={{ marginBottom: '0.5rem' }}>
                Balance: {userbalance} USDT
                </h4>
                <h4 className={styles.tag} style={{ marginBottom: '0.5rem' }}>
                Total ROI: {totalROI} USDT
                </h4>
                <h4 className={styles.tag}>
                Number of Deposits: {withdrawCount}
                </h4>


                <div className={styles.actionWrapper}>
                    <a className={styles.actionBtn} onClick={withdrawToWallet}>Withdraw</a>
                    <a className={styles.actionBtn} onClick={reinvest}>Reinvest</a>
                </div>
            </div>
        </section>
        { notification && (
        <div className={styles.contractNoteSection}>
            <p className={styles.contractNote}>This is transaction hash for your latest action, deposit, withdrawal, or reinvestment:</p>
            <p id="contract-address" className={styles.contractAddress}>{txHash}</p><br/>
            <a className={styles.actionBtnCopy} onClick={copyAddress}>Copy Address</a>
        </div> ) }
    </>;
}


export default Cover;
