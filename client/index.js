const axios = require("axios");
const MerkleTree = require("../utils/MerkleTree");
const serverUrl = "http://localhost:1225";

async function main() {
  // create the merkle tree for the whole nice list
  const { data: niceList } = await axios.get(`${serverUrl}/nice-list`);
  const merkleTree = new MerkleTree(niceList);

  // find the proof that norman block is in the list
  const name = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
