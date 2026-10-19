/**
 * Audivexa API Service Client
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/**
 * Upload a local video file with upload progress tracking
 */
export const uploadVideo = async ({ file, bitrate = '320k', onUploadProgress = () => {} }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('video', file);
    formData.append('bitrate', bitrate);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onUploadProgress(percent);
      }
    });

    xhr.addEventListener('load', () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.success) {
          resolve(res);
        } else {
          reject(new Error(res.error || `Server returned error (${xhr.status})`));
        }
      } catch (err) {
        reject(new Error(`Invalid server response: ${xhr.statusText || 'Upload failed'}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error occurred while uploading. Please check your connection.'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload was aborted.'));
    });

    xhr.open('POST', `${API_BASE}/convert/upload`);
    xhr.send(formData);
  });
};

/**
 * Inspect YouTube URL for preview metadata
 */
export const inspectYouTubeUrl = async (url) => {
  const res = await fetch(`${API_BASE}/convert/youtube/inspect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to inspect YouTube URL');
  }
  return data.data;
};

/**
 * Initiate YouTube to MP3 conversion
 */
export const convertYouTube = async ({ url, bitrate = '320k' }) => {
  const res = await fetch(`${API_BASE}/convert/youtube`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, bitrate }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to start YouTube conversion');
  }
  return data;
};

/**
 * Poll job status
 */
export const getJobStatus = async (jobId) => {
  const res = await fetch(`${API_BASE}/convert/status/${jobId}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Job not found or expired');
  }
  return data.job;
};

/**
 * Direct download link for converted MP3
 */
export const getDownloadUrl = (jobId) => {
  return `${API_BASE}/convert/download/${jobId}`;
};

/**
 * Stream audio preview link
 */
export const getStreamUrl = (jobId) => {
  return `${API_BASE}/convert/stream/${jobId}`;
};

/**
 * Fetch backend capabilities and health
 */
export const getServiceHealth = async () => {
  const res = await fetch(`${API_BASE}/health`);
  return await res.json();
};
