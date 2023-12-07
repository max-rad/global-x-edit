export class TariffConstructor {
  constructor() {
    this._tariffConstructor = document.querySelector('[data-tariff-constructor]');
    this._tariffConstructorCheckedRadio = null;
    this._tariffConstructorCheckbox = null;
    this._tariffConstructorInternet = null;
    this._tariffConstructorInternetAndTv = null;
    this._tariffConstructorTotalPrice = null;
    this._tariffConstructorOptions = document.querySelector('[data-tariff-constructor-options]');
    this._tariffConstructorOption = null;
    this._tariffConstructorOptionPrice = null;
    this._tariffConstructorOptionText = null;
    this._tariffConstructorText = null;
    this._tariffConstructorButton = null;

    this._serviceName = null;
    this._serviceSpeed = null;
    this._serviceTotalPrice = null;

    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    if (!this._tariffConstructor) {
      return;
    }

    this._tariffConstructorCheckedRadio = this._tariffConstructor.querySelector('[data-tariff-constructor-radio]:checked');
    this._tariffConstructorTotalPrice = this._tariffConstructor.querySelector('[data-tariff-constructor-total-price]');
    this._tariffConstructorInternet = this._tariffConstructor.querySelector('[data-tariff-constructor-type="internet"]');
    this._tariffConstructorInternetAndTv = this._tariffConstructor.querySelector('[data-tariff-constructor-type="internet-and-tv"]');

    this._serviceName = this._tariffConstructor.querySelector('[data-service-name]');
    this._serviceSpeed = this._tariffConstructor.querySelector('[data-service-speed');
    this._serviceTotalPrice = this._tariffConstructor.querySelector('[data-service-total-price]');

    this._tariffConstructorTotalPrice.childNodes[0].nodeValue = 0;
    this._tariffConstructorText = 'Интернет ';

    if (this._tariffConstructorCheckedRadio.closest('[data-tariff-constructor-type="internet"]')) {
      this._tariffConstructorInternet.style.display = 'flex';
      this._tariffConstructorInternetAndTv.style.display = 'none';
      this._tariffConstructorText = 'Интернет ';
    } else {
      this._tariffConstructorInternet.style.display = 'none';
      this._tariffConstructorInternetAndTv.style.display = 'flex';
      this._tariffConstructorText = 'Интернет+TV ';
    }

    const checkboxPrices = this._tariffConstructor.querySelectorAll('[data-tariff-constructor-checkbox]:checked[data-tariff-constructor-price]');
    if (checkboxPrices) {
      checkboxPrices.forEach((checkboxPrice) => {
        this._checkCheckbox(checkboxPrice);
      });
    }

    this._addPrice();
    this._updateOption();
    this._sendToForm();
    this._serviceTotalPrice.value = this._tariffConstructorTotalPrice.childNodes[0].nodeValue;

    document.addEventListener('click', this._onDocumentClick);
  }

  _checkCheckbox(price) {
    if (price.dataset.tariffConstructorCheckbox === 'television') {
      this._tariffConstructorInternet.style.display = 'none';
      this._tariffConstructorInternetAndTv.style.display = 'flex';
      this._tariffConstructorText = 'Интернет+TV ';

      this._setFirstRadioOfGroup(this._tariffConstructorInternetAndTv);
    } else {
      if (this._tariffConstructorOptions) {
        document.querySelector(`[data-tariff-constructor-option=${price.dataset.tariffConstructorCheckbox}]`).style.display = 'flex';
      }
      this._addPrice(price);
    }
  }

  _updateOption() {
    if (!this._tariffConstructorOptions) {
      return;
    }

    const option = document.querySelector('[data-tariff-constructor-option="internet"]');
    option.querySelector('[data-tariff-constructor-option-text]').innerHTML = this._tariffConstructorText + this._tariffConstructorCheckedRadio.value;
    option.querySelector('[data-tariff-constructor-option-price]').innerHTML = this._tariffConstructorCheckedRadio.dataset.tariffConstructorPrice;
  }

  _addPrice(input = null) {
    let price;

    if (input) {
      price = Number(input.dataset.tariffConstructorPrice);
    } else {
      price = Number(this._tariffConstructorCheckedRadio.dataset.tariffConstructorPrice);
    }

    this._tariffConstructorTotalPrice.childNodes[0].nodeValue = Number(this._tariffConstructorTotalPrice.childNodes[0].nodeValue) + price;
    this._serviceTotalPrice.value = this._tariffConstructorTotalPrice.childNodes[0].nodeValue;
  }

  _subtractPrice(input = null) {
    let price;

    if (input) {
      price = Number(input.dataset.tariffConstructorPrice);
    } else {
      price = Number(this._tariffConstructorCheckedRadio.dataset.tariffConstructorPrice);
    }

    this._tariffConstructorTotalPrice.childNodes[0].nodeValue = Number(this._tariffConstructorTotalPrice.childNodes[0].nodeValue) - price;
    this._serviceTotalPrice.value = this._tariffConstructorTotalPrice.childNodes[0].nodeValue;
  }

  _setFirstRadioOfGroup(tariffType) {
    let firstInputOfGroup;
    const checkedInputValue = this._tariffConstructorCheckedRadio.value;
    if (tariffType.querySelector(`input[value="${checkedInputValue}"]`)) {
      firstInputOfGroup = tariffType.querySelector(`input[value="${checkedInputValue}"]`);
    } else {
      firstInputOfGroup = tariffType.querySelector('[data-tariff-constructor-radio]');
    }


    firstInputOfGroup.checked = true;
    this._tariffConstructorCheckedRadio.checked = false;
    this._tariffConstructorCheckedRadio = firstInputOfGroup;
  }

  _sendToForm() {
    this._serviceName.value = this._tariffConstructorCheckedRadio.dataset.tariffConstructorRadio;
    this._serviceSpeed.value = this._tariffConstructorCheckedRadio.value;
  }

  _onDocumentClick(evt) {
    const target = evt.target;

    if (target.closest('[data-tariff-constructor-radio]')) {
      this._subtractPrice();
      this._tariffConstructorCheckedRadio = target.closest('[data-tariff-constructor-radio]');
      this._radioHandler();
    }

    if (target.closest('[data-tariff-constructor-checkbox]')) {
      this._tariffConstructorCheckbox = target.closest('[data-tariff-constructor-checkbox]');
      this._checkboxHandler();
    }
  }

  _radioHandler() {
    this._addPrice();
    this._sendToForm();
    this._updateOption();
  }

  _checkboxHandler() {
    switch (this._tariffConstructorCheckbox.dataset.tariffConstructorCheckbox) {
      case 'unlimited-internet':
        const checkboxUnlimitedInternet = document.querySelector('[data-tariff-constructor-checkbox="unlimited-internet"]');

        this._checkboxCalculatePrice(checkboxUnlimitedInternet);
        break;
      case 'television':
        const checkboxTelevision = document.querySelector('[data-tariff-constructor-checkbox="television"]');
        if (checkboxTelevision.checked) {
          this._tariffConstructorInternet.style.display = 'none';
          this._tariffConstructorInternetAndTv.style.display = 'flex';
          this._tariffConstructorText = 'Интернет+TV ';

          this._checkboxWithRadioCalculatePrice(this._tariffConstructorInternetAndTv);
        } else {
          this._tariffConstructorInternet.style.display = 'flex';
          this._tariffConstructorInternetAndTv.style.display = 'none';
          this._tariffConstructorText = 'Интернет ';

          this._checkboxWithRadioCalculatePrice(this._tariffConstructorInternet);
        }
        break;
      case 'static-ip':
        const checkboxStaticIp = document.querySelector('[data-tariff-constructor-checkbox="static-ip"]');

        this._checkboxCalculatePrice(checkboxStaticIp);
        break;
      case 'video':
        const checkboxVideo = document.querySelector('[data-tariff-constructor-checkbox="video"]');

        this._checkboxCalculatePrice(checkboxVideo);
        break;
    }
  }

  _checkboxWithRadioCalculatePrice(tariffType) {
    this._subtractPrice();
    this._setFirstRadioOfGroup(tariffType);
    this._updateOption();
    this._addPrice();
    this._sendToForm();
  }

  _checkboxCalculatePrice(checkbox) {
    if (this._tariffConstructorOptions) {
      const option = document.querySelector(`[data-tariff-constructor-option=${checkbox.dataset.tariffConstructorCheckbox}]`);

      if (checkbox.checked) {
        this._addPrice(checkbox);
        option.style.display = 'flex';
      } else {
        this._subtractPrice(checkbox);
        option.style.display = 'none';
      }
    } else {
      if (checkbox.checked) {
        this._addPrice(checkbox);
      } else {
        this._subtractPrice(checkbox);
      }
    }
  }
}
