export const isNameValid = (name: string): boolean => {
  if (!name.trim() || name.length < 3 || name.length > 50) {
    return false;
  }
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(name);
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }
  return true;
};

export const isPasswordValid = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  if (!password || !passwordRegex.test(password)) {
    return false;
  }
  return true;
};

export const isPasswordValidForLogin = (password: string): boolean => {
  return password.trim() !== '';
};
