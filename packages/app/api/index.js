// On your backend (using Node.js and Firebase Admin SDK)
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
const myRefreshToken = './refreshToken.json';

admin.initializeApp({
  credential: admin.credential.cert(myRefreshToken),
  //   databaseURL: 'https://prison-break-idle.firebaseio.com',
});

// Endpoint to verify the Google credential
app.post('/verify-google-credential', (req, res) => {
  const googleCredential = req.body.token;

  // Verify the ID token
  admin
    .auth()
    .verifyIdToken(googleCredential)
    .then((decodedToken) => {
      // The ID token is valid, respond with success
      res.status(200).send({ success: true });
    })
    .catch((error) => {
      // Verification failed, respond with error
      console.error('ID token verification failed:', error);
      res.status(400).send({ success: false });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
