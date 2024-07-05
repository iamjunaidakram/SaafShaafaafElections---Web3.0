import React, { useState, useContext } from "react";
import PTI from "../../../assets/img/pti.png";
import PMLN from "../../../assets/img/pmln.png";
import PPP from "../../../assets/img/ppp.png";
import { getElectionContract } from "../../../assets/helpers/web3";
import { Web3Context } from "../../../context/web3context";
import { toast } from "react-toastify";

const RadioButtonImage = ({ id, src, alt, value, selected, onChange }) => (
  <div className="radio-image">
    <input
      type="radio"
      id={id}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    <label htmlFor={id}>
      <img src={src} alt={alt} />
    </label>
  </div>
);

const Index = () => {
  const { web3, account } = useContext(Web3Context);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Option:", selectedOption);
    const contract = getElectionContract(web3);
    const voteResponse = await contract.methods
      .vote(selectedOption)
      .send({ from: account });
    console.log("voteResponse", voteResponse);
    toast.success(voteResponse);
  };

  return (
    <div className="banner-main">
      <div>
        <h1>Caste your vote</h1>
        <form onSubmit={handleSubmit}>
          <div className="radio-btn-group">
            <RadioButtonImage
              id="option1"
              src={PTI}
              alt="Option 1"
              value="0"
              selected={selectedOption}
              onChange={handleOptionChange}
            />

            <RadioButtonImage
              id="option2"
              src={PMLN}
              alt="Option 2"
              value="1"
              selected={selectedOption}
              onChange={handleOptionChange}
            />

            <RadioButtonImage
              id="option3"
              src={PPP}
              alt="Option 3"
              value="2"
              selected={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
          <button type="submit">Caste Vote</button>
        </form>
      </div>
    </div>
  );
};

export default Index;
