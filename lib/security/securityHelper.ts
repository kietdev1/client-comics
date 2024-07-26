import { DynamicObject } from "@/app/types/dynamic-object";

const sk = process.env.imageSk ?? 'z';

const encoder: DynamicObject<string> = {
    'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5', 'f': '6', 'g': '7', 'h': '8',
    'i': '9', 'j': '0', 'k': 'q', 'l': 'w', 'm': 'e', 'n': 'r', 'o': 't', 'p': 'y',
    'q': 'u', 'r': 'i', 's': 'o', 't': 'p', 'u': 'a', 'v': sk, 'w': 'd', 'x': 'f',
    'y': 'g', 'z': 'h', '0': 'z', '1': 'x', '2': 'c', '3': 'v', '4': 'b', '5': 'n',
    '6': 'm', '7': 'l', '8': 'k', '9': 'j', '/': '_', '-': '+'
};

const decoder = Object.fromEntries(Object.entries(encoder).map(([k, v]) => [v, k]));

const encryptUrl = (url?: string | null) => {
    if (!url) return "";
    return url.toLowerCase().split('').map(char => encoder[char] || char).join('');
};

const decryptUrl = (encoded?: string | null) => {
    if (!encoded) return "";
    return encoded.split('').map(char => decoder[char] || char).join('');
};

export { encryptUrl, decryptUrl }