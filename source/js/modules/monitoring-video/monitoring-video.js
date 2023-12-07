export class MonitoringVideo {
  constructor() {
    this._monitoringVideo = document.querySelector('[data-monitoring-video]');
    this._link = null;
    this._image = null;
    this._video = null;

    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    if (!this._monitoringVideo) {
      return;
    }

    document.addEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick(evt) {
    const target = evt.target;

    if (!target.closest('[data-monitoring-link]')) {
      return;
    }

    evt.preventDefault();

    this._link = target.closest('[data-monitoring-link]');
    this._image = this._link.querySelector('[data-monitoring-image]');
    this._video = this._link.querySelector('[data-monitoring-video]');

    this._image.style.display = 'none';
    this._video.style.display = 'block';
    this._video.setAttribute('src', this._link.dataset.monitoringLink);
  }
}
