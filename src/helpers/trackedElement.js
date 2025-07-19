import { isDictionary, isNumber } from "./utilities";

export const TE_TYPE = {
  VALUE: 0,
  ENTITY: 1,
  ATTRIBUTE: 2,
};

export class TrackedElement {
  #elementCfg;
  #hass;

  constructor(elementCfg, hass) {
    this.#elementCfg = elementCfg;
    this.#hass = hass;
    // console.info(`Called for ${this.elementName}. hass set: ${this.#hass ? "Yes" : "No"}`)
  }

  get elementType() {
    if (isNumber(this.#elementCfg)) {
      return TE_TYPE.VALUE;
    } else if (isDictionary(this.#elementCfg) && this.#elementCfg.attribute) {
      return TE_TYPE.ATTRIBUTE;
    } else {
      return TE_TYPE.ENTITY;
    }
  }

  get stateObj() {
    if (this.elementType === TE_TYPE.VALUE) return;
    if (this.#hass) return this.#hass.states[this.entityName];
  }

  get deviceClass() {
    // no deviceClass for value types
    if (this.elementType === TE_TYPE.VALUE) return;
    // override if device_class manually defined
    if (isDictionary(this.#elementCfg) && this.#elementCfg.device_class)
      return this.#elementCfg.device_class;
    // return entity configured device_class
    return this.stateObj.attributes.device_class;
  }

  get unitOfMeasurement() {
    // no unitOfMeasurement for value types
    if (this.elementType === TE_TYPE.VALUE) return;
    // overrirde if unit_of_measurement manually defined
    if (isDictionary(this.#elementCfg) && this.#elementCfg.unit_of_measurement)
      return this.#elementCfg.unit_of_measurement;
    // return entity configured unit_of_measurement
    return this.stateObj.attributes.unit_of_measurement;
  }

  get value() {
    switch (this.elementType) {
      case TE_TYPE.VALUE:
        return this.#elementCfg;
      case TE_TYPE.ENTITY:
        return this.stateObj.state;
      case TE_TYPE.ATTRIBUTE:
        return this.stateObj.attributes[this.elementName];
    }
  }

  get elementName() {
    switch (this.elementType) {
      case TE_TYPE.VALUE:
        return;
      case TE_TYPE.ENTITY:
        if (isDictionary(this.#elementCfg)) return this.#elementCfg.entity;
        else return this.#elementCfg;
      case TE_TYPE.ATTRIBUTE:
        return this.#elementCfg.attribute;
    }
  }

  get entityName() {
    switch (this.elementType) {
      case TE_TYPE.VALUE:
        return;
      case TE_TYPE.ENTITY:
        if (isDictionary(this.#elementCfg)) return this.#elementCfg.entity;
        else return this.#elementCfg;
      case TE_TYPE.ATTRIBUTE:
        return this.#elementCfg.entity;
    }
  }
}
