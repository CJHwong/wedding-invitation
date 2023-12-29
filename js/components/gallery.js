import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/npm/lit@2.7.6/+esm";

const LAYOUTS = [
  {
    style: "slower",
    src: "./assets/gallery/2023_1.webp",
    title: "2023.08",
  },
  {
    style: "faster",
    src: "./assets/gallery/2023_2.webp",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2023_3.webp",
  },
  {
    style: "slower-down",
    src: "./assets/gallery/2023_4.webp",
  },
  {
    style: "fastest",
    src: "./assets/gallery/2023_5.webp",
  },
  {
    style: "fastest",
    src: "./assets/gallery/2023_6.webp",
    title: "2023.07",
  },
  {
    style: "faster1",
    src: "./assets/gallery/2023_7.webp",
    title: "2023.06",
  },
  {
    style: "faster",
    src: "./assets/gallery/2023_8.webp",
  },
  {
    style: "slower",
    src: "./assets/gallery/2022_1.webp",
    title: "2022.10",
  },
  {
    style: "slower-down",
    src: "./assets/gallery/2021_1.webp",
    title: "2021.12",
  },
  {
    style: "slower-down",
    src: "./assets/gallery/2021_2.webp",
  },
  {
    style: "fastest",
    src: "./assets/gallery/2020_1.webp",
    title: "2020.12",
  },
  {
    style: "slower1",
    src: "./assets/gallery/2020_2.webp",
  },
  {
    style: "faster",
    src: "./assets/gallery/2020_3.webp",
  },
  {
    style: "fastest",
    src: "./assets/gallery/2019_1.webp",
    title: "2019.04",
  },
  {
    style: "faster1",
    src: "./assets/gallery/2019_2.webp",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2018_1.webp",
    title: "2018.01",
  },
  {
    style: "slower",
    src: "./assets/gallery/2017_1.webp",
    title: "2017.05",
  },
  {
    style: "slower1",
    src: "./assets/gallery/2016_1.webp",
    title: "2016.06",
  },
  {
    style: "slower2 ",
    src: "./assets/gallery/2015_1.webp",
    title: "2015.10",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2015_2.webp",
  },
  {
    style: "faster",
    src: "./assets/gallery/2015_3.webp",
  },
  {
    style: "slower2",
    src: "./assets/gallery/2015_4.webp",
    title: "2015.02",
  },
  {
    style: "slower-down",
    src: "./assets/gallery/2015_5.webp",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2014_1.webp",
    title: "2014.07",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2014_2.webp",
  },
  {
    style: "vertical",
    src: "./assets/gallery/2013_1.webp",
    title: "2013.10",
  },
];

const styles = css`
  * {
    box-sizing: border-box;
    user-select: none;
  }

  .external {
    overflow: hidden;
    height: 100vh;
    background-color: #050707;
    // background: radial-gradient(ellipse at bottom, #050707 0%, #090a0f 100%);
  }

  .horizontal-scroll-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vh;
    transform: rotate(-90deg) translate3d(0, -100vh, 0);
    transform-origin: right top;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    height: 100vw;
    perspective: 1px;
    transform-style: preserve-3d;
    padding-bottom: 10rem;

    scrollbar-width: none; /* Firefox */
  }

  .horizontal-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  .img-wrapper {
    transform: rotate(90deg);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    transform-origin: 50% 50%;
    transform: rotate(90deg) translateZ(0.1px) scale(0.9) translateX(0px)
      translateY(-3vh);
    transition: 1s;
  }

  .img-wrapper:hover {
    min-height: 65vh;
  }

  .img-wrapper a {
    overflow: hidden;
    display: block;
    padding: 1vh;
    background: #efecdb;
    box-shadow: 0 10px 50px #5f2f1182;
    color: inherit;
    font-weight: 500;
    text-decoration: none;
  }

  .img-wrapper a:hover img {
    filter: none;
  }

  .img-wrapper img {
    max-width: 45vh;
    max-height: 50vh;
    transition: 0.5s;
    vertical-align: top;
    filter: saturate(100%) sepia(30%) hue-rotate(5deg);
  }

  .img-wrapper .img-title {
    margin-left: 16px;
    color: #050707;
    font-family: "Payung Senja", sans-serif;
    font-size: 1.8em;
    font-weight: bold;
  }

  .nav button {
    position: absolute;
    z-index: 1;
    width: 50%;
    height: 80vh;
    border: none;
    background: transparent;
  }

  .nav .right {
    right: 0;
  }

  .slower {
    transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(0%)
      translateY(-10vh);
  }

  .slower1 {
    transform: rotate(90deg) translateZ(-0.25px) scale(1.05) translateX(0%)
      translateY(8vh);
  }

  .slower2 {
    transform: rotate(90deg) translateZ(-0.3px) scale(1.3) translateX(0%)
      translateY(2vh);
  }

  .slower-down {
    transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(0%)
      translateY(10vh);
  }

  .faster {
    transform: rotate(90deg) translateZ(0.15px) scale(0.8) translateX(0%)
      translateY(14vh);
  }

  .faster1 {
    transform: rotate(90deg) translateZ(0.05px) scale(0.8) translateX(0%)
      translateY(10vh);
  }

  .fastest {
    transform: rotate(90deg) translateZ(0.22px) scale(0.7) translateX(-10vh)
      translateY(-15vh);
  }

  .vertical {
    transform: rotate(90deg) translateZ(-0.15px) scale(1.15) translateX(0%)
      translateY(0%);
  }

  .last {
    transform: rotate(90deg) translateZ(-0.2px) scale(1.1) translateX(25vh)
      translateY(-8vh);
  }
`;

class Component extends LitElement {
  static styles = styles;

  _scrollGallery(direction) {
    let sign;
    switch (direction) {
      case "left":
        sign = -1;
        break;
      case "right":
        sign = 1;
        break;
      default:
        throw new Error("Invalid direction");
    }

    return () => {
      const ele = this.renderRoot.querySelector(".horizontal-scroll-wrapper");
      const offset = window.innerWidth * 0.7;
      ele.scrollBy({
        top: sign * offset,
        left: 0,
        behavior: "smooth",
      });
    };
  }

  render() {
    const isLast = (i) => i === LAYOUTS.length - 1;
    return html`
      <div class="external">
        <div class="nav">
          <button class="left" @click=${this._scrollGallery("left")}></button>
          <button class="right" @click=${this._scrollGallery("right")}></button>
        </div>

        <div class="horizontal-scroll-wrapper">
          ${LAYOUTS.map(
            (l, i) =>
              html`
                <div class="img-wrapper ${l.style} ${isLast(i) ? "last" : ""}">
                  <a href="javascript:void(0)" rel="noopener">
                    <img alt="" src="${l.src}.thumbnail" />
                    ${l.title ? html`<p class="img-title">${l.title}</p>` : ""}
                  </a>
                </div>
              `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("gallery-component", Component);
