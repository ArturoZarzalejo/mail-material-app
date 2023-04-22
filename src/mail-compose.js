import { LitElement, html, css, render } from 'lit';
import './svg-get-component.js';
import './chip-mail.js';

export class MailCompose extends LitElement {
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

    .mail-compose {
      background: transparent;
      width: 200px;
    }

    .mail-compose header {
      justify-content: space-between;
      align-items: center;
      padding: 0.5em 0.5em;
      border-radius: 10px 10px 0 0;
      margin: 0 0.2em;
      cursor: pointer;
      background: #f2f6fc;
      display: flex;
    }

    .box-shadow-effect,
    .button-actions-new-mail:hover {
      -webkit-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      -moz-box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
      box-shadow: 0px 0px 5px -3px rgba(0, 0, 0, 0.64);
    }

    .mail-compose .mail-header-subject {
      font-size: 14px;
      color: rgb(32, 33, 36);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 112px;
      font-weight: 600;
      display: block;
    }

    .mail-compose.open .mail-header-subject {
      max-width: 70%;
    }

    .button-actions-new-mail {
      padding: 0.2em;
      background: transparent;
      border: 0;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    .button-actions-new-mail svg-get-component {
      width: 18px;
      display: flex;
    }

    .mail-compose.open {
      width: 450px;
    }

    .mail-content {
      display: none;
      position: relative;
    }

    .mail-content .div-textarea {
      outline: 0px;
      border: 0px;
      resize: none;
      font-family: 'Roboto Flex', sans-serif;
      flex: 1;
      overflow: auto;
      padding: 1rem;
      font-size: 14px;
      padding-bottom: 4em;
    }

    .mail-content .sticky-footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 1em;
      background: rgb(255, 255, 255);
      display: flex;
      align-items: center;
    }

    .edit-bold,
    .edit-underline,
    .edit-cursive {
      background: transparent;
      outline: 0;
      border: 0;
      display: flex;
      align-items: center;
    }

    .edit-bold svg-get-component,
    .edit-underline svg-get-component,
    .edit-cursive svg-get-component {
      width: 20px;
    }

    .open .mail-content {
      height: 400px;
      background: white;
      margin: 0px 0.2em;
      box-shadow: rgba(0, 0, 0, 0.64) 0px 0px 5px -3px;
      display: flex;
      flex-direction: column;
    }

    .mail-subject,
    .mail-content-to-input {
      border: 0;
      padding: 1em 0em;
      margin: 0 1em;
      font-size: 12px;
    }

    .mail-subject:focus,
    .mail-content-to-input:focus {
      outline: 0;
    }

    .mail-content-to,
    .mail-subject {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0px 1rem;
      flex-wrap: wrap;
    }

    .mail-content-to chip-mail {
      display: flex;
      height: 35px;
    }

    .open header {
    }

    .button-to {
      font-size: 14px;
    }

    .send-mail {
      font-weight: bold;
      font-size: 14px;
      color: rgb(255, 255, 255);
      background: rgb(28, 97, 209);
      padding: 0 1em;
      height: 36px;
      border-radius: 15px;
      border: 0;
      margin-right: 1em;
    }

    .edit-text-underline {
      text-decoration: underline;
    }

    .edit-text-bold {
      font-weight: bold;
    }

    .edit-text-cursive {
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.subjectDefault = 'Mensaje nuevo';
    this.subject = '';
    this.arrayMails = [];
  }

  firstUpdated() {}

  render() {
    return html`<div
      class="mail-compose"
      @keyup="${MailCompose._minimizeElement}"
      @click="${MailCompose._minimizeElement}"
    >
      <header class="box-shadow-effect">
        <span class="mail-header-subject"
          >${(this.subject && this.subject) || this.subjectDefault}</span
        >
        <div>
          <button
            class="button-actions-new-mail"
            @click="${event => MailCompose._maximizeElement(event)}"
          >
            <svg-get-component url="/assets/expand.svg"></svg-get-component>
          </button>
          <button
            class="button-actions-new-mail"
            @click="${event => MailCompose._removeElement(event, this)}"
          >
            <svg-get-component url="/assets/close.svg"></svg-get-component>
          </button>
        </div>
      </header>
      <div
        class="mail-content"
        @keyup="${event => MailCompose.stopPropagation(event)}"
        @click="${event => MailCompose.stopPropagation(event)}"
      >
        <div class="mail-content-to">
          <span class="button-to">Para</span>
          <input
            class="mail-content-to-input"
            @keyup="${MailCompose._onToMailsChange}"
          />
        </div>
        <input
          class="mail-subject"
          placeholder="${this.subjectDefault}"
          @keyup="${MailCompose._onMailSubjectChange}"
        />
        <div class="div-textarea" contenteditable="true">Escribe aquí...</div>
        <footer class="sticky-footer">
          <button
            class="send-mail box-shadow-effect"
            @click=${MailCompose._sendMail}
          >
            Enviar
          </button>
          <button
            class="edit-bold"
            @click=${() => this._editText('edit-text-bold')}
          >
            <svg-get-component url="/assets/bold.svg"></svg-get-component>
          </button>
          <button
            class="edit-underline"
            @click=${() => this._editText('edit-text-underline')}
          >
            <svg-get-component url="/assets/underline.svg"></svg-get-component>
          </button>
          <button
            class="edit-cursive"
            @click=${() => this._editText('edit-text-cursive')}
          >
            <svg-get-component url="/assets/italic.svg"></svg-get-component>
          </button>
        </footer>
      </div>
    </div> `;
  }

  _editText(edit) {
    const elemento = this.renderRoot.querySelector('.div-textarea');
    const seleccion = window.getSelection();
    const contenidoSeleccionado = seleccion.toString();
    const contenidoModificado = `<span class="${edit}">${contenidoSeleccionado}</span>`;
    elemento.innerHTML = elemento.innerHTML.replace(
      contenidoSeleccionado,
      contenidoModificado
    );
  }

  static _minimizeElement() {
    this.renderRoot.querySelector('.mail-compose').classList.toggle('open');
  }

  static _isValidEmail(email) {
    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Retorna 'true' si el correo electrónico cumple con el formato, de lo contrario retorna 'false'
    return emailRegex.test(String(email).toLowerCase());
  }

  static _onToMailsChange(event) {
    if (event.code === 'Enter') {
      if (MailCompose._isValidEmail(event.target.value)) {
        if (this.arrayMails.includes(event.target.value)) {
          console.log(`duplicado ${event.target.value}`);
        } else {
          this.arrayMails.push(event.target.value);

          const element = document.createElement('chip-mail');
          element.setAttribute('mailText', event.target.value);
          element.addEventListener(
            'deleteChipElement',
            MailCompose._removeElementArray.bind(this)
          );

          const container = this.renderRoot.querySelector('.mail-content-to');
          const elementToSibling = this.renderRoot.querySelector(
            '.mail-content-to-input'
          );
          elementToSibling.value = '';
          container.insertBefore(element, elementToSibling);
          this.requestUpdate();
        }
      } else {
        console.log('dirección de correo incorrecta');
      }
    }

    return this.requestUpdate();
  }

  static _sendMail() {}

  static _onMailSubjectChange(event) {
    this.subject = event.target.value;
    return this.requestUpdate();
  }

  static _removeElementArray(data) {
    const position = this.arrayMails.findIndex(
      element => element === data.detail.filterText
    );
    this.arrayMails.splice(position, 1);
    console.log(
      `El elemento "${data.detail.filterText}" ha sido eliminado del ${this.arrayMails.filterText}`
    );
  }

  static _maximizeElement(event) {
    event.stopPropagation();
  }

  static stopPropagation(event) {
    event.stopPropagation();
  }

  static _removeElement(event, context) {
    context.remove();
    event.stopPropagation();
  }
}
