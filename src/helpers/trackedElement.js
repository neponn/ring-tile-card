import { isDictionary, isNumber } from "./utilities";

export const TE_TYPE = {
  VALUE: 0,
  ENTITY: 1,
  ATTRIBUTE: 2,
};

export class TrackedElement {
  #elementCfg;
  #hass;
  deviceClass;
  unitOfMeasurement;

  constructor(elementCfg, hass) {
    this.#elementCfg = elementCfg;
    this.#hass = hass;

    if (this.elementType !== TE_TYPE.VALUE) {
      const so = this.#hass.states[this.entityName];
      if (this.#elementCfg.device_class) {
        this.deviceClass = this.#elementCfg.device_class;
      } else {
        this.deviceClass = so.attributes.device_class;
      }
      if (this.#elementCfg.unit_of_measurement) {
        this.unitOfMeasurement = this.#elementCfg.unit_of_measurement;
      } else {
        this.unitOfMeasurement = so.attributes.unit_of_measurement;
      }
    }
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
    switch (this.elementType) {
      case TE_TYPE.VALUE:
        return;
      case TE_TYPE.ENTITY:
        return this.#hass.states[this.entityName];
      case TE_TYPE.ATTRIBUTE:
        const so = this.#hass.states[this.entityName];
        return {
          attributes: {
            device_class: this.deviceClass,
            unit_of_measurement: this.unitOfMeasurement,
            friendly_name: "friendly",
          },
          context: {
            id: so.context.id,
          },
          entity_id: so.entity_id,
          state: so.attributes[this.elementName],
          last_changed: so.last_changed,
          last_updated: so.last_updated,
        };
    }
  }

  get value() {
    switch (this.elementType) {
      case TE_TYPE.VALUE:
        return this.#elementCfg;
      case TE_TYPE.ENTITY:
      case TE_TYPE.ATTRIBUTE:
        return this.stateObj.state; 
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
