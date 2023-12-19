from pathlib import Path

from PIL import Image


def convert_to_webp(source: Path) -> Path:
    destination = source.with_suffix(".webp")

    image = Image.open(source)
    image.save(destination, format="webp")

    return destination


if __name__ == "__main__":
    for fn in Path("./assets/gallery/img").glob("*"):
        convert_to_webp(fn)
