import { LitElement, html, css } from 'lit';
import './svg-get-component.js';

class ChipMail extends LitElement {
  static properties = {
    mailText: { type: String },
  };

  static styles = css`
    :host {
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      font-size: 12px;
      margin: 0.5em;
      padding: 0 0.5em;
      box-shadow: rgba(0, 0, 0, 0.64) 0px 0px 5px -3px;
    }
    
    svg-get-component {
      width: 16px;
      display: flex;
      margin-left: 0.5em;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    svg-get-component:hover {
      box-shadow: rgba(0, 0, 0, 0.64) 0px 0px 5px -3px;
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

  firstUpdated() {}

  render() {
    return html`<span
      >${this.mailText}
      <svg-get-component
        @click="${event => this._removeElement(event)}"
        url="/assets/close.svg"
      ></svg-get-component>
    </span>`;
  }

  _removeElement(event) {
    const nameEvent = 'deleteChipElement';
    const payload = {
      filterText: this.mailText,
      element: this
    };

    this.dispatchEvent(
      new CustomEvent(nameEvent, {
        detail: payload,
        bubbles: true,
        composed: true,
      })
    );

    
    event.stopPropagation();
    
    return this.remove();

  }
}

customElements.define('chip-mail', ChipMail);
