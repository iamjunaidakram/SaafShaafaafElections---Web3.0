import React, { useEffect, useContext, useState } from "react";
import { getElectionContract } from "../../../assets/helpers/web3";
import ImranKhan from "../../../assets/img/imran.jpg";
import NawazSharif from "../../../assets/img/nawaz.jpeg";
import Bilawal from "../../../assets/img/bilawal.png";
import { Web3Context } from "../../../context/web3context";

const LeaderData = ({ key0, key1, src, alt, name, voteCount }) => (
  <div className="leader-data">
    <img src={src} alt={alt} />
    <div className="leader-content">
    <h3>
      Name: <span>{name}</span>
    </h3>
    <h3>
      key0: <span>{key0}</span>
    </h3>
    <h3>
      key1: <span>{key1}</span>
    </h3>
    <h3>
      VoteCount: <span>{voteCount}</span>
    </h3>
    </div>
  </div>
);

export default function Index() {
  const { web3 } = useContext(Web3Context);
  const [data, setData] = useState([]);

  const images = [ImranKhan, NawazSharif, Bilawal];

  useEffect(() => {
    const getProposals = async () => {
      const contract = getElectionContract(web3);
      let proposals = [];
      for (let i = 0; i < 3; i++) {
        const proposalsResponse = await contract.methods.proposals(i).call();
        console.log(`proposalsResponse for ID ${i}`, proposalsResponse);
        proposals.push(proposalsResponse);
      }
      setData(proposals);
    };
    getProposals();
  }, [web3]);

  return (
    <div className="banner-main">
      <div>
        <h1>Leaders Detail</h1>
        <div className="leaders-list">
          {data.length > 0 &&
            data.map((proposal, index) => (
              <LeaderData
                key={index}
                key0={proposal[0]}
                key1={proposal[1].toString()}
                src={images[index]}
                alt={`Leader ${index + 1}`}
                name={proposal.name}
                voteCount={proposal.voteCount.toString()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
