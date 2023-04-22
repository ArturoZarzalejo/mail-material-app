import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class MailComponent extends LitElement {
  static properties = {
    mailContent: { type: Object },
  };

  static styles = css`
    :host {
    }

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .mail {
      display: flex;
      flex-direction: column;
    }

    .mail header {
      display: flex;
      align-items: center;
    }

    .profile-pic {
      width: 58px;
      height: 58px;
      background-size: cover;
      border-radius: 50%;
      background-position: center;
      margin-right: 0.5em;
    }

    .profile-name {
      font-size: 14px; 
    }

    .mail-subject {
      font-weight: bold;
      padding: 0.5em 0px;
    }

    .mail-content {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    // console.log(this.mailContent);
  }

  render() {
    return html`<div
      class="mail"
      @click="${event => this._activeMail(event, this.mailContent)}"
      @keyup="${event => this._activeMail(event, this.mailContent)}"
    >
      <header>
        <figure
          class="profile-pic"
          style="background-image: url(${this.mailContent.profilePic})"
        ></figure>
        <span class="profile-name">${this.mailContent.profileName}</span>
      </header>
      <span class="mail-subject">${this.mailContent.subject}</span>
      <span class="mail-content"
        >${unsafeHTML(this.mailContent.mailContent)}</span
      >
    </div>`;
  }

  _activeMail(event, mailContent) {
    const nameEvent = 'active-mail';
    const payload = {
      content: mailContent,
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

customElements.define('mail-component', MailComponent);
