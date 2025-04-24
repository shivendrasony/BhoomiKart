const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrl = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
const fontPath = path.join(__dirname, '../public/fonts/Inter-Regular.woff2');

https.get(fontUrl, (response) => {
  const file = fs.createWriteStream(fontPath);
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Font downloaded successfully!');
  });
}).on('error', (err) => {
  console.error('Error downloading font:', err);
}); 