export function calcOpacity(hostHeight, elementHeight, start = 0) {
  if (!hostHeight || !elementHeight) {
    return 1;
  }

  const scrollTop = window.scrollY;
  const comparePost = scrollTop + window.innerHeight / 3;
  if (comparePost < hostHeight) {
    return start;
  }

  return Math.min(start + (comparePost - hostHeight) / elementHeight, 1);
}
