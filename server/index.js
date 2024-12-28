const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// create the merkle tree and get its root
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // verify that the name is in the list using the proof and merkle root
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.get("/merkle-tree", (req, res) => {
  res.send({ data: merkleTree });
});

app.get("/merkle-root", (req, res) => {
  res.send(MERKLE_ROOT);
});

app.get("/nice-list", (req, res) => {
  res.send({ data: niceList });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
