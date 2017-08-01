export function validateAddUser(data) {
  let errors = {};

  if (data.firstName === "") errors.firstName = " First Name is required ";
  if (data.lastName === "") errors.lastName = " Last Name is required ";
  if (data.email === "") errors.email = " Email address Name is required ";
  if (data.username === "") errors.username = " Username is required ";
  if (data.dob === "") errors.dob = " DOB Name is required ";
  if (data.groups.length === 0) errors.groups = " Group is required ";

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
