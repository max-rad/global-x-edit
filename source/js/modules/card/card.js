import {modals} from '../modal/init-modals';

export class Card {
  constructor() {
    this._card = null;
    this._cardTitle = null;
    this._cardInput = null;
    this._oldPrice = null;
    this._cardPrice = null;
    this._cardButton = null;
    this._modal = document.querySelector('[data-modal="request"]');

    this._modalInputPrice = null;
    this._modalInputTitle = null;

    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    if (!this._modal) {
      return;
    }

    this._modalInputTitle = this._modal.querySelector('[data-service-title]');
    this._modalInputPrice = this._modal.querySelector('[data-service-price]');
    this._modalInputStaticIp = this._modal.querySelector('[data-static-ip]');

    document.addEventListener('click', this._onDocumentClick);
  }

  _initCard() {
    this._cardTitle = this._card.querySelector('[data-card-title]');
    this._cardInput = this._card.querySelector('[data-card-input]');
    this._cardPrice = this._card.querySelector('[data-card-price]');
    this._cardButton = this._card.querySelector('[data-card-button]');
  }

  _calculatePrice() {
    if (this._cardInput.checked) {
      this._cardPrice.childNodes[0].nodeValue = Number(this._cardPrice.childNodes[0].nodeValue) + Number(this._cardInput.dataset.cardInput);
    } else {
      this._cardPrice.childNodes[0].nodeValue = Number(this._cardPrice.childNodes[0].nodeValue) - Number(this._cardInput.dataset.cardInput);
    }
  }

  _sendToForm() {
    modals.open('request');
    this._modalInputTitle.value = this._cardTitle.innerHTML;
    this._modalInputPrice.value = this._cardPrice.childNodes[0].nodeValue;
    if (this._cardInput.checked) {
      this._modalInputStaticIp.value = 'да';
    } else {
      this._modalInputStaticIp.value = 'нет';
    }
  }

  _onDocumentClick(evt) {
    const target = evt.target;

    if (target.closest('[data-card-input]')) {
      this._card = target.closest('[data-card]');
      this._initCard();
      this._calculatePrice();
    }

    if (target.closest('[data-card-button]')) {
      this._card = target.closest('[data-card]');
      this._initCard();
      this._sendToForm();
    }

    if (target.closest('[data-card-link]')) {
      evt.preventDefault();

      this._card = target.closest('[data-card]');
      this._cardTitle = this._card.querySelector('[data-card-title]');

      modals.open('request');
      this._modalInputTitle.value = this._cardTitle.innerHTML;
    }
  }
}
