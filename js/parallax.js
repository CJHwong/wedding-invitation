class ParallaxPart {
  constructor(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute("data-parallax-speed"));
    this.maxScroll = parseInt(this.el.getAttribute("data-max-scroll"));
  }

  update(scrollY) {
    if (scrollY > this.maxScroll) {
      return;
    }
    const offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  }

  setYTransform(val) {
    this.el.style.webkitTransform = `translate3d(0, ${val}px, 0)`;
    this.el.style.MozTransform = `translate3d(0, ${val}px, 0)`;
    this.el.style.OTransform = `translate3d(0, ${val}px, 0)`;
    this.el.style.transform = `translate3d(0, ${val}px, 0)`;
    this.el.style.msTransform = `translateY(${val}px)`;
  }
}

export class ParallaxManager {
  constructor(elements) {
    this.parts = [];

    if (typeof elements === "array" && elements.length) {
      this.elements = elements;
    }

    if (typeof elements === "object" && elements.item) {
      this.elements = Array.prototype.slice.call(elements);
    } else if (typeof elements === "string") {
      this.elements = document.querySelectorAll(elements);

      if (this.elements.length === 0) {
        throw new Error("Parallax: No elements found");
      }

      this.elements = Array.prototype.slice.call(this.elements);
    } else {
      throw new Error(
        "Parallax: Element variable is not a querySelector string, Array, or NodeList"
      );
    }

    for (const el of this.elements) {
      this.parts.push(new ParallaxPart(el));
    }

    addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll() {
    requestAnimationFrame(() => {
      const scrollY = Math.max(window.scrollY, 0);
      for (const p of this.parts) {
        p.update(scrollY);
      }
    });
  }
}
