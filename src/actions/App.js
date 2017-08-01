// Application Constants
export const IS_LOADING = "IS_LOADING";
export const IS_ERROR = "IS_ERROR";
// Application Handlerrs
export function isLoading(flag) {
  return {
    type: IS_LOADING,
    isLoading: flag
  };
}
export function isError(errors) {
  return {
    type: IS_ERROR,
    errors
  };
}
// Handle Response
export function handleResponse(response, dispatch) {
  dispatch(isLoading(false));
  if (response.ok) {
    return response.json();
  } else {
    dispatch(isError(["Server says : " + response.statusText]));
    let error = new Error(response.statusText);
    error.response = response;
    error.dispatch = dispatch;
    throw error;
  }
}
// Handle Response
export function catchHandler(error) {
  console.log(
    "There has been a problem with your fetch operation: " + error.message
  );
}
