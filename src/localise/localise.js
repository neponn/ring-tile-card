import * as bg from "./languages/bg.json";
import * as ca from "./languages/ca.json";
import * as cz from "./languages/cz.json";
import * as da from "./languages/da.json";
import * as de from "./languages/de.json";
import * as en from "./languages/en.json";
import * as es from "./languages/es.json";
import * as fr from "./languages/fr.json";
import * as hu from "./languages/hu.json";
import * as is from "./languages/is.json";
import * as it from "./languages/it.json";
import * as nl from "./languages/nl.json";
import * as no from "./languages/no.json";
import * as pl from "./languages/pl.json";
import * as pt from "./languages/pt.json";
import * as sv from "./languages/sv.json";
import * as sk from "./languages/sk.json";
import * as sl from "./languages/sl.json";
import * as ru from "./languages/ru.json";

const languages = {
  bg: bg,
  ca: ca,
  cz: cz,
  da: da,
  de: de,
  en: en,
  es: es,
  fr: fr,
  hu: hu,
  is: is,
  it: it,
  nl: nl,
  no: no,
  pl: pl,
  pt: pt,
  sv: sv,
  sk: sk,
  sl: sl,
  ru: ru,
};

export function localise(key) {
  const language = navigator.language.slice(0, 2);
  let translated;
  try {
    translated = key.split(".").reduce((k, i) => k[i], languages[language]);
  } catch {
    translated = key.split(".").reduce((k, i) => k[i], languages["en"]);
  }

  return translated;
}
