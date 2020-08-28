/* rsa_keygen.js */

const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

/*
  @func: genKeyPair
  @desc: Generate a private and public key for use in asymmetric encryption/decryption in JWTs.
  @params: none
*/
function genKeyPair() {
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        }
    });
    // Create the public key file
    fs.writeFileSync(path.join(__dirname, "id_rsa_pub.pem"), keyPair.publicKey);

    // Create the private key file
    fs.writeFileSync(path.join(__dirname, "id_rsa_priv.pem"), keyPair.privateKey);
}

// Generates the keypair
genKeyPair();
