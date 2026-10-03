const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name) => {
  return name && name.length >= 20 && name.length <= 60;
};

const validateAddress = (address) => {
  return address && address.length <= 400;
};

const validatePassword = (password) => {
  // 8-16 characters
  // At least one uppercase
  // At least one special character
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

  return passwordRegex.test(password);
};

module.exports = {
  validateEmail,
  validateName,
  validateAddress,
  validatePassword,
};