import { Router } from "express";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import abi from './Cert.json' assert { type: "json" };
import address from './deployed_addresses.json' assert { type: "json" };
import dotenv from 'dotenv';
dotenv.config();

const appRoute = Router();

const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`)
// const provider = new JsonRpcProvider("http://127.0.0.1:8545")
console.log(provider);
// const signer =await provider.getSigner();
// console.log(signer);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
console.log(wallet);



appRoute.get('/', (req, res) => {
    console.log(provider);
    res.send("Hello World");
})

appRoute.post('/issueCert', async (req, res) => {
    console.log("Hi");

    console.log(req.body);
    const { id, name, course, grade, date } = req.body;
    const instance = new Contract(address["certModule#Cert"], abi.abi, wallet);
    const txReceipt = await instance.issue(id, name, course, grade, date);
    console.log(txReceipt.hash);
    if (txReceipt) {
        res.status(201).send(txReceipt.hash);
    }
    else {
        res.send("Transaction not done");
    }
})

appRoute.get('/getCertificate', async (req, res) => {
    console.log("hi");

    console.log(req.query.id);
    const id = req.query.id;
    const wallet1 = new Wallet(process.env.PRIVATE_KEY1, provider);
    const instance = new Contract(address["certModule#Cert"], abi.abi, wallet1);
    const txValue = await instance.Certificates(id);
    res.status(200).json(txValue);

})

export { appRoute };