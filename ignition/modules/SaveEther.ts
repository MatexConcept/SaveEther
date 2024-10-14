// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const SaveEther = buildModule("SaveEtherModule", (m) => {

  const saveEther = m.contract("SaveEther");

  return { saveEther };


});

export default SaveEther ;