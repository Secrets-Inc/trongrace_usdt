import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAdapters } from "../utils/AdaptersContext";

const Navbar: React.FC = () => {
  // const { address, setAddress } = useState(null)
  // const wallet = useWallet();
  const adapters = useAdapters();
  // const connectedAddress =  localStorage.getItem("connectedAddress") == null ? adapters[1].address : localStorage.getItem("connectedAddress");
  const connectedAddress = adapters[1].address;
  useEffect(() => {
  }, []);

  
  function formatAddress(address: string | null): string {
    if (!address) return "";
    const last5Digits = address.slice(-3);
    const first5Digits = address.slice(3);
    return `${first5Digits}...${last5Digits}`;
  }


  async function connectWallet() {
    // let address = adapters[1].address;
    // console.log(adapters)

    if(connectedAddress == null) {
      await adapters[1].connect();
      // localStorage.setItem("connectedAddress", connectedAddress);
    } else {
      try {
        await adapters[1].disconnect();
        // localStorage.removeItem("connectedAddress");
        // window.location.reload(); 
      } catch (error) {
        console.log('disconnect:' + error);
      }
    }
  }

  return <>
    <nav className={styles.navWrapper}>
      <div className={styles.navbar}>
        <div className={styles.logoSection}>
          <Link href="" legacyBehavior>
            <img src="/tronx.png" alt="Globus Logo" className={styles.logoImage} />
          </Link>
        </div>
        <div className={styles.menuSection}>
          <ul className={styles.menu}>
            {/* <li><Link href="#roadmap" className={styles.menuItem}>Referral</Link></li> */}
            {/* <li><Link href="#contact" className={styles.menuItem}>Contract</Link></li> */}
          </ul>
          {/* <ConnectButton /> */}
          <a className={styles.connectBtn} id="connect-wallet-btn" onClick={() => connectWallet()}>
            {connectedAddress ?  connectedAddress  : "Connect Wallet"}
          </a>
        </div>
      </div>
    </nav>
  </>;
};

export default Navbar;
