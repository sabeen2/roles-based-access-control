export const validatePassword = (passwords: any, setPasswordError: any) => {
  const { new: newPassword } = passwords;
  const isValid =
    newPassword.length >= 8 &&
    /\d/.test(newPassword) &&
    /[!@#$%^&*]/.test(newPassword);
  if (!isValid) {
    setPasswordError(
      "Password must be at least 8 characters long and include a number and a special character."
    );
    return false;
  }
  return true;
};
