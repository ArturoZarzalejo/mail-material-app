import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './mail-component.js';
import './search-replies.js';
import './svg-get-component.js';
import { MailService } from './mail-service.js';

class MailMaterialApp extends LitElement {
  static properties = {};

  static styles = css`
    :host {
    }

    * {
      box-sizing: border-box;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .hidden {
      display: none;
    }

    main {
      flex-grow: 1;
    }

    .mail-container {
      display: flex;
    }

    .mail-container > div {
      flex: 1;
    }

    .replies-list-container ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .replies-list-container > ul > li {
      margin: 1em;
      display: flex;
      flex-direction: column;
    }

    .replies-list-container li > header {
      background: rgb(246, 248, 252);
      padding: 1em;
      border-radius: 20px 20px 0px 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .replies-list-container li > header h3 {
      margin: 0.5em 0;
    }

    .profile-pic {
      width: 64px;
      height: 64px;
      background-size: cover;
      border-radius: 50%;
      background-position: center;
      margin: 0.5em 1em;
    }

    .replies-list-content > header {
      display: flex;
    }

    .replies-list-content {
      background: #fff;
      padding: 1em;
      border-radius: 0 0 20px 20px;
    }

    .replies-list-content-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
    }

    .profile-name {
      font-weight: bold;
    }

    .replies-list-content-html {
      margin: 1em;
    }

    mail-component {
      background: #f2f6fc;
      display: flex;
      flex-direction: column;
      padding: 1em;
      margin: 1em;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .hover-effect:hover {
      -webkit-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      -moz-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
    }

    mail-component.active-mail {
      background: #d3e2fe;
      -webkit-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      -moz-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
    }

    search-replies {
      display: block;
      margin: 1em;
    }

    .floating-label-unselect {
      background: #fff;
      border: 0px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .floating-label-unselect:hover {
      -webkit-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      -moz-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
    }

    .floating-label-unselect svg-get-component {
      width: 28px;
      height: 28px;
      color: #757775;
    }

    .mail-container > aside {
      padding: 1em 0;
      width: 260px;
    }

    .header-aside {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em;
    }

    .header-aside > button {
      border: 0px;
      width: 48px;
      height: 48px;
      background: transparent;
      color: rgb(117, 119, 117);
      cursor: pointer;
    }

    .title-aside {
      font-size: 1.2em;
      color: rgb(9, 87, 207);
      font-weight: 500;
    }

    .button-menu-aside {
      display: block;
      font-weight: 600;
      border: 0px;
      width: 90%;
      height: 56px;
      font-size: 1em;
      position: relative;
      padding: 1em 1.5em;
      box-sizing: border-box;
      margin: 0 auto;
      cursor: pointer;
    }

    .mail-compose {
      background: rgb(195, 238, 208);
      border-radius: 15px;
      transition: all 0.2s ease-in-out;
    }

    .material-symbols-close-menu {
      display: block;
      padding: 0.7em;
    }

    nav {
      margin: 2em 0px;
    }

    .menu-button > button,
    .menu-button > a {
      border-radius: 25px;
      text-align: left;
      text-decoration: none;
      padding: 0px 1.5em 0px 3.5em;
      font-size: 0.9em;
      display: flex;
      color: #000;
      justify-content: space-between;
      align-items: center;
    }
    .menu-button > button.active,
    .menu-button > a.active {
      background: rgb(194, 231, 255);
    }

    .button-menu-aside svg-get-component {
      width: 24px;
      height: 24px;
      display: block;
      position: absolute;
      top: 50%;
      transform: translate(0px, -50%);
      left: 15px;
    }

    .menu-button svg-get-component {
      width: 24px;
      height: 24px;
      display: block;
      position: absolute;
      top: 50%;
      transform: translate(0px, -50%);
      left: 15px;
    }

    .new-inbox-email {
      position: absolute;
      bottom: 0px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 100%;
      padding: 0 1em;
    }
  `;

  constructor() {
    super();
    this.mailService = new MailService();

    this.menuArray = [{}];
  }

  async firstUpdated() {
    this._getElementByHref(MailMaterialApp._getRightPartOfUrl()).classList.add(
      'active'
    );
    this.dataMailService = await MailService.getMails();
    this.mailFilterArray = { data: [...this.dataMailService.data] };
    this.requestUpdate();
  }

  render() {
    return html`<section class="mail-container">
      <aside>
        <header class="header-aside">
          <span class="title-aside"> REPLY </span>
          <button>
            <span class="material-symbols-close-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                fill="currentColor"
              >
                <path
                  d="M110.435 822.696v-68.131h528.13v68.131h-528.13Zm691.63-52.957L607.326 575l193.739-193.739L849.805 430l-145 145 146 146-48.74 48.739Zm-691.63-161.674v-68.13h408.13v68.13h-408.13Zm0-210.63v-68.37h528.13v68.37h-528.13Z"
                />
              </svg>
            </span>
          </button>
        </header>
        <button
          @click="${MailMaterialApp._createHTMLComponent}"
          class="button-menu-aside mail-compose hover-effect"
        >
          <svg-get-component url="/assets/compose.svg"></svg-get-component
          >Compose
        </button>
        <nav>
          <ul>
            <li class="menu-button">
              <a href="/" class="button-menu-aside">
                <svg-get-component url="/assets/inbox.svg"></svg-get-component>
                Inbox
                <span> 4</span>
              </a>
            </li>
            <li class="menu-button">
              <a href="/prueba" class="button-menu-aside">
                <svg-get-component url="/assets/inbox.svg"></svg-get-component>
                Articles
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div>
        <search-replies
          @search-replies-text=${MailMaterialApp._searchRepliesHandler}
        ></search-replies>
        ${this.mailFilterArray?.data.map(
          mail =>
            html`<mail-component
              class="hover-effect"
              @active-mail=${MailMaterialApp._activeMailHandler}
              id="mailID${mail.id}"
              .mailContent="${mail}"
            ></mail-component>`
        )}
      </div>
      ${this.activeMail &&
      html`<div class="replies-list-container">
        <ul>
          <li>
            <header class="replies-list-header">
              <div>
                <h3>${this.activeMail.subject}</h3>
                ${(this.activeMail.totalReplies &&
                  html`<span
                    >${this.activeMail.totalReplies} mensajes</span
                  >`) ||
                ``}
              </div>
              <button
                class="floating-label-unselect"
                @click=${() => {
                  this.activeMail = null;
                  MailMaterialApp._removeActiveClassElements(
                    this.renderRoot.querySelectorAll('.active-mail')
                  );
                  return this.requestUpdate();
                }}
              >
                <svg-get-component url="/assets/close.svg"></svg-get-component>
              </button>
            </header>
            <div class="replies-list-content">
              <header>
                <figure
                  class="profile-pic"
                  style="background-image: url(${this.activeMail.profilePic})"
                ></figure>
                <div class="replies-list-content-info">
                  <span class="replies-list-content-info profile-name"
                    >${this.activeMail.profileName}</span
                  >
                  <span
                    >${MailMaterialApp._dateFormat(
                      new Date('2022', '2', '28')
                    )}</span
                  >
                </div>
              </header>
              <div class="replies-list-content-html">
                ${unsafeHTML(this.activeMail.mailContent)}
              </div>
            </div>
          </li>
        </ul>
      </div>`}
      <div class="new-inbox-email"></div>
    </section>`;
  }

  static _activeMailHandler(event) {
    const element = this.renderRoot.querySelector(
      `#mailID${event.detail.content.id}`
    );

    MailMaterialApp._removeActiveClassElements(
      this.renderRoot.querySelectorAll('.active-mail')
    );

    element.classList.add('active-mail');
    this.activeMail = event.detail.content;

    this.requestUpdate();
  }

  static _createHTMLComponent() {
    if (!customElements.get('mail-compose')) {
      MailMaterialApp._loadLazyComponent();
    }
    const element = document.createElement('mail-compose');
    this.renderRoot.querySelector('.new-inbox-email').appendChild(element);
  }

  static async _loadLazyComponent() {
    const { MailCompose } = await import('./mail-compose.js');
    customElements.define('mail-compose', MailCompose);
  }

  static foundStringFilter(dataToSearch, propertiesToSearch, text) {
    return dataToSearch.filter(
      mailProperties =>
        propertiesToSearch.filter(
          propertie =>
            !(
              mailProperties[propertie]
                .toLowerCase()
                .indexOf(text.toLowerCase()) === -1
            )
        ).length
    );
  }

  _getElementByHref(hrefValue) {
    return this.renderRoot.querySelector(`[href="${hrefValue}"]`);
  }

  static _getRightPartOfUrl() {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  }

  static _searchRepliesHandler(event) {
    const { filterText } = event.detail;

    if (!filterText) {
      this.mailFilterArray.data = [...this.dataMailService.data];
    } else {
      this.mailFilterArray.data = MailMaterialApp.foundStringFilter(
        [...this.dataMailService.data],
        ['profileName', 'subject', 'mailContent'],
        filterText
      );
    }

    return this.requestUpdate();
  }

  static _removeActiveClassElements(elements) {
    return (
      elements &&
      elements.forEach(activeElement => {
        activeElement.classList.remove('active-mail');
      })
    );
  }

  static _dateFormat(inputDate) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();

    const formattedDate = date.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDate}/${formattedMonth}/${year}`;
  }
}

customElements.define('mail-material-app', MailMaterialApp);
