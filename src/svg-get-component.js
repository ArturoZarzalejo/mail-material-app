import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

class SVGGetComponents extends LitElement {
  static properties = {
    url: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      margin: 1em;
    }

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
  `;

  constructor() {
    super();
  }

  async firstUpdated() {
    this.svgData = await SVGGetComponents._loadSVG(this.url);
    console.log(this.url);
    this.requestUpdate();
  }

  render() {
    return html`${unsafeSVG(this.svgData)}`;
  }

  static async _loadSVG(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo SVG');
        }
        return response.text();
      })
      .catch(error => {});
  }
}

customElements.define('svg-get-component', SVGGetComponents);
