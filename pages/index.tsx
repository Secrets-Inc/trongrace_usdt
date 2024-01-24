import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Link from "next/link";
import Cover from '../components/Cover';

const Home: NextPage = () => {
  const treeData = [
    {
      id: '0x00',
      amount: 500,
      children: [
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [
            {
              id: '0x002',
              amount: 200,
              children: [],
            },
            {
              id: '0x002',
              amount: 200,
              children: [],
            },
          ],
        },
        {
          id: '0x001',
          amount: 200,
          children: [
            {
              id: '0x002',
              amount: 200,
              children: [],
            },
            {
              id: '0x002',
              amount: 200,
              children: [
                {
                  id: '0x003',
                  amount: 200,
                  children: [],
                },
                {
                  id: '0x003',
                  amount: 200,
                  children: [],
                },
                {
                  id: '0x003',
                  amount: 200,
                  children: [],
                },
                {
                  id: '0x003',
                  amount: 200,
                  children: [],
                },
                {
                  id: '0x003',
                  amount: 200,
                  children: [],
                },
              ],
            },
            {
              id: '0x002',
              amount: 200,
              children: [],
            },
            {
              id: '0x002',
              amount: 200,
              children: [],
            },
          ],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
        {
          id: '0x001',
          amount: 200,
          children: [],
        },
      ],
    },
    // Add more levels or members as needed
  ];
  const renderNode = (node:any, level:any) => (
    <li key={node.id}>
      <i className=
      "las la-star"></i>
      {`${node.id} (${node.amount} USDT)`}
      {level < 4 && node.children.length > 0 && (
        <ul style={{ listStyleType: 'none', marginLeft: '1rem' }}>
          {node.children.map((child:any) => renderNode(child, level + 1))}
        </ul>
      )}
    </li>
  );
  return <>
    <Head>
      <title>Tron Grace - Invest Now</title>
      <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
      <meta name="description" content="Tron Wealth is a decentralized launchpad that
       allows users to launch their token and create their initial 
       token sale with staking benefits to their holders and they don't 
       require any Coding Knowledge For this." />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/icons/site.webmanifest" />
      <link rel="icon" href="/icons/favicon.ico" />
    </Head>
    <Navbar />
    <Cover /> 

    {/* feature-section-------- */}
    <section className={styles.featureSection}>
      <div className={styles.featureBlock}>

        <div className={styles.featureCard}>
          <p className={styles.featureIcon}><i className="las la-cube"></i></p>
          <h4 className={styles.featureHead}>FULLY DECENTRALISED</h4>
          <p className={styles.featureText}>
            Tron Grace runs 100% on the Tron Blockchain, accepting only USDT (TRC20), no admins, or backends
          </p>
        </div>
        <div className={styles.featureCard}>
          <p className={styles.featureIcon}><i className="las la-shield-alt"></i></p>
          <h4 className={styles.featureHead}>GUARANTEED SECURITY</h4>
          <p className={styles.featureText}>
            Each transaction you make on Tron Wealth can be validated on any tron explorer, No funds or assets can stolen, as the blockchain is extremely secure. 
          </p>
        </div>
        <div className={styles.featureCard}>
          <p className={styles.featureIcon}><i className="las la-project-diagram"></i></p>
          <h4 className={styles.featureHead}>REFERRAL EARNINGS</h4>
          <p className={styles.featureText}>
            Earnings from your referral are sent immediately to your wallet address by the smart contract, NOT allocated as your balance, but to your wallet.
          </p>
        </div>

      </div>
    </section>
    {/* feature-section-------- */}

    {/* about-section------ */}
    <section className={styles.aboutSection} id="about">
        <div className={styles.aboutImageSection}>
          <img src="/about.gif" alt="image" />
        </div>
        <div className={styles.aboutTextSection}>
          <h3 className={styles.aboutHeader}>How Referral Works</h3>
          <p className={styles.aboutText}>
            Earn directly to your wallet automatically upto 4 levels.
          </p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Level 1 - 10%</p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Level 2 - 5%</p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Level 3 - 3%</p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Level 4 - 1%</p>
        </div>
      </section>

    {/* referral-tree-section-------- *
    <section className={styles.futureSection}>
        <h3>Referral Tree</h3>
        <div className={styles.futureItemBlock}>
        
          <ul className={styles.futureColumn}>
            {treeData.map((rootNode) => renderNode(rootNode, 1))}
          </ul>
         
        </div>
      </section>
    {/* referral-tree-section-------- */}
    {/* footer--------- */}
    <section className={styles.footerSection}>
      <div className={styles.brandFooter}>
        <p className={styles.brandText}>Profits are generated by AI trading bots on the Tron Blockchain</p>
      </div>
    </section>
    {/* footer--------- */}

    </>;
};

export default Home;
