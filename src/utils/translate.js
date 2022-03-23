
export function translateError(error) {
  if (error.detail) {
    return error.detail;
  } else {
    return error.message;
  }
}