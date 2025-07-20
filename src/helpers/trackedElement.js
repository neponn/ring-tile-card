import { isDictionary, isNumber } from "./utilities";

export const TE_TYPE = {
  VALUE: 0,
  ENTITY: 1,
  ATTRIBUTE: 2,
};

export class TrackedElement {
  #elementCfg;
  #hass;
  #deviceClass;
  #unitOfMeasurement;
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

    if (this.#elementType !== TE_TYPE.VALUE) {
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
      // handle entities
      const so = this.#hass.states[this.#entityName];

      // device_class
      if (this.#elementCfg.device_class) {
        this.#deviceClass = this.#elementCfg.device_class;
      } else {
        this.#deviceClass = so.attributes.device_class;
      }

      // unit_of_measurement
      if (this.#elementCfg.unit_of_measurement) {
        this.#unitOfMeasurement = this.#elementCfg.unit_of_measurement;
      } else {
        this.#unitOfMeasurement = so.attributes.unit_of_measurement;
      }

      // set the stateObj
      if (so)
        this.#stateObj = {
          attributes: {
            device_class: this.#deviceClass,
            unit_of_measurement: this.#unitOfMeasurement,
            friendly_name: so.attributes["friendly_name"],
            icon: so.attributes["icon"],
          },
          context: {
            id: so.context.id,
          },
          entity_id: so.entity_id,
          state:
            this.#elementType === TE_TYPE.ENTITY
              ? so.state
              : so.attributes[this.#elementName],
          last_changed: so.last_changed,
          last_updated: so.last_updated,
        };
    }
  }

  get deviceClass() {
    return this.#deviceClass;
  }

  get unitOfMeasurement() {
    return this.#unitOfMeasurement;
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
