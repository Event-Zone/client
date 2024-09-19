import { useTranslations } from "next-intl";
import React from "react";

function TermsConditions({ setShow }: { setShow: Function }) {
  const t = useTranslations("Terms");
  return (
    <div className="z-40 overflow-scroll element-with-scrollbar text-titles bg-white absolute top-[100px] p-8  w-full h-full poppins-regular leading-relaxed">
      <h1 className="text-2xl poppins-bold text-start text-blue-700 mb-8">
        {t("terms_conditions_title")}
      </h1>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {" "}
          {t("introduction_title")}
        </h2>
        <p>{t("introduction_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("user_accounts_title")}
        </h2>
        <p>{t("user_accounts_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("services_offered_title")}
        </h2>
        <p>{t("services_offered_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("acceptable_use_title")}
        </h2>
        <p>{t("acceptable_use_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("payments_billing_title")}
        </h2>
        <p>{t("payments_billing_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("content_ownership_title")}
        </h2>
        <p>{t("content_ownership_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("termination_account_title")}
        </h2>
        <p>{t("termination_account_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("liability_disclaimer_title")}
        </h2>
        <p>{t("liability_disclaimer_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {" "}
          {t("amendments_terms_title")}
        </h2>
        <p>{t("amendments_terms_content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl poppins-semibold mb-2">
          {t("governing_law_title")}
        </h2>
        <p>{t("governing_law_content")}</p>
      </section>
      <div>
        <button
          onClick={() => setShow(false)}
          className="poppin-regular px-3 text-center py-1 rounded-md my-2 bg-mainBlue text-white"
        >
          {t("close_button_text")}
        </button>
      </div>
    </div>
  );
}

export default TermsConditions;
