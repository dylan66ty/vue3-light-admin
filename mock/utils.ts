export const formatResponse = (data, code = 200) => {
  return {
    success: code <= 207 && code >= 200,
    data,
    code
  }
}
