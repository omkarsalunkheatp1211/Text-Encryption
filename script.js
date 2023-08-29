document.addEventListener("DOMContentLoaded", () => {
    const encryptBtn = document.getElementById("encryptBtn");
    const decryptBtn = document.getElementById("decryptBtn");
    const copyBtn = document.getElementById("copyBtn");

    encryptBtn.addEventListener("click", () => {
      const key = document.getElementById("key").value;
      const plaintext = document.getElementById("plaintext").value;
      if (!validateEncryptionKey(key)) {
        alert("Encryption Key must be at least 8 characters long and contain at least 2 digits, 1 capital letter, 1 small letter, and 1 special character (e.g., Qwert@12).");
        return;
      }
      const encryptedText = encrypt(plaintext, key);
      document.getElementById("output").value = encryptedText;
    });

    decryptBtn.addEventListener("click", () => {
      const key = document.getElementById("key").value;
      const ciphertext = document.getElementById("output").value;
      if (!validateEncryptionKey(key)) {
        alert("Encryption Key must be at least 8 characters long and contain at least 2 digits, 1 capital letter, 1 small letter, and 1 special character (e.g., Qwert@12).");
        return;
      }
      const decryptedText = decrypt(ciphertext, key);
      document.getElementById("output").value = decryptedText;
    });

    copyBtn.addEventListener("click", () => {
      const outputTextarea = document.getElementById("output");
      outputTextarea.select();
      document.execCommand("copy");
    });

    function validateEncryptionKey(key) {
      const minLength = 8;
      const minDigits = 2;
      const minUpperCase = 1;
      const minLowerCase = 1;
      const minSpecialChars = 1;
      
      const digitCount = (key.match(/\d/g) || []).length;
      const upperCaseCount = (key.match(/[A-Z]/g) || []).length;
      const lowerCaseCount = (key.match(/[a-z]/g) || []).length;
      const specialCharCount = (key.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g) || []).length;
      
      return (
        key.length >= minLength &&
        digitCount >= minDigits &&
        upperCaseCount >= minUpperCase &&
        lowerCaseCount >= minLowerCase &&
        specialCharCount >= minSpecialChars
      );
    }

    function encrypt(text, key) {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      return encrypted;
    }

    function decrypt(text, key) {
      const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
      return decrypted;
    }
});
