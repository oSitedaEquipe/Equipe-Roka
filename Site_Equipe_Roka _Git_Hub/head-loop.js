'use strict';

// Append each revolution to the same playback timeline. The decoder never
// reaches an end-of-file or seeks back to zero between revolutions.
window.createCaioHeadLoop = function createCaioHeadLoop(video) {
  const nativeSource = video.querySelector('source')?.src || video.src;
  const MediaSourceClass = window.MediaSource || window.ManagedMediaSource;
  const mediaType = 'video/mp4; codecs="avc1.64001f"';
  const cycleDuration = 10;
  let source;
  let sourceBuffer;
  let objectURL;
  let interval;
  let busy = false;
  let failed = false;
  let disposed = false;
  let hasStarted = false;
  let nextStart = 0;
  let mediaBytes;

  video.dataset.loopPlayback = 'native';

  function stopMaintenance() {
    clearInterval(interval);
    video.removeEventListener('timeupdate', maintain);
    if (objectURL) URL.revokeObjectURL(objectURL);
  }

  function fallback() {
    if (failed || disposed) return;
    failed = true;
    const phase = Number.isFinite(video.currentTime) ? video.currentTime % cycleDuration : 0;
    stopMaintenance();
    video.dataset.loopPlayback = 'native';
    video.loop = true;
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = phase;
      if (hasStarted) video.play().catch(() => { video.controls = true; });
    }, { once: true });
    video.src = nativeSource;
    video.load();
  }

  function waitForEvent(target, event, action) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => finish(new Error('Media preparation timed out')), 10000);
      function finish(error) {
        clearTimeout(timeout);
        target.removeEventListener(event, complete);
        target.removeEventListener('error', onError);
        if (error) reject(error); else resolve();
      }
      function complete() { finish(); }
      function onError() { finish(new Error('Media buffer error')); }
      target.addEventListener(event, complete, { once: true });
      target.addEventListener('error', onError, { once: true });
      try { action(); } catch (error) { finish(error); }
    });
  }

  async function appendCycle() {
    sourceBuffer.timestampOffset = nextStart;
    await waitForEvent(sourceBuffer, 'updateend', () => sourceBuffer.appendBuffer(mediaBytes));
    nextStart += cycleDuration;
  }

  async function maintain() {
    if (busy || failed || disposed || source?.readyState !== 'open') return;
    busy = true;
    try {
      // Keep a bounded amount of history, even after hours of playback.
      const discardBefore = video.currentTime - 20;
      if (discardBefore > 10 && sourceBuffer.buffered.length && sourceBuffer.buffered.start(0) < discardBefore - 5) {
        await waitForEvent(sourceBuffer, 'updateend', () => sourceBuffer.remove(0, discardBefore));
      }
      while (nextStart - video.currentTime < 30) await appendCycle();
    } catch {
      fallback();
    } finally {
      busy = false;
    }
  }

  async function prepare() {
    if (!MediaSourceClass?.isTypeSupported(mediaType)) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let bytes;
    try {
      const response = await fetch('assets/head-loop-stream.mp4', { signal: controller.signal });
      if (!response.ok) throw new Error('Rotation could not be loaded');
      bytes = await response.arrayBuffer();
    } finally {
      clearTimeout(timeout);
    }

    // The asset contains one initialization section followed by complete
    // one-second MP4 fragments, each beginning with an independent frame.
    const view = new DataView(bytes);
    let offset = 0;
    while (offset + 8 <= view.byteLength) {
      const size = view.getUint32(offset);
      const type = String.fromCharCode(...new Uint8Array(bytes, offset + 4, 4));
      if (type === 'moof') break;
      if (size < 8 || offset + size > view.byteLength) throw new Error('Invalid rotation asset');
      offset += size;
    }
    if (offset + 8 > view.byteLength) throw new Error('Rotation fragments are missing');
    const initialization = new Uint8Array(bytes, 0, offset);
    mediaBytes = new Uint8Array(bytes, offset);

    source = new MediaSourceClass();
    objectURL = URL.createObjectURL(source);
    video.loop = false;
    if (MediaSourceClass === window.ManagedMediaSource) video.disableRemotePlayback = true;
    await waitForEvent(source, 'sourceopen', () => {
      video.src = objectURL;
      video.load();
    });
    source.duration = Infinity;
    sourceBuffer = source.addSourceBuffer(mediaType);
    sourceBuffer.addEventListener('error', fallback);
    await waitForEvent(sourceBuffer, 'updateend', () => sourceBuffer.appendBuffer(initialization));
    await maintain();
    if (failed) return;
    video.dataset.loopPlayback = 'continuous';
    interval = setInterval(maintain, 1000);
    video.addEventListener('timeupdate', maintain);
  }

  const ready = prepare().catch(fallback);
  video.addEventListener('error', () => { if (source) fallback(); });
  window.addEventListener('pagehide', event => {
    if (!event.persisted) {
      disposed = true;
      stopMaintenance();
    }
  });

  return {
    async play() {
      hasStarted = true;
      await ready;
      video.currentTime = 0;
      return video.play();
    },
  };
};
