const { Contract, Wallets } = require("fa-js");

const smartContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; 
async function addConsentRecord(userId, dataType, recipientId, timestamp) {
  const wallet = await Wallets.newInMemoryWallet();
  const identity = await wallet.createIdentity();
  const contract = new Contract(smartContractAddress, ConsentRecord.abi, wallet);
  await contract.addRecord(userId, dataType, recipientId, timestamp);
}

async function removeConsentRecord(userId, dataType, recipientId) {
  const wallet = await Wallets.newInMemoryWallet();
  const identity = await wallet.createIdentity();
  const contract = new Contract(smartContractAddress, ConsentRecord.abi, wallet);
  await contract.removeRecord(userId, dataType, recipientId);
}

async function checkConsentRecord(userId, dataType, recipientId) {
  const wallet = await Wallets.newInMemoryWallet();
  const identity = await wallet.createIdentity();
  const contract = new Contract(smartContractAddress, ConsentRecord.abi, wallet);

  return await contract.checkRecord(userId, dataType, recipientId);
}
async function main() {
  const userId = "user1";
  const dataType = "personal";
  const recipientId = "recipient1";
  const timestamp = "2022-01-01T00:00:00Z";  
  
  await addConsentRecord(userId, dataType, recipientId, timestamp);  
 
  const isConsentRecordExists = await checkConsentRecord(userId, dataType, recipientId);
  console.log("Consent Record Exists:", isConsentRecordExists);  
 
  await removeConsentRecord(userId, dataType, recipientId);
  
  const isConsentRecordExistsAfterRemoval = await checkConsentRecord(userId, dataType, recipientId);
  console.log("Consent Record Exists After Removal:", isConsentRecordExistsAfterRemoval);
  }
  
  main();

  module.exports = { addConsentRecord, removeConsentRecord, checkConsentRecord };