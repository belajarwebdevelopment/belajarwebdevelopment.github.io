// Text to encrypt and decrypt.
var text = "plain text";
// Use OAEP padding (PKCS#1 v2).
var doOaepPadding = true;
// RSA 512-bit key: Public (Modulus), Private (D) and CRT (P, Q, DP, DQ, InverseQ).
var xmlParams =
    "<RSAKeyValue>" +
        "<Modulus>pxtmFnrGI6Sb8ziyY+NRUDuQ4b/ETw5WabQ4daFQqzsCEr/6J/LLBU/2D5mO5/Wu5U/Rya1E55aYFZeaZMNqAw==</Modulus>" +
        "<Exponent>AQAB</Exponent>" +
        "<P>2TsVXWPEvDIJv/gd2rX9k0UOyXuaYgoAchIH6vUicis=</P>" +
        "<Q>xO4+OYREQfqYRQK7y73+RaUG0IxobT0OQ0c+Ok2hc4k=</Q>" +
        "<DP>K7/xgpiIU9rECeyfnp/OjS14V+3T3vDivBaTj6eFI3c=</DP>" +
        "<DQ>K4N9ClZ4gp+tn6oP9t//XEIvtEsiE+kmyqTmUhmvMAk=</DQ>" +
        "<InverseQ>p7o4BOlKZQZ693R1ViZ66y5gTjUkNNTd2za7/1YGBCs=</InverseQ>" +
        "<D>XZqFVrYy4qhECruJgVZFp/GVuD5Y0gev88nVjl5r911QT+I8vgJSklTso7jTlpMtf2oe7UZ0WRWEtgPS3tZn4Q==</D>" +
    "</RSAKeyValue>"; 
// ------------------------------------------------
// RSA Keys
// ------------------------------------------------
var rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
// Import parameters from XML string.
rsa.FromXmlString(xmlParams);
// Export RSA key to RSAParameters and include:
//    false - Only public key required for encryption.
//    true  - Private key required for decryption.
// Export parameters and include only Public Key (Modulus + Exponent) required for encryption.
var rsaParamsPublic = rsa.ExportParameters(false);
// Export Public Key (Modulus + Exponent) and include Private Key (D) required for decryption.
var rsaParamsPrivate = rsa.ExportParameters(true);
// ------------------------------------------------
// Encrypt
// ------------------------------------------------
var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(text);
// Create a new instance of RSACryptoServiceProvider.
rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
// Import the RSA Key information.
rsa.ImportParameters(rsaParamsPublic);
// Encrypt byte array.
var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
// Convert bytes to base64 string.
var encryptedString = System.Convert.ToBase64String(encryptedBytes);
// ------------------------------------------------
// Decrypt
// ------------------------------------------------
// Convert base64 string back to bytes.
encryptedBytes = System.Convert.FromBase64String(encryptedString);
// Create a new instance of RSACryptoServiceProvider.
rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
// Import the RSA Key information.
rsa.ImportParameters(rsaParamsPrivate);
// Decrypt byte array.
decryptedBytes = rsa.Decrypt(encryptedBytes, doOaepPadding);
// Get decrypted data.
text = System.Text.Encoding.UTF8.GetString(decryptedBytes);
// ------------------------------------------------
// Generate new RSA Key pair
// ------------------------------------------------
// Specify RSA key size.
var keySize = 512;
// Create a new instance of RSACryptoServiceProvider.
rsa = new System.Security.Cryptography.RSACryptoServiceProvider(keySize);
// Export the RSA Key information as XML string.
//    false - Only public key required for encryption.
//    true  - Private key required for decryption.
xmlParams = rsa.ToXmlString(true);