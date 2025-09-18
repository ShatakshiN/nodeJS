/* import { readFile } from "fs";

console.log("Before reading file");

readFile("example.txt", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }
  console.log("File content:", data);
});

console.log("After reading file");
 */

import crypto from "crypto";

const hash: string = crypto
  .createHash("sha256") //cretes hash obj //Common algorithms: 'sha256', 'sha512'
  .update("hello world") //update the hash
  .digest("hex"); //returns the result //Encodings: hex, base64, latin1)

console.log(hash);


// hash based message authentication code 
// hash with a secret key 
// doesnt encrypt the message - just check its integrity. 
const hmac = crypto.createHmac('sha256', 'secret-key')
                   .update('hello world')
                   .digest('hex');

console.log(hmac);



// crypto. randomBytes(size , optional-callback) - gererates cryptographically strong  random data 
// synchronous - if no callback passed // return random buffer
// async = when callback passed  // (err, buffer)

// purpose - secure tokens, random session IDs, non =predictable keys
const r = crypto.randomBytes(127 )

console.log(r)

const r2 = crypto.randomBytes(127, (err, buf)=>{
      if (err) {
        console.error(err);
        return;
    }
    console.log("Random bytes (hex):", buf.toString('hex'));
})






