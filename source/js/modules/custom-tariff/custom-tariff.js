export class CustomTariff {
  constructor() {
    this._customTariff = document.querySelector('[data-custom-tariff]');
    this._customTariffCheckedRadio = null;
    this._customTariffCheckbox = null;
    this._customTariffInternet = null;
    this._customTariffInternetAndTv = null;
    this._customTariffTotalPrice = null;

    this._customTariffNameInput = null;
    this._customTariffPriceInput = null;
    this._customTariffTelevisionInput = null;
    this._customTariffVideoInput = null;
    this._customTariffStaticIpInput = null;

    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    if (!this._customTariff) {
      return;
    }

    this._customTariffCheckedRadio = this._customTariff.querySelector('[data-custom-tariff-radio]:checked');
    this._customTariffInternet = this._customTariff.querySelector('[data-custom-tariff-type="internet"]');
    this._customTariffInternetAndTv = this._customTariff.querySelector('[data-custom-tariff-type="internet-and-tv"]');
    this._customTariffTotalPrice = this._customTariff.querySelector('[data-custom-tariff-total-price]');

    this._serviceName = this._customTariff.querySelector('[data-service-name]');
    this._servicePrice = this._customTariff.querySelector('[data-service-price]');

    const checkboxPrices = this._customTariff.querySelectorAll('[data-custom-tariff-checkbox]:checked[data-custom-tariff-price]');

    if (checkboxPrices) {
      checkboxPrices.forEach((checkboxPrice) => {
        this._addPrice(checkboxPrice);
      });
    }

    this._sendToForm();
    this._servicePrice.value = this._customTariffTotalPrice.childNodes[0].nodeValue;

    document.addEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick(evt) {
    const target = evt.target;

    if (target.closest('[data-custom-tariff-radio]')) {
      this._subtractPrice();
      this._customTariffCheckedRadio = target.closest('[data-custom-tariff-radio]');

      this._radioHandler();
    }

    if (target.closest('[data-custom-tariff-checkbox]')) {
      this._customTariffCheckbox = target.closest('[data-custom-tariff-checkbox]');

      this._checkboxHandler();
    }
  }

  _radioHandler() {
    this._addPrice();
    this._sendToForm();
  }

  _checkboxHandler() {
    switch (this._customTariffCheckbox.dataset.customTariffCheckbox) {
      case 'television':
        const checkboxTelevision = document.querySelector('[data-custom-tariff-checkbox="television"]');
        if (checkboxTelevision.checked) {
          this._customTariffInternet.style.display = 'none';
          this._customTariffInternetAndTv.style.display = 'block';

          this._checkboxWithRadioCalculatePrice(this._customTariffInternetAndTv);
        } else {
          this._customTariffInternet.style.display = 'block';
          this._customTariffInternetAndTv.style.display = 'none';

          this._checkboxWithRadioCalculatePrice(this._customTariffInternet);
        }
        break;
      case 'video':
        const checkboxVideo = document.querySelector('[data-custom-tariff-checkbox="video"]');

        this._checkboxCalculatePrice(checkboxVideo);
        break;
      case 'static-ip':
        const checkboxStaticIp = document.querySelector('[data-custom-tariff-checkbox="static-ip"]');

        this._checkboxCalculatePrice(checkboxStaticIp);
        break;
    }
  }

  _checkboxWithRadioCalculatePrice(tariffType) {
    this._subtractPrice();

    const firstInputOfGroup = tariffType.querySelector('[data-custom-tariff-radio]');

    firstInputOfGroup.checked = true;
    this._customTariffCheckedRadio.checked = false;
    this._customTariffCheckedRadio = firstInputOfGroup;
    this._addPrice();

    this._sendToForm();
  }

  _checkboxCalculatePrice(checkbox) {
    if (checkbox.checked) {
      this._addPrice(checkbox);
    } else {
      this._subtractPrice(checkbox);
    }
  }

  _addPrice(input = null) {
    let price;

    if (input) {
      price = Number(input.dataset.customTariffPrice);
    } else {
      price = Number(this._customTariffCheckedRadio.dataset.customTariffPrice);
    }

    this._customTariffTotalPrice.childNodes[0].nodeValue = Number(this._customTariffTotalPrice.childNodes[0].nodeValue) + price;
    this._servicePrice.value = this._customTariffTotalPrice.childNodes[0].nodeValue;
  }

  _subtractPrice(input = null) {
    let price;

    if (input) {
      price = Number(input.dataset.customTariffPrice);
    } else {
      price = Number(this._customTariffCheckedRadio.dataset.customTariffPrice);
    }

    this._customTariffTotalPrice.childNodes[0].nodeValue = Number(this._customTariffTotalPrice.childNodes[0].nodeValue) - price;
    this._servicePrice.value = this._customTariffTotalPrice.childNodes[0].nodeValue;
  }

  _sendToForm() {
    this._serviceName.value = this._customTariffCheckedRadio.dataset.customTariffRadio;
  }
}
