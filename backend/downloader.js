const fs = require('fs');
const path = require('path');
const YtDlpWrap = require('yt-dlp-wrap').default;

// Ruta al binario local de yt-dlp
const ytDlpBinary = process.platform === 'win32'
  ? path.join(__dirname, 'yt-dlp.exe')
  : path.join(__dirname, 'yt-dlp');

const ytDlpWrap = new YtDlpWrap(ytDlpBinary);

function descargarVideo(url, formato = 'best') {
  const outputName = formato === 'mp3' ? 'audio.%(ext)s' : 'video.%(ext)s';
  const outputPath = path.join(__dirname, '..', outputName);

  const args = ['-f', formato, '-o', outputPath];
  if (formato === 'mp3') {
    args.push('--extract-audio', '--audio-format', 'mp3');
  }

  return new Promise((resolve, reject) => {
    let finalPath = '';

    ytDlpWrap.exec([url, ...args])
      .on('ytDlpEvent', (event) => {
        if (event.event === 'download') {
          finalPath = outputPath.replace('%(ext)s', 'mp3');
        }
      })
      .on('close', () => resolve(finalPath))
      .on('error', reject);
  });
}

module.exports = { descargarVideo };
