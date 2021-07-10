
// ! Uncaught InvalidCharacterError: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.

// todo: add support for cyrillic

class Cipher {
  /**
   * Construct new instance with given key
   * @param {string} key 
   */
  constructor(key = "") {
    this.key = key;
  }

  /**
   * Update key of instance
   * @param {string} key 
   */
  update(key) {
    this.key = key;
  }

  /**
   * Encrypt text with instance's key
   * @param {string} value Human-readable text
   * @returns {string} Encrypted text in base64 format
   */
  encrypt(value) {
    if (this.key.length === 0) {
      return {
        method: "b64",
        data: btoa(value)
      };
    }
    
    return {
      method: "xor",
      data: Cipher.encrypt(value, this.key)
    };
  }

  /**
   * Decrypt text with instance's key
   * @param {string} value Encrypted text in base64 format
   * @returns {string} Human-readable text
   */
  decrypt(value) {
    if (this.key.length === 0) {
      return {
        method: "b64",
        data: atob(value)
      };
    }

    return {
      method: "xor",
      data: Cipher.decrypt(value, this.key)
    };
  }

  /**
   * Encrypt text with given key
   * @param {string} value Human-readable text
   * @param {string} key 
   * @returns {string} Encrypted text in base64 format
   */
  static encrypt(value, key) {
    const bytes = new TextEncoder().encode(value);
    const xored = Cipher.xor(bytes, key);
    // const encrypted = btoa(new TextDecoder().decode(xored));
    const encrypted = base64js.fromByteArray(xored);
    return encrypted;
  }

  /**
   * Decrypt text with given key
   * @param {string} value Encrypted text in base64 format
   * @param {string} key 
   * @returns {string} Human-readable text
   */
  static decrypt(value, key) {
    // const bytes = new TextEncoder().encode(atob(value));
    const bytes = base64js.toByteArray(value);
    const xored = Cipher.xor(bytes, key);
    const decrypted = new TextDecoder().decode(xored);
    return decrypted;
  }

  /**
   * XOR operation (encrypt/decrypt)
   * @param {Uint8Array} bytes 
   * @param {string} key 
   * @returns {Uint8Array} Encoded/decoded bytes
   */
  static xor(bytes, key) {
    const keyBytes = new TextEncoder().encode(key);

    for(let i = 0, j = 0; i < bytes.length; i++) {
      bytes[i] ^= keyBytes[j];
      if (++j == keyBytes.length) j = 0;
    }
    return bytes;
  }

}
