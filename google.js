const { google } = require('googleapis');
const { drive } = require('googleapis/build/src/apis/drive');

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = '';


const REFRESH_TOKEN = ''

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const driveAPI = google.drive({
    version: 'v3',
    auth: oauth2Client
})

async function uploadData(jsonData) {
    try {
        const fileMetadata = {
            name: 'data.json',
        };

        const media = {
            mimeType: 'application/json',
            body: JSON.stringify(jsonData),
        };

        const response = await driveAPI.files.create({
            requestBody: fileMetadata,
            media: media,
        });

        console.log('File uploaded successfully:', response.data);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}


module.exports = uploadData;