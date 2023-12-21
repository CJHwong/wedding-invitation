import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/npm/lit@2.7.6/+esm";

import { calcOpacity } from "../gradient.js";

const WEDDING_DATE = new Date("2024-05-04T17:30:00.000+08:00");
const styles = css`
  .external {
    position: relative;
    background-color: #050707;
  }

  header {
    height: 200vh;
  }

  .container {
    /* hide fixed overflow contents */
    clip: rect(0, auto, auto, 0);

    /* does not work if overflow = visible */
    overflow: hidden;

    /* only works with absolute positioning */
    position: absolute;

    /* Make sure containers are full-width and height */
    height: 100vh;
    left: 0;
    width: 100%;

    /* safari hack */
    -webkit-mask-image: -webkit-linear-gradient(top, #ffffff 0%, #ffffff 100%);
  }

  .container-solid {
    background: #050707;

    /* position this container at the top of its parent element */
    top: 0;
  }

  .title-wrapper {
    position: fixed;
    display: block;
    margin: auto;
    width: 100%;
    /* center the text wrapper vertically */
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .title-wrapper h1 {
    text-align: center;
    text-transform: uppercase;
    text-align: center;
    font-family: "SF Distant Galaxy", serif;
    font-size: 64px;
    font-weight: 400;
  }

  @media (max-width: 800px) {
    .title-wrapper h1 {
      font-size: 32px;
    }
  }

  .container-solid .title-wrapper h1 {
    /* the text background */
    background: url(./assets/bg.webp);
    background-size: 100vw auto;
    background-position: center;

    /* clip the text is possible */
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    /* fallback text color */
    color: #040707;
  }

  .container-image {
    background-image: url(./assets/bg.webp);
    background-size: 100vw auto;
    background-position: center;
    background-attachment: fixed;
    background-size: 120%;

    /* position the second container below the first container */
    top: 100vh;
  }

  .container-image .title-wrapper h1 {
    color: #ffda00;
  }

  section {
    background-color: #050707;
    min-height: 100vh;
    padding: 2em 2em 2em 2em;
    margin: auto;
    max-width: 800px;
    text-align: center;
    font-family: "SF Distant Galaxy", serif;
  }

  section h1 {
    color: #ffda00;
    font-size: 32px;
    font-weight: 400;
  }

  .section-title {
    margin-bottom: 64px;
  }

  .section-footer {
    margin-top: 64px;
    margin-bottom: 0;
  }

  .location-info {
    width: 100%;
    margin-top: 64px;
    margin-bottom: 64px;
    font-size: 32px;
    font-weight: 400;
    color: white;
    line-height: 16px;
    text-align: center;
  }

  .location-info a {
    color: white;
    text-decoration: none;
  }

  .location-info .address a {
    font-family: sans-serif, ui-sans-serif, system-ui;
    font-size: 12px;
    color: #01d9f2;
  }

  @media (max-width: 800px) {
    .location-info {
      font-size: 24px;
      line-height: 24px;
    }

    .location-info .address {
      font-size: 16px;
    }
  }

  iframe {
    max-width: 100%;
    background-color: #fae5b9;
    border-radius: 8px;
  }
`;

class Component extends LitElement {
  static styles = styles;

  static properties = {
    _timer: { state: true },
  };

  constructor() {
    super();

    this._timer = "";
  }

  connectedCallback() {
    super.connectedCallback();

    this._timerUpdater = setInterval(() => this._updateTimer(), 1000);
    this._scrollHandler = () => {
      const host = this.renderRoot.host;
      const ele = this.renderRoot.querySelector(".gradient-container");
      ele.style.opacity = calcOpacity(
        host.offsetHeight,
        ele.offsetHeight,
        -0.5
      );
    };
    addEventListener("scroll", this._scrollHandler);
  }

  disconnectedCallback() {
    removeEventListener("scroll", this._scrollHandler);
    clearInterval(this._timerUpdater);

    super.disconnectedCallback();
  }

  _updateTimer() {
    const diff = Math.floor(Math.abs(WEDDING_DATE - new Date()) / 1000);
    const secRemain = String(diff % 60).padStart(2, "0");

    const minmutes = Math.floor(diff / 60);
    const minRemain = String(minmutes % 60).padStart(2, "0");

    const hrs = Math.floor(minmutes / 60);
    const hrRemain = String(hrs % 24).padStart(2, "0");

    const dayRemain = Math.floor(hrs / 24);
    this._timer = `${dayRemain}d ${hrRemain}h ${minRemain}m ${secRemain}s`;
  }

  render() {
    const googleMap = {
      name: "Chalet V",
      address: "台北市中山區植福路８號一樓（戶外入口）",
      link: "https://maps.app.goo.gl/CXJg9MSUfiPFhDNC9",
      icon: html`<svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0,0,256,256"
      >
        <g
          fill="lightblue"
          fill-rule="nonzero"
          stroke="none"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <g transform="scale(5.12,5.12)">
            <path
              d="M28.292,1.326c-1.066,-0.21 -2.165,-0.326 -3.292,-0.326c-4.71,0 -8.98,1.93 -12.06,5.04l6.92,5.592zM18.595,13.178l-6.975,-5.628c-2.27,2.88 -3.62,6.52 -3.62,10.45c0,2.281 0.452,4.487 1.304,6.534zM22.608,11.432c0.745,-0.273 1.546,-0.432 2.392,-0.432c3.87,0 7,3.13 7,7c0,0.338 -0.032,0.667 -0.078,0.992l7.772,-9.499c-2.058,-3.539 -5.348,-6.268 -9.285,-7.595zM27.341,24.591c-0.733,0.26 -1.519,0.409 -2.341,0.409c-3.87,0 -7,-3.13 -7,-7c0,-0.354 0.034,-0.7 0.084,-1.039l-7.803,9.537c0.386,0.666 0.809,1.315 1.289,1.932c0.37,0.5 0.87,1.14 1.45,1.89c1.267,1.633 2.959,3.816 4.59,6.164zM18.778,38.215c2.082,3.184 3.852,6.497 4.172,9.055c0.14,0.99 0.99,1.73 1.99,1.73c1.02,0 1.87,-0.75 1.99,-1.75c0.61,-4.83 6.57,-12.48 9.78,-16.6c0.56,-0.72 1.05,-1.35 1.5,-1.94c2.44,-3.02 3.79,-6.82 3.79,-10.71c0,-2.322 -0.471,-4.536 -1.319,-6.555z"
            ></path>
          </g>
        </g>
      </svg>`,
    };

    return html`
      <div class="external">
        <header>
          <div class="container container-solid">
            <div class="title-wrapper">
              <h1>${this._timer}</h1>
            </div>
          </div>

          <div class="container container-image" aria-hidden="true">
            <div class="title-wrapper">
              <h1>${this._timer}</h1>
            </div>
          </div>
        </header>

        <section>
          <div class="gradient-container">
            <h1 class="section-title">Save the date</h1>

            <div class="location-info">
              <p>2024 | 05 | 04</p>
              <p>@${googleMap.name}</p>
              <p class="address">
                <a href="${googleMap.link}" target="_blank">
                  ${googleMap.icon} ${googleMap.address}
                </a>
              </p>
            </div>

            <div style="margin-bottom: 64px;">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3613.536282166664!2d121.5523542!3d25.0837016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ad7e7479d027%3A0x5b6a14ae3fb2e3dc!2zQ0hBTEVUIFYg5YyX576O55Sf5rS75oSf5pep5Y2I6aSQ!5e0!3m2!1szh-TW!2stw!4v1703168799716!5m2!1szh-TW!2stw"
                width="400"
                height="300"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <slot name="form"></slot>

            <h1 class="section-footer">May the 4th be with us</h1>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define("info-component", Component);
