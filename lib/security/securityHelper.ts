import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.imageSk ?? '00000000000000000000000000000000';

const encryptUrl = (url?: string | null) => {
    if (!url) return '';

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(url), cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decryptUrl = (hash?: string | null) => {
    if (!hash) return '';

    const [iv, encrypted] = hash.split(':');
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedBuffer = Buffer.from(encrypted, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);
    const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

    return decrypted.toString();
};

export { encryptUrl, decryptUrl }