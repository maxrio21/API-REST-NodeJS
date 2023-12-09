//bcryptUtils.js
const bcrypt = require('bcrypt');

  const generateHash = async (plainText) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainText, saltRounds);
  };
  
  const compareHash = async (plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
  };
  
  const comparePassword = async (password, hashedPassword) => {
    try {
      const result = await bcrypt.compare(password, hashedPassword);
  
      return result;
    } catch (error) {
      console.error("Error al comparar contraseñas:", error);
      throw error;
    }  
  };

  module.exports = {
    generateHash,
    compareHash,
    comparePassword
  };