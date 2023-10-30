import './App.css';
import Web3 from "web3";
import {useState, useEffect} from "react";
import SampleContract from "./contracts/SampleContract.json"

function App() {

  const [state, setState] = useState({web3:null, contract:null});

  const [data ,setData] = useState("null");

  useEffect(()=>{
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function templeate(){
      const  web3= new Web3(provider);
      // console.log(web3)

      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SampleContract.networks[networkId];

      const contract = new web3.eth.Contract(
          SampleContract.abi,
          deployedNetwork.address
      );

      setState({web3: web3, contract: contract});
    }
    provider && templeate();
  },[])

  useEffect(()=>{
    const {contract} = state
    async function  readData(){
      const  data = await contract.methods.getter().call();
      setData(data);
    };

    contract && readData()
  },[state])
  async function writeData(){
    const {contract} = state;
    const data = document.querySelector("#value").value;
    await contract.methods.setter(data).send({from: ""});

    window.location.reload();

  }
  return (
    <div className="App">

      <p>Contract Data : {data}</p>
      <input type="text" id="value" ></input>
      <button onClick={writeData}>Change Data</button>
    </div>
  );
}

export default App;
