import { EArray } from '@maldan/tslib-earray';
import SHA1 from 'sha1';

export const DataStorage = {
  superHash: [
    window.innerWidth,
    window.innerHeight,
    new Date().getTime(),
    window.navigator.userAgent,
  ],
  generatePassword() {
    const size = (4 + DataStorage.secureRandom() * 4) | 0;
    const charset = new EArray(
      '!#$%^&*_=+-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    )
      .shuffle()
      .join('');
    let retVal = '';

    const hash = SHA1(
      `sasageo_${length}_${charset}_${DataStorage.superHash.join(
        `${size}`,
      )}_${DataStorage.secureRandom()}_${DataStorage.secureRandom()}`,
    ).slice(0, size);

    for (let i = 0, n = charset.length; i < size; ++i) {
      retVal += charset.charAt(Math.floor(DataStorage.secureRandom() * n));
    }
    return new EArray(`${retVal}${hash}`).shuffle().join('');
  },
  secureRandom() {
    try {
      return window.crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
    } catch {
      return Math.random();
    }
  },
};
