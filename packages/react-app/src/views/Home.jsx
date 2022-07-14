import { useContractReader } from "eth-hooks";
import millify from "millify";
import { Col, Row, Statistic, Typography } from "antd";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { Address } from "../components";
// import { useQuery, gql } from "@apollo/client";
// import { useProjectOwner, useProjectMetadataContent } from "juice-hooks";

const { Title } = Typography;

// export const JUICE = gql`
//   {
//     protocolLogs(first: 5) {
//       id
//       projectsCount
//     }
//     projectCreateEvents(first: 5) {
//       id
//       project {
//         id
//       }
//       projectId
//       cv
//     }
//   }
// `;

const PROJECT_ID = 44;

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts, mainnetContracts, mainnetProvider, blockExplorer, DEBUG }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  // const { data: cid } = useProjectMetadataContent({
  //   projectId: PROJECT_ID,
  //   domain: 1,
  // });
  // const { data: owner } = useProjectOwner({ projectId: PROJECT_ID });

  const terminals = useContractReader(mainnetContracts, "JBDirectory", "terminalsOf", [PROJECT_ID]);
  const terminal = terminals ? terminals[0] : "";
  if (DEBUG) console.log(terminal);
  const getTotalSupply = useContractReader(mainnetContracts, "JBTokenStore", "unclaimedTotalSupplyOf", [PROJECT_ID]);
  const totalSupply = getTotalSupply ? ethers.utils.formatEther(getTotalSupply) : 0;
  if (DEBUG) console.log(totalSupply);

  const myMainnetJuiceBalance = useContractReader(mainnetContracts, "JBSingleTokenPaymentTerminalStore", "balanceOf", [
    terminal,
    PROJECT_ID,
  ]);
  const juiceProjectBalance = myMainnetJuiceBalance
    ? Number(ethers.utils.formatEther(myMainnetJuiceBalance)).toFixed(2)
    : 0;

  const juiceProjectOwner = useContractReader(mainnetContracts, "JBProjects", "ownerOf", [44]);
  const juiceProject = useContractReader(mainnetContracts, "JBProject", "tokenURI", [44]);
  if (DEBUG) console.log(juiceProject);

  // The funding cycle that is currently active for the specified project.
  // If a current funding cycle of the project is not found, returns an empty funding cycle with all properties set to 0.
  // https://github.com/jbx-protocol/juice-docs-v2/blob/main/docs/dev/api/contracts/jbfundingcyclestore/read/currentof.md
  const juiceProjectFundingCycle = useContractReader(mainnetContracts, "JBFundingCycleStore", "currentOf", [
    PROJECT_ID,
  ]);
  if (DEBUG) console.log(juiceProjectFundingCycle);

  return (
    <div>
      <Title level={1} style={{ padding: 30 }}>
        BUIDLGUIDL ⚔️ JUICEBOX
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Treasury Balance" value={`🪙${millify(juiceProjectBalance)}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Unclaimed Token Balance" value={`🪙${millify(totalSupply)}`} />
        </Col>
        {/* <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
          </Col>
          <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col> */}
      </Row>
      {/* <div> 
        <h1>Project {PROJECT_ID}</h1>
        <span>
        Metadata content id: {cid ?? "..."}
        <br />
        project owner: {owner ?? "..."}
        </span>
      </div> 
      <Col span={12}>
          <Statistic title="Project ID" value={PROJECT_ID} />
        </Col>
      */}
      <div
        style={{ display: "flex", direction: "column", justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <h6 style={{ fontSize: 14, textColor: "#808080" }}>Project Owner</h6>
        <Address
          address={juiceProjectOwner}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
          fontSize={20}
        />
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        Buidlguidl Tresurery Balance : 🪙{" "}
        {myMainnetJuiceBalance !== undefined && Number(ethers.utils.formatEther(myMainnetJuiceBalance)).toFixed(2)}
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        Unclaimed Total Supply : 🪙 {totalSupply}
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        Buidlguidl Owner : {juiceProjectOwner && juiceProjectOwner.slice(0, 4) + "..." + juiceProjectOwner.slice(-4)}
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        This Is Your App Home. You can start editing it in{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          packages/react-app/src/views/Home.jsx
        </span>
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>✏️</span>
        Edit your smart contract{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          YourContract.sol
        </span>{" "}
        in{" "}
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          packages/hardhat/contracts
        </span>
      </div>
      {!purpose ? (
        <div style={{ margin: 32 }}>
          <span style={{ marginRight: 8 }}>👷‍♀️</span>
          You haven't deployed your contract yet, run
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            yarn chain
          </span>{" "}
          and{" "}
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            yarn deploy
          </span>{" "}
          to deploy your first contract!
        </div>
      ) : (
        <div style={{ margin: 32 }}>
          <span style={{ marginRight: 8 }}>🤓</span>
          The "purpose" variable from your contract is{" "}
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            {purpose}
          </span>
        </div>
      )}

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🤖</span>
        An example prop of your balance{" "}
        <span style={{ fontWeight: "bold", color: "green" }}>({ethers.utils.formatEther(yourLocalBalance)})</span> was
        passed into the
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          Home.jsx
        </span>{" "}
        component from
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          App.jsx
        </span>
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>💭</span>
        Check out the <Link to="/hints">"Hints"</Link> tab for more tips.
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🛠</span>
        Tinker with your smart contract using the <Link to="/debug">"Debug Contract"</Link> tab.
      </div>
    </div>
  );
}

export default Home;
