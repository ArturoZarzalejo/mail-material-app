import { LitElement, html, css } from 'lit';

class SearchReplies extends LitElement {
  static properties = {};

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
    .search-replies {
      display: flex;
      width: 100%;
      border: 0;
      padding: 1em 2em;
      border-radius: 20px;
      transition: all 0.2s ease-in-out;
    }

    .search-replies:focus {
      outline: 0;
    }

/*     @media (max-width: 600px) {
      .search-replies:focus {
        outline: 0px;
        padding: 2em;
        border-radius: 0;
        width: 100vw;
        position: absolute;
        left: 0;
        top: 0;
      }
    } */
  `;

  constructor() {
    super();
  }

  firstUpdated() {}

  render() {
    return html`<input
      class="search-replies"
      type="text"
      placeholder="Search replies"
      @keyup="${event => this._textFilter(event)}"
    />`;
  }

  _textFilter(event) {
    const nameEvent = 'search-replies-text';
    const payload = {
      filterText: event.target.value,
      target: event.target,
    };
    return this.dispatchEvent(
      new CustomEvent(nameEvent, {
        detail: payload,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('search-replies', SearchReplies);
