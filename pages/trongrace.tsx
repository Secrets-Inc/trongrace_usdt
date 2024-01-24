import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './styles/Home.module.css';
import Link from "next/link";

const Home: NextPage = () => {
  
    return <>
<Head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="/TronGrace_files/cows.css" />
    <script src="/TronGrace_files/analytics.js" type="text/javascript"></script>

<script type="text/javascript" src="/TronGrace_files/bundle-playback.js"></script>
<script type="text/javascript" src="/TronGrace_files/wombat.js"></script>
<script>window.RufflePlayer=window.RufflePlayer||{};window.RufflePlayer.config={"autoplay":"on","unmuteOverlay":"hidden"};</script>
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
    <script>
        $(document).ready(function () {
            $("#myModal").modal('show');
        });
    </script>
</Head>

<body data-new-gr-c-s-check-loaded="14.1150.0" data-gr-ext-installed="">
 
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="modal-body">
                    <div class="text-center">
                        <h2>PERSONAL WALLET</h2>
                        <p>Your <img src="/TronGrace_files/tronicon.png" alt="">
                            <span>TRX</span> wallet address:</p>
                    </div>
                    <form action="#!" method="post">
                        <input class="form-control" id="walletAddress" placeholder="loading" readonly="">
                    </form>


                    <div class="item-boxes">
                        <div class="row">
                            <div class="col-md-6 item-box">
                                <div class="item-min">
                                    <div class="top-item">
                                        <img src="/TronGrace_files/item-1.png" class="float-left" alt="">
                                        <span class="float-left">Your current daily rewards:</span>
                                    </div>
                                    <strong>+</strong><strong id="userPercentRate">0</strong><strong>%</strong>
                                </div>
                            </div>
                            <div class="col-md-6 item-box">
                                <div class="item-min bg-min">
                                    <div class="top-item">
                                        <img src="/TronGrace_files/item-2.png" class="float-left mob-min" alt="">
                                        <div class="list float-left">
                                            <p class="mb-0">
                                                Basic Rewards:+1%<br>
                                                Hold-bonus: <b>+</b><b id="holdPercentRate">0</b><b>%</b><br>
                                                Contract bonus: <b>+</b><b>0.0%</b><b id="contractBonusRate" style="visibility: hidden">0</b><br>
                                                Leader bonus: <b>+</b><b id="leaderBonusRate">0</b><b>%</b><br>
                                                Community bonus : <b>+</b><b id="communityBonusRate">0</b><b>%</b><br>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <hr>
                            </div>
                            <div class="col-md-6 item-box">
                                <div class="item-min">
                                    <div class="top-item">
                                        <span class="float-left"> Available withdraw balance</span>
                                    </div>
                                    <div class="egs">
                                        <img src="/TronGrace_files/item-3.png" alt="">
                                        <strong id="userAvailable">0</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 item-box">
                                <div class="item-min bg-right">
                                    <div class="top-item text-center">
                                        <span> Request withdraw</span>
                                        <a href="#!" id="withdrawbutton"><i class="fa fa-link"></i> WITHDRAW </a>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="with-text">
                        <p>
                            Click Withdraw button, and you will get instantly all your deposits earnings with a single
                            transaction. Your personal hold-bonus will be reset. When withdrawing then you should have
                            between 4-100 TRX on your wallet balance for blockchain fees. Withdraw fee increases
                            gradually as the number of deposits increases. </p>
                    </div>

                    <hr>

                    <div class="item-boxes mb-2">
                        <div class="row">
                            <div class="col-md-6 item-box mb-4">
                                <div class="item-min">
                                    <div class="top-item">
                                        <span class="float-left"> Total Deposited</span>
                                    </div>
                                    <div class="egs">
                                        <img src="/TronGrace_files/item-3.png" alt="">
                                        <strong id="totalInvested">0</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 item-box mb-4">
                                <div class="item-min bg-right">
                                    <div class="top-item">
                                        <span class="float-right text-right">Number of deposits: <span style="color: #6daefe;" id="totalNumberOfDeposits">0</span> <br>
                                            <br> <span style="display:none;" id="userCheckpoint"></span></span>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6 item-box">
                                <div class="item-min">
                                    <div class="top-item">
                                        <span class="float-left">Total earned</span>
                                    </div>
                                    <div class="egs">
                                        <img src="/TronGrace_files/item-3.png" alt="">
                                        <strong id="totalEarned">0</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 item-box">
                                <div class="item-min bg-right">
                                    <div class="top-item text-right">
                                        <span class="float-right">Total withdrawn</span>
                                    </div>
                                    <div class="egs float-right">
                                        <strong class="mr-2" id="totalWithdrawn">0</strong>
                                        <img style="transform: scale(-1, 1);margin-right: 0;" src="/TronGrace_files/item-3.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>


                    <div class="referral-link">
                        <h5>COPY REFERRAL LINK</h5>
                        <input type="text" id="reflinkdisplay" placeholder="loading" readonly="">
                        <a href="javascript:copyFunction()" onclick="myFunction()"><i class="fa fa-link"></i> COPY</a>
                        <p>
                            Share this link with your partners to get referral rewards <br>
                            You should have active deposit to unlock affiliate bonuses! </p>
                    </div>
                    <script>
                        function myFunction() {
                            var copyText = document.getElementById("reflinkdisplay");
                            copyText.select();
                            copyText.setSelectionRange(0, 99999)
                            document.execCommand("copy");
                            alert("Copied : " + copyText.value);
                        }
                    </script>
                    <div class="item-boxes ">
                        <div class="row">
                            <div class="col-md-6 item-box mb-2">
                                <div class="item-min">
                                    <div class="top-item">
                                        <span class="float-left">Referral rewards:</span>
                                    </div>
                                    <div class="egs">
                                        <img src="/TronGrace_files/item-3.png" alt="">
                                        <strong id="refRewards">0</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 item-box mb-2">
                                <div class="item-min bg-right">
                                    <div class="top-item pl-3">
                                        <img src="/TronGrace_files/signal.png" class="mt-3 signal float-left" alt="">
                                        <div class="list float-left ml-0 pl-3" style="width: 75%;">
                                            <p class="mb-0 w-50  float-left" style="line-height: 15px;">
                                                1st Level: <b id="ref1"> 0 </b><br>
                                                2nd Level: <b id="ref2">0</b><br>
                                                3rd Level: <b id="ref3">0</b><br>
                                                4th Level: <b id="ref4"> 0</b><br>
                                                5th Level: <b id="ref5">0</b><br>
                                                6th Level: <b id="ref6">0</b>
                                            </p>
                                            <p class="mb-0 w-50  float-left" style="line-height: 15px;">
                                                7th Level: <b id="ref7">0 </b><br>
                                                8th Level: <b id="ref8">0</b> <br>
                                                9th Level: <b id="ref9">0</b> <br>
                                                10th Level: <b id="ref10">0</b> <br>
                                                11th Level: <b id="ref11">0</b>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12 text-center">
                                <a href="https://t.me/successpowerteamv2" target="_blank" class="linked"><i class="fa fa-link"></i> PROMO MATERIALS</a>
                                <!--<a href="http://TronGrace.live/" target=_blank class="linked"><i class="fa fa-link"></i> TronGrace NETWORK</a>-->
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="modal-body">
                    <div class="text-center">
                        <h2>MAKE NEW CONTRIBUTION</h2>
                        <p class="mt-4">Specify deposit <span class="ballon">TRX</span> amount here:</p>
                    </div>
                    <form action="#!" method="post">
                        <input type="text" class="form-control" id="trxValue1" value="1000">
                    </form>


                    <span id="contributeAddresss" style="color:#fff; display:flex;">Loading...<div class="loader"></div>
                    </span>
                    <div class="referral-link text-center" id="contributeAddress" style="display:none;"> <a href="#!" id="investButton1"><i class="fa fa-link"></i> CONTRIBUTION</a></div>


                    <div class="what-lorem">
                        <img src="/TronGrace_files/user (6).png" alt=""> <span>upline partner wallet:</span><br>
                        <a href="#!" id="upline">No upline</a>
                    </div>

                    <hr>

                    <ul class="lorem-ul">
                        <li><i class="fa fa-warning"></i> <span>IMPORTANT!</span> Do not forget about blockchain fee!
                            You should have <b>40-60 TRX </b> more on your wallet, or your transaction will get *out of
                            energy* status! </li>
                        <li><i class="fa fa-check"></i> Minimum contribution amount <span>100 TRX</span>

                        </li>
                        <li><i class="fa fa-check"></i> We are working only with: <span>TRON (TRX) </span>
                            cryptocurrency</li>
                        <li><i class="fa fa-check"></i> Your contribution will be activated after <span>1 confirmation
                            </span> in blockchain</li>
                        <li><i class="fa fa-check"></i> Withdrawable rewards come instantly to your secure wallet
                            balance’, which is accessible only to You</li>
                    </ul>

                </div>

            </div>
        </div>
    </div>

    <!-- ///////////////////// -->


    <div class="modal fade" id="exampleModal69" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="modal-body">
                    <div class="text-center">
                        <h2>New Smart Contract</h2>
                    </div>
                    <!-- <form action="#" method="post">
                    <input type="text" class="form-control" id="trxValue1" value="1000">
                </form> -->
                    <div class="referral-link text-center" id="contributeAddress"> <a href="https://web.archive.org/web/20221208185040/https://trongrace.io/" target="_blank" id="investButton1"><i class="fa fa-link"></i> TronGrace.io</a></div>

                    <!-- <div class="what-lorem">
                    <img src="assets/img/user%20(6).png" alt=""> <span>upline partner wallet:</span><br>
                    <a href="#" id="upline">New Link</a>
                </div>

                <hr>

                <ul class="lorem-ul">
                    <li><i class="fa fa-warning"></i> <span>IMPORTANT!</span>  Do not forget about blockchain fee! You should have <b>40-60 TRX </b> more on your wallet, or your transaction will get *out of energy* status!                    </li>
                    <li><i class="fa fa-check"></i> Minimum contribution amount <span>100 TRX</span>
                        
                    </li>
                    <li><i class="fa fa-check"></i>  We are working only with:                        <span>TRON (TRX) </span> cryptocurrency</li>
                    <li><i class="fa fa-check"></i> Your contribution will be activated after                        <span>1 confirmation </span> in blockchain</li>
                    <li><i class="fa fa-check"></i> Withdrawable rewards come instantly to your secure wallet balance’, which is accessible only to You</li>
                </ul> -->

                </div>

            </div>
        </div>
    </div>

    <!-- /////////////////////// -->










    <div id="mobileMenu">
        <a href="#!" class="closes"><i class="fa fa-times-circle-o"></i></a>
        <div class="menu">
            <a class="normal-link scroll" href="#TronGrace">About us</a>
            <!--     <a class="normal-link scroll" href="#code">Secure Platform</a> -->
            <a class="normal-link  scroll" href="#!papers">Marketing Plan</a>
            <!--<a class="normal-link" href="representative.html" target=_blank >Representatives</a>-->
            <a class="normal-link" data-toggle="modal" data-target="#exampleModal" href="#!">Personal Wallet</a>
            <a class="normal-link" data-toggle="modal" data-target="#exampleModal2" href="#!">Contribution</a>

        </div>
    </div>

    <header>
        <div class="container">

            <div class="row position-relative">
                <div class="col-md-3 col-sm-5 col-6 logo">
                    <a href="/" style="display: inline-block; position: relative; z-index: 99;"><img src="/TronGrace_files/logo-footer.png" alt=""></a>
                </div>

                <div class="col-md-9 col-sm-7 col-6 collapses">
                    <div class="float-right">
                        <a class="normal-link scroll" href="#TronGrace">About us</a>
                        <!-- <a class="normal-link scroll" href="#code">Secure Platform</a> -->
                        <!--<a class="normal-link" href="representative.html">Representatives</a> -->
                        <a class="normal-link  scroll" href="#papers">Plans</a>
                        <a class="normal-link" data-toggle="modal" data-target="#exampleModal" href="#!">Affiliate</a>
                        <a class="deposit" data-toggle="modal" data-target="#exampleModal2" href="#!">Contract</a>
                    </div>
                    <button id="hamburger_btn" type="button" class="btn btn-outline-light btn-sm"><i class="fa fa-bars"></i>
                    </button>
                </div>
                <!-- <div class="customBtn">
                    <a href="https://youtube.com/c/shortcode" target="_blank">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        Click Me
                    </a>
                </div> -->
                <div class="customBtn">
                    <a href="#!" target="_blank">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        New Smart Contract
                    </a>
                </div>
                <div class="col-md-6 header-left">
                    <h2 style="text-transform: uppercase;">
                        <span style="">Earn 5 - 18% Daily</span></h2>
                    <h4 style="font-size:32px; color: #fff;">
                        100% Decentralized, No Admins </h4><h4>

                            <p>

                                Accelerate gains with 15% in referral commissions (4 - levels)
                                <!--          
	<div id="timer" class="col-md-9 ">			
 <time id="count-down" datetime="2014-01-06T00:00:00"></time>
	</div>  -->
                            </p>


                            <!--
                <h2>
                    <span style="font-size:42px;" >Launching In </span></h2>
                    <p id="demo" style="font-size:36px; color: #fff;"></p>
					-->
                            <a href="#!" class="btn-purple">Connect Wallet</a>
                            <!-- <a href="#!" data-toggle="modal" data-target="#exampleModal2" class="btn-white">Tron Link </a> -->
                            <!-- <br> <br> -->
                            <!-- <a href="https://web.archive.org/web/20221208185040/https://tronscan.org/#/contract/TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d/code" target="_blank" class="btn-white">Check Contract</a> -->
                            <a href="/TronGrace_files/TronGrace.pdf" target="_blank" class="btn-white" style="margin-left: 10px;">Presentation (PDF) </a>




                            <!-- 
                <a href="TronGrace.pdf" target=_blank
                   class="btn-purple">Presentation</a>
                <a href="#" target=_blank
                   class="btn-white">Check Contract</a> -->
                </h4></div>


                <div class="col-md-6 header-right">
                    <div class="video">
                        <!-- <img src="/TronGrace_files/video.png" class="img-fluid" alt=""> -->
                        <h5 style="color: #fff;">Enter amount to deposit/withdraw</h5>
                        <br>
                        <div class="center-input">
                            <input type="number" class="form-control" id="numericInput" 
                            pattern="[0-9]*" inputmode="numeric" placeholder="Enter amount" required>
                        </div>
                        <br>
                        <div class="a-center-input">
                            <a href="#!" class="btn-purple">Deposit</a>
                            <a href="#!" class="btn-white" style="margin-left: 10px;">Withdraw </a>
                           </div>
                            
                        <!-- <a href="#!" target="_blank"><i class="fa fa-play"></i></a> -->
                    </div>
                </div>
            </div>
        </div>
    </header>





    <nav class="nav social-fixed" style="justify-content: center;">

        <a class="nav-link bg-tel py-3 px-1 rounded d-flex align-items-center justify-content-center text-white mb-2" href="https://t.me/successpowerteamv2"><i class="la la-telegram fa-lg" target="_blank"></i></a>
        <!--   <a class="nav-link bg-tel py-3 px-1 rounded d-flex align-items-center justify-content-center text-white mb-2" href="https://t.me/TronGraceOfficial"><img src="assets/img/icon/robot.png" width="30px" alt="ChatBot"></a>   -->
        <!-- <a class="nav-link bg-yt py-3 px-1 rounded d-flex align-items-center justify-content-center text-white mb-2" href="#!" target="_blank"><i class="la la-youtube fa-lg	"></i></a> -->


    </nav>
    <div id="content">


        <div id="TronGrace">
            <div class="container">
                <div class="row" style="margin-top: 60px;">

                    <div class="col-md-12 mt-5 mb-3 default-title">
                        <h3>Why Choose <span>TronGrace</span> Platform?</h3>
                    </div>

                    <div class="col-md-4 tron-box">
                        <div class="tron-min">
                            <img src="/TronGrace_files/trans.svg" width="55" alt="">
                            <h4>TRANSPARENCY</h4>
                            <hr>
                            <p class="mb-0">
                                You can transparently view all transactions and details that have been made since the
                                date the Smart Contract was created. </p>
                        </div>
                    </div>

                    <div class="col-md-4 tron-box">
                        <div class="tron-min">
                            <img class="filter" src="/TronGrace_files/decentralized.svg" width="52" alt="">
                            <h4>DECENTRALIZED</h4>
                            <hr>
                            <p class="mb-0">
                                TronGrace is not managed by anyone, including its own software team. It is developed as
                                a fully automatic system. Nobody has access to funds. Your funds are secured between you
                                and the smart contract. </p>
                        </div>
                    </div>

                    <div class="col-md-4 tron-box">
                        <div class="tron-min">
                            <img src="/TronGrace_files/save.png" width="47" alt="">
                            <h4>HIGH SECURITY</h4>
                            <hr>
                            <p class="mb-0">
                                Smart contracts are a part of Blockchain technology. Blockchain is a secure technology
                                that no hacker can access. </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="code">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 mt-5 line-12">
                        <div class="line"></div>
                        <img src="/TronGrace_files/cube.png" alt="">
                        <div class="line mr"></div>
                    </div>
                    <div class="col-md-11 mt-4 pl-0">
                        <div class="report">
                            <img class="codes" src="/TronGrace_files/coding.png" alt="">
                            <div class="code-box">
                                <h4>Copy your referral Link
                                </h4>
                                <h4 style="color: #fff;">
                                    And invite users so that you earn your commission now!</h4>
                            </div>
                            <div class="card-link">
                                <img src="/TronGrace_files/logo-2.png" alt="">
                                <a href="#!">Copy your referral link</a>
                            </div>
                        </div>
                        <div class="whats-link">


                            <div class="what-box">
                                <strong>Total Contributed Amount</strong>
                                <a href="#!" class="not-click">
                                    <span class="right-numb">
                                        <span id="totalInvested1" class="number">0</span>
                                        <b> Current Bonus : <i id="userPercentRate1"> 0%</i></b>
                                    </span>
                                    <img src="/TronGrace_files/link.png" alt="">

                                </a>
                            </div>

                            <div class="what-box mt-3">
                                <strong>Total Active Participants</strong>
                                <a href="#!" class="not-click">
                                    <span class="right-numb">
                                        <span id="totalUsers" class="number numb-copy">0</span>
                                        <!--   <b>Current Bonus: <i id="userPercentRate1">0</i></b> -->
                                    </span>
                                    <img src="/TronGrace_files/link.png" alt="">

                                </a>
                            </div>
                        </div>
                    </div>
                     <div class="col-md-11">
                        <div class="row">
                            <div class="col-md-5"></div>
                            <div class="col-md-7 pl-0">
                                <div class="whats-text">
                                    <h5>Platform details: </h5>
                                    <p class="mb-0">Number of transactions: 120</p>
                                    <p class="mb-0">Number of users: 10</p>
                                    <p class="mb-0">Number of deposits: 1200</p>
                                    <p class="mb-0">Total Withdrawn: 1200 USDT</p>
                                    <p class="mb-0">Total Deposited: 1200 USDT</p>
                                    <p class="mb-0">Platform Age: 45 days</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div id="lines">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-5 line-12">
                        <div class="line"></div>
                        <img src="/TronGrace_files/cube.png" alt="">
                        <div class="line mr"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="downloads">
            <div class="white-dot"></div>
            <div class="blue-dot"></div>
            <div class="container">

                <div class="row">
                    <div class="col-md-6 down-text-left">
                        <p class="mb-0">
                            <span>How </span> it works? </p>
                    </div>
                    <div class="col-md-6 down-text-right">
                        <p class="mb-0">
                        </p>
                    </div>

                    <div class="col-md-3 download-box">
                        <div class="download-min">
                            <div class="circle">
                                <img src="/TronGrace_files/cube-white.png" alt="">
                            </div>
                            <div class="top-title">
                                <hr>
                                <div class="left-title">
                                    01
                                </div>
                                <div class="right-title">
                                    <strong>
                                        Get USDT (TRC20) </strong>
                                </div>
                            </div>
                            <div class="title-content">
                                <hr>
                                <p>
                                    You can easily acquire USDT from the most popular platforms. After purchasing USDT,
                                    you can transfer it to your personal wallet, and then transfer it to TronGrace
                                    smart-contract address. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 download-box">
                        <div class="download-min">
                            <div class="circle">
                                <img src="/TronGrace_files/download_(1).png" alt="">
                            </div>
                            <div class="top-title">
                                <hr>
                                <div class="left-title">
                                    02
                                </div>
                                <div class="right-title">
                                    <strong>
                                        Download the wallet app for Browser or Mobile </strong>
                                </div>
                            </div>
                            <div class="title-content">
                                <hr>
                                <p>
                                    We recommend to use: Trust Wallet, or alternatively Binance / Tronlink.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 download-box">
                        <div class="download-min">
                            <div class="circle">
                                <img src="/TronGrace_files/document.png" alt="">
                            </div>
                            <div class="top-title">
                                <hr>

                                <div class="left-title">
                                    03
                                </div>
                                <div class="right-title">
                                    <strong>
                                        Send USDT to our Smart Contract
                                    </strong>
                                </div>
                            </div>
                            <div class="title-content">
                                <hr>
                                <h4>
                                    <a class="deposit" href="#!">
                                        <center class="cont">Enter amount and press deposit</center>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 download-box">
                        <div class="download-min">
                            <div class="circle">
                                <img src="/TronGrace_files/investment.png" alt="">
                            </div>
                            <div class="top-title">
                                <hr>
                                <div class="left-title">
                                    04
                                </div>
                                <div class="right-title">
                                    <strong>
                                        Start Earning
                                    </strong>
                                </div>
                            </div>
                            <div class="title-content">
                                <hr>

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
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-3 line-12">
                        <div class="line"></div>
                        <img src="/TronGrace_files/cube.png" alt="">
                        <div class="line mr"></div>
                    </div>
                    <div class="col-md-12 default-title">
                        <h3>Communıty Program</h3>
                    </div>
                    <div class="col-md-4 what-box">
                        <div class="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt="">
                            <span>Minimum contribution amount:</span>
                            <strong>10 USDT</strong>
                        </div>
                    </div>
                    <div class="col-md-4 what-box">
                        <div class="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt="">
                            <span>Maximum contribution:</span>
                            <strong>40.000.000 USDT</strong>
                        </div>
                    </div>
                    <div class="col-md-4 what-box">
                        <div class="what-min">
                            <img src="/TronGrace_files/cube-white.png" alt="">
                            <span>Total Rewards:</span>
                            <strong>300%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="papers">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-5 line-12">
                        <div class="line"></div>
                        <img src="/TronGrace_files/cube.png" alt="">
                        <div class="line mr"></div>
                    </div>

                    <div class="col-md-12 mb-4 mt-2 default-title">
                        <h3></h3>
                    </div>
                    <div class="col-md-6 paper-left">
                        <img src="/TronGrace_files/paper.png" class="img-fluid" alt="">
                    </div>
                    <div class="col-md-6 paper-right">
                        <div class="row">
                            <div class="col-md-12 paper-box">
                                <div class="paper-min">
                                    <img src="/TronGrace_files/high.svg" style="transform: rotate(90deg)" width="30" alt="">
                                    <h4>LEADER PLAN:</h4>
                                    <p><span style="font-weight:bold">18%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style="font-weight:bold">15000 USDT</span></p>
                                </div>
                            </div>
                            <div class="col-md-6 paper-box">
                                <div class="paper-min">
                                    <img src="/TronGrace_files/hand.svg" width="30" alt="">
                                    <h4>PROFESSIONAL PLAN:</h4>
                                    <p><span style="font-weight:bold">11%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style="font-weight:bold">5000 USDT</span></p>
                                </div>
                            </div>
                            <div class="col-md-6 paper-box">
                                <div class="paper-min">
                                    <img src="/TronGrace_files/incentive.svg" width="30" alt="">
                                    <h4>WAGON PLAN:</h4>
                                    <p><span style="font-weight:bold">7%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style="font-weight:bold">2000 USDT</span></p>
                                </div>
                            </div>
                            <div class="col-md-6 paper-box">
                                <div class="paper-min">
                                    <img src="/TronGrace_files/money.svg" width="30" alt="">
                                    <h4>BASIC PLAN:</h4>
                                    <p><span style="font-weight:bold">5%</span> EVERY 24 HOURS</p>
                                    <p>Minimum balance: <span style="font-weight:bold">50 USDT</span></p>
                                </div>
                            </div>
                            <!-- <div class="col-md-6 paper-box">
                                <div class="paper-min">
                                    <img class="bonus" src="/TronGrace_files/bonus.svg" width="30" alt="">
                                    <h4>CONTRACT TOTAL AMOUNT BONUS:</h4>
                                    <p>Get + 0.2% additional reward for every 1 billion TRX on Smart Contract Balance.
                                        (Max %1)</p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="affiliate">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 line-12">
                        <div class="line"></div>
                        <img src="/TronGrace_files/cube.png" alt="">
                        <div class="line mr"></div>
                    </div>
                    <div class="col-md-6 ref-link">
                        <div class="row">
                            <div class="col-md-3  col-sm-3 col-12 ref-box">
                                <a href="#!" class="active">
                                    <img src="/TronGrace_files/commision.png" alt="">
                                    <strong>Referral <span class="d-block"></span></strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">01</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">15%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">02</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">10%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">03</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">7%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">07</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">06</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">05</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">04</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">5%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">08</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">09</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 ref-box">
                                <a href="#!">
                                    <span class="numb">10</span>
                                    <span class="text">Level</span>
                                    <strong class="d-block">0%</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="program">
                <div class="row m-0">
                    <div class="col-md-6"></div>
                    <div class="col-md-6  pr-0">
                        <div class="program-box">
                            <div class="program-text">
                                <img src="/TronGrace_files/affiliate-marketing.png" alt="">
                                <h5>Affiliate Program</h5>
                                <p>
                                    An affiliate program designed to suit very large teams can generate a significant
                                    increase in total revenue. Referral rewards instantly come out of the smart contract
                                    into your main wallet where only You have your private key. <br>Note: All Affiliate
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
        <div class="container">
            <div class="row">
                <div class="col-md-4 footer-box" style="align-self: center;">
                    <a href="#!" class="logo-mb hide-mb"><img src="/TronGrace_files/logo-footer.png" class="img-fluid" alt=""></a>

                    <ul class="social">
                        <li>
                            <a href="https://t.me/successpowerteamv2" target="_blank">
                                <span class="left-social"><img src="/TronGrace_files/paper-plane.png" width="21" alt=""></span>
                                <span class="right-social">
                                    Main Telegram Group:
                                    <strong>successpowerteamv2</strong>
                                </span>
                            </a>
                        </li>
                        <!-- <li>
                            <a href="#!" target="_blank">
                                <span class="left-social"><img src="/TronGrace_files/youtube.png" width="19" alt=""></span>
                                <span class="right-social">
                                    Youtube Channel:
                                    <strong>TronGrace Official</strong>
                                </span>
                            </a>
                        </li> -->
                        <li>
                        <a href="#">
                            <span class="left-social"><img src="/TronGrace_files/paper-plane.png" width="18" alt=""></span>
                            <span class="right-social">
                              For Networkers:
                            <strong>TronGracev2offical</strong>
                        </span>
                        </a>
                    </li> 
                    </ul>
                </div>
                <div class="col-md-4 footer-box text-center">
                    <a href="#!" class="logo"><img src="/TronGrace_files/logo-footer.png" class="img-fluid" alt=""></a>
                    <p class="copyright">© 2024 All Rights Reserved TronGrace.online</p>
                    <p class="copyright"> </p>






                    <a href="https://tronscan.org/#/contract/TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d" target="_blank" class="link">
                        <span id="p1">TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d</span></a>

                    <div class="dropdown show">



                    </div>

                </div>

                <div class="col-md-4 footer-box text-right" style="align-self: center;">
                    <div class="chat_wrapper">
                        <a href="https://t.me/successpowerteamv2" target="_blank" class="chat_box">
                            <i class="fa fa-link"></i>
                            <span class="text">TronGrace Chat</span>
                            <span class="robocop"><img src="/TronGrace_files/robot.png" alt=""></span>
                        </a>
                    </div>

                    <!--    <div class="what-links">
                    <a href="#">What can I learn with ChatBot?</a>
                    <a href="#">Marketing Materials in Other Languages</a>
                    <a href="#">Country Leaders</a>
                    <a href="#">Telegram Groups in Other Languages</a>
                    <a href="#">How does it work ?</a>
                    <a href="#">Support Personnel</a>
                </div> -->
                </div>
            </div>
        </div>
    </footer>
    <script>
        const sevenRandom = Math.floor(100000 + Math.random() * 9000000);
    </script>

    <script src="/TronGrace_files/jquery.min.js"></script>
    <!-- <script src="/TronGrace_files/jquery-3.5.1.min.js"></script> -->
    <script src="/TronGrace_files/bootstrap.min(1).js"></script>
    <script src="/TronGrace_files/popper.min.js"></script>
    <script src="/TronGrace_files/swiper.min.js"></script>
    <script src="/TronGrace_files/design532d.js"></script>
    <script src="/TronGrace_files/designweb3.js"></script>
    <script src="/TronGrace_files/sweetalert.min.js"></script>







<script>
    window.addEventListener('load', function () {
        $('#exampleModal69').modal({
            show: false
        });
    })
</script>
    
</>;
};

export default Home;