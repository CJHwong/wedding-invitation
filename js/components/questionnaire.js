import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/npm/lit@2.7.6/+esm";

class Component extends LitElement {
  static styles = css`
    iframe {
      min-height: 600px;
      width: 100%;
      height: 100%;
      background-color: #fae5b9;
      border-radius: 8px;
    }
  `;

  render() {
    return html`
      <iframe
        loading="lazy"
        src="https://docs.google.com/forms/d/e/1FAIpQLScsGzbYSyTP5tl7QtVun-3CBttNdrUevHtL6xZzqvXJYLJnLA/viewform?embedded=true"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    `;
  }
}

customElements.define("questionnaire-component", Component);
