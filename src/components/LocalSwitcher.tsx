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
        French
      </option>
      <option
        key={"en"}
        value={"en"}
        className="text-gray-600 poppins-medium p-3"
      >
        English
      </option>
    </LocaleSwitcherSelect>
  );
}

export default LocalSwitcher;
