/**
 * Two Factor Authentication (TFA) atau otentikasi dua faktor adalah sistem keamanan berlapis
 * yang dirancang untuk memastikan bahwa hanya pemilik akun yang dapat mengakses akun miliknya.
 * Sedangkan One Time Password (OTP) adalah hasil proses TFA berupa kode yang berfungsi sebagai 
 * PIN keamanan, yang akan dikirim melalui SMS ke nomor handphone pengguna. 
 * https://www.npmjs.com/package/otplib
 */

/**
 * HMAC-based One-time Password algorithm (HOTP) is a one-time password (OTP) algorithm 
 * based on hash-based message authentication codes (HMAC). 
 * It is a cornerstone of the Initiative for Open Authentication (OATH).
 * hotp.generate(...)
 * hotp.check(...)
 * hotp.verify(...)
 */
const hotp = require('otplib/hotp')
