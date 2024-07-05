import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "../../../context/web3context";
import { getElectionContract } from "../../../assets/helpers/web3";
import { toast } from "react-toastify";

export default function Index() {
  const { web3, account } = useContext(Web3Context);
  const [voterAddress, setVoterAddress] = useState("");
  const [chairPerson, setChairPerson] = useState("");

  const handleWhitelist = async (e) => {
    e.preventDefault();
    const contract = getElectionContract(web3);
    const voteResponse = await contract.methods
      .giveRightToVote(voterAddress)
      .send({ from: account });
    toast.success("Voter Whitelisted Successfully");
  };

  useEffect(() => {
    const fetchchairperson = async () => {
      const contract = getElectionContract(web3);
      if (contract) {
        const chairPersonAddress = await contract.methods.chairperson().call();
        setChairPerson(chairPersonAddress);
        console.log("Addrrdd", voterAddress, "Addrrdd", chairPerson);
      }
    };
    fetchchairperson();
  }, []);

  return (
    <div className="banner-main">
      <div>
        <h1>Nadra Voting Access Provider</h1>
        <form onSubmit={handleWhitelist}>
          <div className="admin-input">
            <input
              placeholder="Enter Address"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
            />
          </div>
          <button type="submit" disabled={voterAddress !== chairPerson}>
            Whitelist
          </button>
        </form>
      </div>
    </div>
  );
}
