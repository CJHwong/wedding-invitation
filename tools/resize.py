from pathlib import Path

from PIL import Image


def resize(source: Path, maximum_size=128) -> Path:
    destination = source.with_suffix(".webp.thumbnail")
    try:
        im = Image.open(source)
        im.thumbnail((maximum_size, maximum_size), Image.Resampling.LANCZOS)
        im.save(destination, format="webp")
    except IOError:
        print(f"cannot create thumbnail for '{source}'")


if __name__ == "__main__":
    for fn in Path("./assets/gallery/img").glob("*"):
        resize(fn, 480)
