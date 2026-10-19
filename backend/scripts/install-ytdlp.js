import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');
const binDir = path.join(backendDir, 'bin');

async function install() {
  if (process.platform === 'win32') {
    console.log('[install-ytdlp] Windows platform detected.');
    try {
      execSync('python -m yt_dlp --version', { stdio: 'pipe' });
      console.log('[install-ytdlp] python -m yt_dlp is operational.');
      return;
    } catch {
      try {
        execSync('yt-dlp --version', { stdio: 'pipe' });
        console.log('[install-ytdlp] yt-dlp binary is operational in PATH.');
        return;
      } catch {
        console.log('[install-ytdlp] Note: Please ensure yt-dlp or python yt_dlp is available.');
      }
    }
    return;
  }

  // Linux / Render environment
  console.log('[install-ytdlp] Linux environment detected. Preparing yt-dlp standalone binary...');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  const ytDlpPath = path.join(binDir, 'yt-dlp');

  // If already exists and executable, verify
  if (fs.existsSync(ytDlpPath)) {
    try {
      execSync(`"${ytDlpPath}" --version`, { stdio: 'pipe' });
      console.log('[install-ytdlp] Existing yt-dlp binary is verified and operational.');
      return;
    } catch (e) {
      console.warn('[install-ytdlp] Existing binary failed, re-downloading...');
    }
  }

  // Download standalone Linux binary using curl
  try {
    console.log('[install-ytdlp] Downloading official yt-dlp binary via curl...');
    execSync(`curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o "${ytDlpPath}"`, { stdio: 'inherit' });
    fs.chmodSync(ytDlpPath, 0o755);
    console.log('[install-ytdlp] yt-dlp binary downloaded and marked executable.');
    return;
  } catch (err) {
    console.warn('[install-ytdlp] curl download failed:', err.message);
  }

  // Fallback to pip install
  try {
    console.log('[install-ytdlp] Attempting pip install fallback...');
    execSync('python3 -m pip install --break-system-packages yt-dlp || pip3 install yt-dlp || pip install yt-dlp', { stdio: 'inherit' });
    console.log('[install-ytdlp] yt-dlp installed via pip.');
  } catch (err) {
    console.warn('[install-ytdlp] pip fallback warning:', err.message);
  }
}

install().catch((err) => {
  console.error('[install-ytdlp] Installation encountered error:', err.message);
});
