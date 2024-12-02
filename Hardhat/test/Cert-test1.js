const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const {expect} = require('chai');
const { ethers } = require('hardhat');

describe('Cert',function(){
    async function deployCertFixture(){
        const [admin,other]= await ethers.getSigners();
        // console.log("others",other);
        
        const cert = await ethers.getContractFactory('Cert');
        const Cert = await cert.deploy();
        
        return {admin,Cert,other};
    }

    it("Should be deployed by admin",async function(){
       
       const {admin,Cert} = await loadFixture(deployCertFixture) ;
    //    console.log(admin);
    //    console.log(Cert);
       expect(Cert.deploymentTransaction().from).to.equals(admin.address);       
       
    });

    it("Should be able to issue & read Certificate",async function(){
        const {admin,Cert} = await loadFixture(deployCertFixture);
        await Cert.issue(1,"Anju","CED","A","21/11/2024");
        const Certificate = await Cert.Certificates(1);
        // console.log(Certificate);
        
        expect(Certificate[0]).to.equals("Anju");
        expect(Certificate[1]).to.equals("CED");
        expect(Certificate[2]).to.equals("A");
        expect(Certificate[3]).to.equals("21/11/2024");
    })

    it("Should revert the issuing", async function () {
        const { Cert, other } = await loadFixture(deployCertFixture);
    
        await expect(
          Cert.connect(other).issue(1024, "Yao", "EDP", "S", "16-05-2024"),
        ).to.be.revertedWith("Access Denied");
      });
    })