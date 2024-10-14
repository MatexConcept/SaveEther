import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import hre from "hardhat";

describe("Save Ether test ", function () {
  async function deploySaveEtherFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const SaveEther = await hre.ethers.getContractFactory("SaveEther");
    const saveEth = await SaveEther.deploy();

    return { saveEth, owner, otherAccount };
  }

  describe("deployment ", () => {
    it("Should check if it deployed", async function () {
      const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);

      expect(await saveEth.owner()).to.equal(owner);

      it("should set the correct owner", async function () {
        expect(await saveEth.owner()).to.equal(owner.address);
      });
    });
  });

  describe("Deposit Ether ", () => {
    
    
    
    it("Should be able to deposit ether", async function () {
      const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);
      const amountToSave = hre.ethers.parseUnits("2.0", 18);
      const duration = 86400;

      await saveEth
        .connect(owner)
        .depositEther(duration, { value: amountToSave });

      const [amount, depositDuration] = await saveEth.getDepositInfo();
      expect(amount).to.equal(amountToSave);
      expect(depositDuration).to.be.greaterThan(0);

    });

  

    //     const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);
    //     const amountToSave = hre.ethers.parseUnits("0.0", 18);
    //     const duration = 86400;
  
    //     await saveEth
    //       .connect(owner)
    //       .depositEther(duration, { value: amountToSave });
  
      
    //     await expect(
    //         saveEth.connect(owner).depositEther(duration, {value: amountToSave})
    //       ).to.be.revertedWith("Amount is too small");
  
    //   });
    it("Should revert if deposit amount is too small", async function () {
        const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);
        const smallAmountToSave = hre.ethers.parseUnits("0.0", 18);
        const duration = 86400;  
  
       
        await expect(
          saveEth.connect(owner).depositEther(duration, { value: smallAmountToSave })
        ).to.be.revertedWith("Amount is too small");
      });

      describe("Withdraw Ether", () => {

        it("Should allow owner to withdraw after the duration", async function () {
          const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);
          const amountToSave = hre.ethers.parseUnits("1.0", 18);
          const duration = 86400;  
    
         
          await saveEth.connect(owner).depositEther(duration, { value: amountToSave });
    
        
          await ethers.provider.send("evm_increaseTime", [duration]);
          await ethers.provider.send("evm_mine", []);
    
          
          await saveEth.connect(owner).withdrawEther();
    
          
          const contractBalance = await ethers.provider.getBalance(saveEth.target);
          expect(contractBalance).to.equal(0);
        });
    

        //   const { saveEth, owner } = await loadFixture(deploySaveEtherFixture);
        //   const amountToSave = hre.ethers.parseUnits("1.0", 18);
        //   const duration = 86400;  
    
          
        //   await saveEth.connect(owner).depositEther(duration, { value: amountToSave });
    
         
        //   await expect(saveEth.connect(owner).withdrawEther()).to.be.revertedWith("Too early to withdraw");
        // });
    
        // it("Should not allow non-owner to withdraw", async function () {
        //   const { saveEth, owner, otherAccount } = await loadFixture(deploySaveEtherFixture);
        //   const amountToSave = hre.ethers.parseUnits("1.0", 18);
        //   const duration = 86400; 
    
          
        //   await saveEth.connect(owner).depositEther(duration, { value: amountToSave });
    
        //   await ethers.provider.send("evm_increaseTime", [duration]);
        //   await ethers.provider.send("evm_mine", []);
    
          
        //   await expect(saveEth.connect(otherAccount).withdrawEther()).to.be.revertedWith("Not the owner");
        // });
      });

});
});
