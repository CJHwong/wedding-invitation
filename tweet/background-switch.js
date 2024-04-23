import { sleep } from "./utils.js";

async function getImageUrlsFromGallery() {
  const response = await fetch("./gallery.json");
  const filenameList = await response.json();
  return filenameList.map((filename) => `./gallery/${filename}`);
}

function getNextImage(container, imgPath) {
  const newBackgroundImage = `url(${imgPath})`;

  // Create a new image element for smooth transition
  const newImage = new Image();
  newImage.src = imgPath;

  newImage.onload = () => {
    container.style.opacity = 0; // Fade out existing image

    setTimeout(() => {
      container.style.backgroundImage = newBackgroundImage;
      container.style.opacity = 1; // Fade in new image
    }, 200); // Adjust fade duration as needed (in milliseconds)
  };
}

export async function startBackgroundSwitch(container) {
  let imageSrcList;
  while (true) {
    try {
      imageSrcList = await getImageUrlsFromGallery();
    } catch (error) {
      console.error("Error:", error);
    }

    for (const imgPath of imageSrcList) {
      getNextImage(container, imgPath);
      await sleep(7000);
    }
  }
}
