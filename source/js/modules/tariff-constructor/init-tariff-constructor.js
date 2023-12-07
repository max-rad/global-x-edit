import {TariffConstructor} from './tariff-constructor';

const initTariffConstructor = () => {
  const tariffConstructor = new TariffConstructor();
  tariffConstructor.init();
};

export {initTariffConstructor};
