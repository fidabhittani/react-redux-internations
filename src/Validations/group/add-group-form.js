export function validateAddGroup(data) {
  let errors = {};

  if (data.name === "") errors.name = "Name is required ";
  // if (data.users.length === 0) errors.users = " User(s) is required ";

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
