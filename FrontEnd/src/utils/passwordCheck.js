const PasswordCheck = (password) => {
  let errors = [];
  if (!/.{8,}/.test(password)) errors.push("Must be at least 8 characters");
  if (!/[a-z]/.test(password)) errors.push("Must include a lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("Must include an uppercase letter");
  if (!/\d/.test(password)) errors.push("Must include a digit");
  if (!/[\W_]/.test(password)) errors.push("Must include a special character");
  console.log(errors);
  return errors;
};

export default PasswordCheck;
