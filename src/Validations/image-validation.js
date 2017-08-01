export function imageExists(url) {
  var image = new Image();
  image.src = url;
  if (!image.complete) {
    return false;
  } else if (image.height === 0) {
    return false;
  }
  return true;
}
