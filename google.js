const { google } = require('googleapis');
const { drive } = require('googleapis/build/src/apis/drive');

const CLIENT_ID = '47597718485-5dtf947249a7gembc7pefuvninv4asie.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';


const REFRESH_TOKEN = '1//04xmVSIU23f6YCgYIARAAGAQSNwF-L9IraDWQuoTYeUJ_wU_xp3m9xSCYS4zyr3qTMCAqX5RQLnZinlPyzr5rIEIfVQg7waFxor8'

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