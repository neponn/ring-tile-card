import { isDictionary, isNumber } from "./utilities";

export const TE_TYPE = {
  VALUE: 0,
  ENTITY: 1,
  ATTRIBUTE: 2,
};

export class TrackedObject {
  #elementCfg;
  #hass;
  #elementType;
  #elementName;
  #entityName;
  #stateObj;

  constructor(elementCfg, hass) {
    this.#elementCfg = elementCfg;
    this.#hass = hass;

    // set the elementType
    if (isNumber(this.#elementCfg)) {
      this.#elementType = TE_TYPE.VALUE;
    } else if (isDictionary(this.#elementCfg) && this.#elementCfg.attribute) {
      this.#elementType = TE_TYPE.ATTRIBUTE;
    } else {
      this.#elementType = TE_TYPE.ENTITY;
    }

    // if this is just a value, all done
    if (this.#elementType === TE_TYPE.VALUE) return;

    // set the elementName and elementType
    switch (this.#elementType) {
      case TE_TYPE.ENTITY:
        if (isDictionary(this.#elementCfg)) {
          this.#elementName = this.#elementCfg.entity;
          this.#entityName = this.#elementCfg.entity;
        } else {
          this.#elementName = this.#elementCfg;
          this.#entityName = this.#elementCfg;
        }
        break;
      case TE_TYPE.ATTRIBUTE:
        this.#elementName = this.#elementCfg.attribute;
        this.#entityName = this.#elementCfg.entity;
        break;
    }
    // access the entity's stateObj
    const so = this.#hass.states[this.#entityName];

    // deep copy stateObj
    this.#stateObj = { ...so };
    this.#stateObj.attributes = { ...so.attributes };

    // override stateObj fields if needed
    // state
    if (this.#elementType === TE_TYPE.ATTRIBUTE)
      this.#stateObj.state = so.attributes[this.#elementName];
    // device_class
    if (this.#elementCfg.device_class)
      this.#stateObj.attributes.device_class = this.#elementCfg.device_class;
    // unit_of_measurement
    if (this.#elementCfg.unit_of_measurement)
      this.#stateObj.attributes.unit_of_measurement =
        this.#elementCfg.unit_of_measurement;
  }

  get deviceClass() {
    return this.#stateObj.attributes.device_class;
  }

  get unitOfMeasurement() {
    return this.#stateObj.attributes.unit_of_measurement;
  }

  get elementType() {
    return this.#elementType;
  }

  get stateObj() {
    return this.#stateObj;
  }

  get value() {
    if (this.#elementType === TE_TYPE.VALUE) {
      return this.#elementCfg;
    } else {
      return this.#stateObj.state;
    }
  }

  get elementName() {
    return this.#elementName;
  }

  get entityName() {
    return this.#entityName;
  }
}
