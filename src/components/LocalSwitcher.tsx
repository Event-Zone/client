import { useLocale, useTranslations } from "next-intl";
import React from "react";
import LocaleSwitcherSelect from "./LocalSwitcherSelect";
import { locales } from "@/config";

function LocalSwitcher() {
  const t = useTranslations("localswitcher");
  const locale = useLocale();
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      <option
        key={"fr"}
        value={"fr"}
        className="text-gray-600 poppins-medium p-3"
      >
        <img src={"/images/fr.png"} alt={"fr"} />
        French
      </option>
      <option
        key={"en"}
        value={"en"}
        className="text-gray-600 poppins-medium p-3"
      >
        <img
          src="/images/en.png"
          alt="en-icon"
          className="h-5 w-5 relative text-gray-500"
        />
        English
      </option>
    </LocaleSwitcherSelect>
  );
}

export default LocalSwitcher;
