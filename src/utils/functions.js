export const replaceRequestData = (obj) => {
  let formUrlencoded = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      formUrlencoded.push(key + "=" + obj[key])
    }
  }
  formUrlencoded = formUrlencoded.join("&");
  return formUrlencoded;
}