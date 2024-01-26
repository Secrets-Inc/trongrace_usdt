import type { NextPage } from 'next';
import { useState } from "react";
import { useEffect } from "react";
import Head from 'next/head';
import TronWeb, { Contract } from 'tronweb';
import { useAdapters } from "../utils/AdaptersContext";
import { abi } from './abi';
// const sdk = require('api')('@tron/v4.7.3#17d20r2ql9cidams');


const TronGrace: NextPage = () => {
    const adapters = useAdapters();
    // const connectedAddress = adapters[1].address;
    const [transactionAmount, setTransactionAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [depositLoading, setDepositLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [userbalance, setUserBalance] = useState(0)
    const [totalROI, setTotalROI] = useState(0)
    const [contract, setContract] = useState<any>(null);
    // site-specific
    const [allUsersCount, setAllUsersCount] = useState(0)
    let contractAddress = 'TRpS5N26RSAVz5mAwMA7YnfekD5shHNjHs';
    let defAdminAddress = 'TKBxjzHSPVRZaNo9z5E5wxaSxgi3AKzECo';
    let usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { 'TRON-PRO-API-KEY': '4e836296-0309-4890-9fb0-8fb6c63021ec' },
    });

    useEffect(() => {
        async function init() {
          let rcontract = await tronWeb.contract(abi,contractAddress); 
          console.log("dgdggfggfhg"+rcontract)
          setContract(rcontract)
        }
  
        init()
      }, [])

      useEffect(() => {
        const fetchContractData = async () => {
            let contract = await tronWeb.contract(abi,contractAddress); 
            if (adapters[1].address) {
                tronWeb.setAddress(adapters[1].address);

                contract.getUserStats(adapters[1].address).call().then((result:any) => {
                    setUserBalance(Number(result[0]));
                    setTotalROI(Number(result[1]));
                }).catch((err:any) => console.log(err))              
            }

            contract.getSiteStats().call().then((result:any) => {
                console.log('Site: '+ result)
                setAllUsersCount(result)
            }).catch((err:any) => console.log(err))

        };

        fetchContractData();
    }, [adapters[1].address, contract]);
    
    

  // Convert TRX to SUN
  function trxToSun(trxAmount: number) {
    const sunAmount = trxAmount * 1000000;
    return sunAmount;
  }

  
  async function connectWallet() {
    console.log('pressed'+adapters[1].address);
    setLoading(true);
    if(adapters[1].address == null) {
        try {
            await adapters[1].connect(); 
            console.log('ssspressed'+adapters[1].address);  
            setLoading(false);         
        } catch (error) {
            console.log('connect:' + error);
            setLoading(false);  
        }
    } else {
      try {
        await adapters[1].disconnect();
        setLoading(false);  
      } catch (error) {
        console.log('disconnect:' + error);
        setLoading(false);  
      }
    }
  }

  async function depositUSDT(amount:number, referrerAddress:string) {
    try {
        // Prepare the parameters for the TronGrace contract deposit function
        const functionSelector = 'deposit(uint256,address)';
        const params = [
            { type: 'uint256', value: amount*1000000 },      // The amount of USDT to deposit
            { type: 'address', value: referrerAddress }  // Referrer address
        ];
        const options = {
            feeLimit: 100000000,
            callValue: 0,
            shouldPollResponse: true
        };

        // Trigger the smart contract function
        const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
            contractAddress,  // Replace with your TronGrace contract address
            functionSelector,
            options,
            params,
            adapters[1].address  // User's address
        );

        // Sign the transaction with WalletConnect
        const signedTransaction = await adapters[1].signTransaction(transaction.transaction);

        // Broadcast the transaction
        const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);
        console.log('Deposit transaction receipt', receipt);

        return receipt;
    } catch (error) {
        console.error('Error during deposit:', error);
        throw error;
    }
}

async function approveUSDT(amount:number) {
    try {
        // Prepare the parameters for the USDT contract's approve function
        const functionSelector = 'approve(address,uint256)';
        const params = [
            { type: 'address', value: contractAddress }, // The TronGrace contract address
            { type: 'uint256', value: amount * 1000000 }           // The amount of USDT to approve, converted to smallest unit
        ];
        const options = {
            feeLimit: 100000000,
            callValue: 0,
            shouldPollResponse: true
        };

        // Trigger the smart contract function
        const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
            usdtContractAddress, // The USDT contract address
            functionSelector,
            options,
            params,
            adapters[1].address  // User's address
        );

        // Sign the transaction with WalletConnect
        const signedTransaction = await adapters[1].signTransaction(transaction.transaction);

        // Broadcast the transaction
        const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);
        console.log('USDT Approval transaction receipt', receipt);

        return receipt;
    } catch (error) {
        console.error('Error during USDT approval:', error);
        throw error;
    }
}
  
  function getRefFromUrl() {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    const refValue = urlParams.get('ref');
    return refValue == null ? defAdminAddress : refValue;
  }

  async function signAndBroadcast(functionName:string,options:any, parameter:any) {
    try {
      const unSignedTransaction = await tronWeb.transactionBuilder
                .triggerSmartContract(contractAddress,functionName, options,parameter,adapters[1].address);
        // using adapter to sign the transaction
        const signedTransaction = await adapters[1].signTransaction(unSignedTransaction);
        console.log("Signed "+ signedTransaction);
        // broadcast the transaction
        await tronWeb.trx.sendRawTransaction(signedTransaction); 
        console.log('Broadcast');       
    } catch (error) {
        console.log("Sign and Broadcast error: ", error)
    }
  }
         
const deposit = async () => {
    if(transactionAmount == 0 && adapters[1].address==null && depositLoading) {
        return;
    }
    setDepositLoading(true);
    try {
    await approveUSDT(transactionAmount);
    await depositUSDT(transactionAmount, getRefFromUrl());
      setTransactionAmount(0);
      setDepositLoading(false);
      alert("Deposit successful!");
    } catch (error) {
      console.error("Error depositing USDT:", error);
      setDepositLoading(false);
    }
  };

  const withdraw = async () => {
    if (transactionAmount === 0 || adapters[1].address === null) {
        return;
    }

    setWithdrawLoading(true);
    try {
        // Prepare the parameters for the withdraw function
        const functionSelector = 'withdraw(uint256,bool,bool)';
        const withdrawValue = trxToSun(transactionAmount); // Convert the transaction amount
        const params = [
            { type: 'uint256', value: withdrawValue },
            { type: 'bool', value: false },
            { type: 'bool', value: false }
        ];
        const options = {
            feeLimit: 100000000,
            callValue: 0,
            shouldPollResponse: true
        };

        // Trigger the smart contract function
        const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
            contractAddress,  // Replace with your contract address
            functionSelector,
            options,
            params,
            adapters[1].address  // User's address
        );

        // Sign the transaction with WalletConnect
        const signedTransaction = await adapters[1].signTransaction(transaction.transaction);

        // Broadcast the transaction
        const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);
        console.log('Withdraw transaction receipt', receipt);

        setTransactionAmount(0);  // Reset the transaction amount
        setWithdrawLoading(false);
    } catch (error) {
        console.error('Error during withdrawal:', error);
        setWithdrawLoading(false);
    }
};

    return <>
<Head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="/TronGrace_files/cows.css" />
    <script src="/TronGrace_files/analytics.js" type="text/javascript"></script>
    <script type="text/javascript" src="/TronGrace_files/bundle-playback.js"></script>
    <script type="text/javascript" src="/TronGrace_files/wombat.js"></script>
    <script>{'window.RufflePlayer=window.RufflePlayer||{};window.RufflePlayer.config={"autoplay":"on","unmuteOverlay":"hidden"};'}</script>
    <script type="text/javascript" src="/TronGrace_files/ruffle.js"></script>
    <script src="/TronGrace_files/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/TronGrace_files/banner-styles.css"/>
    <link rel="stylesheet" type="text/css" href="/TronGrace_files/iconochive.css"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>TronGrace</title>
    <meta name="description" content="TronGrace.online Next generation community program"/>
    <meta name="keywords" content="dApp, tron network, tron platform, defi, decentralized network program, TronGrace, TronGrace.online"/>
    <meta name="robots" content="index, follow"/>
    <link rel="apple-touch-icon" sizes="180x180" href="https://web.archive.org/web/20221208185040im_/https://trongrace1.space/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="https://web.archive.org/web/20221208185040im_/https://trongrace1.space/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="https://web.archive.org/web/20221208185040im_/https://trongrace1.space/favicon-16x16.png"/>
    <link rel="mask-icon" href="https://web.archive.org/web/20221208185040im_/https://trongrace1.space/safari-pinned-tab.svg" color="#5bbad5"/>
    <meta name="msapplication-TileColor" content="#da532c"/>
    <meta name="theme-color" content="#ffffff"/>
    <link rel="stylesheet" href="/TronGrace_files/style532d.css"/>
    <link rel="stylesheet" href="/TronGrace_files/line-awesome.min.css"/>
    <link rel="stylesheet" href="/TronGrace_files/chicken.css" />
    <link rel="stylesheet" href="/TronGrace_files/bootstrap.min.css"/>
    <script src="/TronGrace_files/jquery-3.5.1.min.js"></script>
    <script src="/TronGrace_files/bootstrap.min.js"></script>
</Head>

<body data-new-gr-c-s-check-loaded="14.1150.0" data-gr-ext-installed="">
 
    <div id="mobileMenu">
        <a href="#!" className="closes"><i className="fa fa-times-circle-o"></i></a>
        <div className="menu">
            <a className="normal-link scroll" href="#TronGrace">About us</a>
            <a className="normal-link  scroll" href="#papers">Plans</a>
            <a className="normal-link  scroll" href="#code">Referral Link</a>
            <a className="normal-link scroll" href="#affiliate">Affiliate</a>
            <a className="deposit" href="#!">Contract</a>

        </div>
    </div>

    <header>
        <div className="container">

            <div className="row position-relative">
                <div className="col-md-3 col-sm-5 col-6 logo">
                    <a href="/" style={{display: 'inline-block', position: 'relative', zIndex: '99'}}><img src="/TronGrace_files/logo-footer.png" alt=""/></a>
                </div>

                <div className="col-md-9 col-sm-7 col-6 collapses">
                    <div className="float-right">
                        <a className="normal-link scroll" href="#TronGrace">About us</a>
                        <a className="normal-link  scroll" href="#papers">Plans</a>
                        <a className="normal-link  scroll" href="#code">Referral Link</a>
                        <a className="normal-link scroll" href="#affiliate">Affiliate</a>
                        <a className="deposit" href="#!">Contract</a>
                    </div>
                    {/* <button id="hamburger_btn" type="button" className="btn btn-outline-light btn-sm"><i className="fa fa-bars"></i>
                    </button> */}
                </div>
                {/* <div className="customBtn">
                    <a href="#!" target="_blank">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        New Smart Contract
                    </a>
                </div> */}
                <div className="col-md-6 header-left">
                    <h2 style={{textTransform: 'uppercase'}}>
                        <span>Earn 5 - 18% Daily</span></h2>
                    <h4 style={{fontSize:'32px', color: '#fff'}}>
                        100% Decentralized, No Admins </h4>
                            <p>
                                Accelerate gains with 15% in referral commissions (4 - levels) 
                            </p>
                            { adapters[1].address && (
                                <div>
                                     <p>Your Balance: <b>{userbalance} USDT</b></p>
                                     <p>Total ROI: <b>{totalROI} USDT</b></p>
                                     {/* <p>Number of Deposits : <b>{depositsCount}</b></p>
                                     <p>Total Referral Earned: <b>{referralTotalEarned} USDT</b></p> */}
                                </div>
                               
                            )}
                            <a href="#!" onClick={() => connectWallet()} className="btn-purple">{ loading?'...loading': adapters[1].address ?  "..."+adapters[1].address.slice(-4)  : "Connect Wallet"}</a>
                            <a href="/TronGrace_files/TronGrace.pdf" target="_blank" className="btn-white" style={{marginLeft: '10px'}}>Presentation (PDF) </a>
                </div>


                <div className="col-md-6 header-right">
                    <div className="video">
                        <h5 style={{color: '#fff'}}>To deposit/withdraw (USDT) (2 approvals)</h5>
                        <br/>
                        <div className="center-input">
                            <input type="number" className="form-control" id="numericInput" value={transactionAmount}
                                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                            pattern="[0-9]*" placeholder="Enter amount" required/>
                        </div>
                        <br/>
                        <div className="a-center-input">
                            <a href="#!" className="btn-purple" onClick={deposit}>{depositLoading ? '...check your wallet' :'Deposit'}</a>
                            <a href="#!" className="btn-white" onClick={withdraw} style={{marginLeft: '10px'}}>{withdrawLoading ?'...check your wallet':'Withdraw' }</a>
                           </div>
                            
                    </div>
                </div>
            </div>
        </div>
    </header>


    <nav className="nav social-fixed" style={{justifyContent: 'center'}}>
        <a className="nav-link bg-tel py-3 px-1 rounded d-flex align-items-center justify-content-center text-white mb-2" href="https://t.me/successpowerteamv2"><i className="la la-telegram fa-lg"></i></a>
    </nav>
    <div id="content">
        <div id="TronGrace">
            <div className="container">
                <div className="row" style={{marginTop: '60px'}}>

                    <div className="col-md-12 mt-5 mb-3 default-title">
                        <h3>Why Choose <span>TronGrace</span> Platform?</h3>
                    </div>

                    <div className="col-md-4 tron-box">
                        <div className="tron-min">
                            <img src="/TronGrace_files/trans.svg" width="55" alt=""/>
                            <h4>TRANSPARENCY</h4>
                            <hr/>
                            <p className="mb-0">
                                You can transparently view all transactions and details that have been made since the
                                date the Smart Contract was created. </p>
                        </div>
                    </div>

                    <div className="col-md-4 tron-box">
                        <div className="tron-min">
                            <img className="filter" src="/TronGrace_files/decentralized.svg" width="52" alt=""/>
                            <h4>DECENTRALIZED</h4>
                            <hr/>
                            <p className="mb-0">
                                TronGrace is not managed by anyone, including its own software team. It is developed as
                                a fully automatic system. Nobody has access to funds. Your funds are secured between you
                                and the smart contract. </p>
                        </div>
                    </div>

                    <div className="col-md-4 tron-box">
                        <div className="tron-min">
                            <img src="/TronGrace_files/save.png" width="47" alt=""/>
                            <h4>HIGH SECURITY</h4>
                            <hr/>
                            <p className="mb-0">
                                Smart contracts are a part of Blockchain technology. Blockchain is a secure technology
                                that no hacker can access. </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="code">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 mt-5 line-12">
                        <div className="line"></div>
                        <img src="/TronGrace_files/cube.png" alt=""/>
                        <div className="line mr"></div>
                    </div>
                    <div className="col-md-11 mt-4 pl-0">
                        <div className="report">
                            <img className="codes" src="/TronGrace_files/coding.png" alt=""/>
                            <div className="code-box">
                                <h4>Copy your referral Link
                                </h4>
                                <h4 style={{color: '#fff'}}>
                                    And invite users so that you earn your commission now!</h4>
                            </div>
                            <div className="card-link">
                                <img src="/TronGrace_files/logo-2.png" alt=""/>
                                <a href="#!">Copy your referral link</a>
                            </div>
                        </div>
                        <div className="whats-link">


                            <div className="what-box">
                                <strong>Total Contributed Amount</strong>
                                <a href="#!" className="not-click">
                                    <span className="right-numb">
                                        <span id="totalInvested1" className="number">0</span>
                                        <b> Current Bonus : <i id="userPercentRate1"> 0%</i></b>
                                    </span>
                                    <img src="/TronGrace_files/link.png" alt=""/>

                                </a>
                            </div>

                            <div className="what-box mt-3">
                                <strong>Total Active Participants</strong>
                                <a href="#!" className="not-click">
                                    <span className="right-numb">
                                        <span id="totalUsers" className="number numb-copy">0</span>
                                    </span>
                                    <img src="/TronGrace_files/link.png" alt=""/>

                                </a>
                            </div>
                        </div>
                    </div>
                     {/* <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-5"></div>
                            <div className="col-md-7 pl-0">
                                <div className="whats-text">
                                    <h4>Platform details: </h4>
                                </div>
                            </div>
                        </div>
                    </div>  */}
                </div>
            </div>
        </div>

        <div id="lines">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5 line-12">
                        <div className="line"></div>
                        <img src="/TronGrace_files/cube.png" alt=""/>
                        <div className="line mr"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="downloads">
            <div className="white-dot"></div>
            <div className="blue-dot"></div>
            <div className="container">

                <div className="row">
                    <div className="col-md-6 down-text-left">
                        <p className="mb-0">
                            <span>How </span> it works? </p>
                    </div>
                    <div className="col-md-6 down-text-right">
                        <p className="mb-0">
                        </p>
                    </div>

                    <div className="col-md-3 download-box">
                        <div className="download-min">
                            <div className="circle">
                                <img src="/TronGrace_files/cube-white.png" alt=""/>
                            </div>
                            <div className="top-title">
                                <hr/>
                                <div className="left-title">
                                    01
                                </div>
                                <div className="right-title">
                                    <strong>
                                        Get USDT (TRC20) </strong>
                                </div>
                            </div>
                            <div className="title-content">
                                <hr/>
                                <p>
                                    You can easily acquire USDT from the most popular platforms. After purchasing USDT,
                                    you can transfer it to your personal wallet, and then transfer it to TronGrace
                                    smart-contract address. </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 download-box">
                        <div className="download-min">
                            <div className="circle">
                                <img src="/TronGrace_files/download_(1).png" alt=""/>
                            </div>
                            <div className="top-title">
                                <hr/>
                                <div className="left-title">
                                    02
                                </div>
                                <div className="right-title">
                                    <strong>
                                        Download the wallet app for Browser or Mobile </strong>
                                </div>
                            </div>
                            <div className="title-content">
                                <hr/>
                                <p>
                                    We recommend to use: Trust Wallet, or alternatively Binance / Tronlink.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 download-box">
                        <div className="download-min">
                            <div className="circle">
                                <img src="/TronGrace_files/document.png" alt=""/>
                            </div>
                            <div className="top-title">
                                <hr/>

                                <div className="left-title">
                                    03
                                </div>
                                <div className="right-title">
                                    <strong>
                                        Send USDT to our Smart Contract
                                    </strong>
                                </div>
                            </div>
                            <div className="title-content">
                                <hr/>
                                <h4>
                                    <a className="deposit" href="#!">
                                        <center className="cont">Enter amount and press deposit</center>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 download-box">
                        <div className="download-min">
                            <div className="circle">
                                <img src="/TronGrace_files/investment.png" alt=""/>
                            </div>
                            <div className="top-title">
                                <hr/>
                                <div className="left-title">
                                    04
                                </div>
                                <div className="right-title">
                                    <strong>
                                        Start Earning
                                    </strong>
                                </div>
                            </div>
                            <div className="title-content">
                                <hr/>

                                <p>
                                    Congratulations. You have joined the unique world of TronGrace. You can find all
                                    your relevant information at the top of this page and you can withdraw your money
                                    from this screen whenever you want.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="whats">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-3 line-12">
                        <div className="line"></div>
                        <img src="/TronGrace_files/cube.png" alt=""/>
                        <div className="line mr"></div>
                    </div>
                    <div className="col-md-12 default-title">
                        <h3>Communıty Program</h3>
                    </div>
                    <div className="col-md-4 what-box">
                        <div className="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt=""/>
                            <span>Minimum contribution amount:</span>
                            <strong>10 USDT</strong>
                        </div>
                    </div>
                    <div className="col-md-4 what-box">
                        <div className="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt=""/>
                            <span>Maximum contribution:</span>
                            <strong>40.000.000 USDT</strong>
                        </div>
                    </div>
                    <div className="col-md-4 what-box">
                        <div className="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt=""/>
                            <span>Total Rewards:</span>
                            <strong>300%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="papers">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5 line-12">
                        <div className="line"></div>
                        <img src="/TronGrace_files/cube.png" alt=""/>
                        <div className="line mr"></div>
                    </div>

                    <div className="col-md-12 mb-4 mt-2 default-title">
                        <h3></h3>
                    </div>
                    <div className="col-md-6 paper-left">
                        <img src="/TronGrace_files/paper.png" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-md-6 paper-right">
                        <div className="row">
                            <div className="col-md-12 paper-box">
                                <div className="paper-min">
                                    <img src="/TronGrace_files/high.svg" style={{transform: 'rotate(90deg)'}} width="30" alt=""/>
                                    <h4>LEADER PLAN:</h4>
                                    <p><span style={{fontWeight:'bold'}}>18%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style={{fontWeight:'bold'}}>15000 USDT</span></p>
                                </div>
                            </div>
                            <div className="col-md-6 paper-box">
                                <div className="paper-min">
                                    <img src="/TronGrace_files/hand.svg" width="30" alt=""/>
                                    <h4>PROFESSIONAL PLAN:</h4>
                                    <p><span style={{fontWeight:'bold'}}>11%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style={{fontWeight:'bold'}}>5000 USDT</span></p>
                                </div>
                            </div>
                            <div className="col-md-6 paper-box">
                                <div className="paper-min">
                                    <img src="/TronGrace_files/incentive.svg" width="30" alt=""/>
                                    <h4>WAGON PLAN:</h4>
                                    <p><span style={{fontWeight:'bold'}}>7%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style={{fontWeight:'bold'}}>2000 USDT</span></p>
                                </div>
                            </div>
                            <div className="col-md-6 paper-box">
                                <div className="paper-min">
                                    <img src="/TronGrace_files/money.svg" width="30" alt=""/>
                                    <h4>BASIC PLAN:</h4>
                                    <p><span style={{fontWeight:'bold'}}>5%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style={{fontWeight:'bold'}}>50 USDT</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="affiliate">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 line-12">
                        <div className="line"></div>
                        <img src="/TronGrace_files/cube.png" alt=""/>
                        <div className="line mr"></div>
                    </div>
                    <div className="col-md-6 ref-link">
                        <div className="row">
                            <div className="col-md-3  col-sm-3 col-12 ref-box">
                                <a href="#!" className="active">
                                    <img src="/TronGrace_files/commision.png" alt=""/>
                                    <strong>Referral <span className="d-block"></span></strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">01</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">15%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">02</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">10%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">03</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">7%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">07</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">06</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">05</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">04</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">5%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">08</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">09</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span className="numb">10</span>
                                    <span className="text">Level</span>
                                    <strong className="d-block">0%</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="program">
                <div className="row m-0">
                    <div className="col-md-6"></div>
                    <div className="col-md-6  pr-0">
                        <div className="program-box">
                            <div className="program-text">
                                <img src="/TronGrace_files/affiliate-marketing.png" alt=""/>
                                <h5>Affiliate Program</h5>
                                <p>
                                    An affiliate program designed to suit very large teams can generate a significant
                                    increase in total revenue. Referral rewards instantly come out of the smart contract
                                    into your main wallet where only You have your private key. <br/>Note: All Affiliate
                                    revenue is automatically distributed to wallets.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-4 footer-box" style={{alignSelf: 'center'}}>
                    <a href="#!" className="logo-mb hide-mb"><img src="/TronGrace_files/logo-footer.png" className="img-fluid" alt=""/></a>

                    <ul className="social">
                        <li>
                            <a href="https://t.me/successpowerteamv2" target="_blank">
                                <span className="left-social"><img src="/TronGrace_files/paper-plane.png" width="21" alt=""/></span>
                                <span className="right-social">
                                    Main Telegram Group:
                                    <strong>successpowerteamv2</strong>
                                </span>
                            </a>
                        </li>
                        <li>
                        <a href="#">
                            <span className="left-social"><img src="/TronGrace_files/paper-plane.png" width="18" alt=""/></span>
                            <span className="right-social">
                              For Networkers:
                            <strong>TronGracev2offical</strong>
                        </span>
                        </a>
                    </li> 
                    </ul>
                </div>
                <div className="col-md-4 footer-box text-center">
                    <a href="#!" className="logo"><img src="/TronGrace_files/logo-footer.png" className="img-fluid" alt=""/></a>
                    <p className="copyright">© 2024 All Rights Reserved TronGrace.online</p>
                    <p className="copyright"> </p>


                    <a href="https://tronscan.org/#/contract/TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d" target="_blank" className="link">
                        <span id="p1">TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d</span></a>

                    <div className="dropdown show">

                    </div>

                </div>

                <div className="col-md-4 footer-box text-right" style={{alignSelf: 'center'}}>
                    <div className="chat_wrapper">
                        <a href="https://t.me/successpowerteamv2" target="_blank" className="chat_box">
                            <i className="fa fa-link"></i>
                            <span className="text">TronGrace Chat</span>
                            <span className="robocop"><img src="/TronGrace_files/robot.png" alt="/"/></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script>
        const sevenRandom = Math.floor(100000 + Math.random() * 9000000);
    </script>

    <script src="/TronGrace_files/jquery.min.js"></script>
    <script src="/TronGrace_files/bootstrap.min.js"></script>
    <script src="/TronGrace_files/popper.min.js"></script>
    <script src="/TronGrace_files/swiper.min.js"></script>
    <script src="/TronGrace_files/design532d.js"></script>
    <script src="/TronGrace_files/designweb3.js"></script>
    <script src="/TronGrace_files/sweetalert.min.js"></script>
</body>
    
</>;
};

export default TronGrace;