import { useTranslations } from "next-intl";
import React, { useState } from "react";

function PropretiesSection({
  formValues,
  setFormValues,
}: {
  formValues: any;
  setFormValues: Function;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEventProperties, setShowEventProperties] = useState(false);

  // State to control selected radio buttons
  const [selectedAccessibilite, setSelectedAccessibilite] = useState(
    formValues.accessibilite || ""
  );
  const [selectedPortee, setSelectedPortee] = useState(formValues.portee || "");
  const [selectedPublic, setSelectedPublic] = useState(formValues.public || "");
  const [selectedLieu, setSelectedLieu] = useState(formValues.lieu || "");

  const toggleEventProperties = () => {
    setShowEventProperties(!showEventProperties);
  };

  const isFormComplete =
    selectedAccessibilite && selectedPortee && selectedPublic && selectedLieu;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));

    switch (name) {
      case "accessibilite":
        setSelectedAccessibilite(value);
        break;
      case "portee":
        setSelectedPortee(value);
        break;
      case "public":
        setSelectedPublic(value);
        break;
      case "lieu":
        setSelectedLieu(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setShowEventProperties(false);
    setIsSubmitted(true);
  };
  const t = useTranslations("Event");

  return (
    <div className="relative flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-between items-center w-full p-4 border-[2px] border-gray-200 rounded-lg">
        <div>
          <h3 className="text-lg poppins-semibold">{t("EventProprities")}</h3>
          <p className="text-gray-500 poppins-regular">
            {t("EventPropritiesDes")}
          </p>
        </div>
        <button
          onClick={toggleEventProperties}
          className="text-xl poppins-bold"
        >
          {isSubmitted ? (
            <img
              src="/icons/submittedIcon.png"
              alt="submitted"
              className="w-6 h-6"
            />
          ) : (
            "+"
          )}
        </button>
      </div>
      {showEventProperties && (
        <div className="w-full p-4 border-[2px] border-gray-200 rounded-lg mt-2">
          <div className="flex flex-col space-y-2">
            <div>
              <h4 className="poppins-medium text-gray-700">
                {t("Accessibilite")}
              </h4>
              <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="gratuit pour les visiteurs"
                    className="poppins-regular ml-2 mr-3 text-gray-500"
                    checked={
                      selectedAccessibilite === "gratuit pour les visiteurs"
                    }
                    onChange={handleRadioChange}
                  />
                  {t("Gratuitpourlesvisiteurs")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="evenement payant"
                    className="poppins-regular mr-3 text-gray-500"
                    checked={selectedAccessibilite === "evenement payant"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementpayant")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="Invitation seulement"
                    className="poppins-regular mr-3 text-gray-500"
                    checked={selectedAccessibilite === "Invitation seulement"}
                    onChange={handleRadioChange}
                  />
                  {t("Invitationseulement")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="accesrestreint"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedAccessibilite === "accesrestreint"}
                    onChange={handleRadioChange}
                  />
                  {t("Accesrestreint")}
                </label>
              </div>
            </div>
            <div>
              <h4 className="poppins-medium text-gray-700">Portee</h4>
              <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementinternation"
                    className="mr-3 poppins-regular ml-2 text-gray-500"
                    checked={selectedPortee === "evenementinternation"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementinternation")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementnational"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPortee === "evenementnational"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementnational")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementuniversaire"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPortee === "evenementuniversaire"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementuniversaire")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementregional"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPortee === "evenementregional"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementregional")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementlocal"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPortee === "evenementlocal"}
                    onChange={handleRadioChange}
                  />
                  {t("Evenementlocal")}
                </label>
              </div>
            </div>
            <div>
              <h4 className="poppins-medium text-gray-700">Public</h4>
              <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="professionnels"
                    className="mr-3 poppins-regular ml-2 text-gray-500"
                    checked={selectedPublic === "professionnels"}
                    onChange={handleRadioChange}
                  />
                  {t("Professionnels")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="etudiant"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPublic === "etudiant"}
                    onChange={handleRadioChange}
                  />
                  {t("Etudiant")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="grandpublic"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPublic === "grandpublic"}
                    onChange={handleRadioChange}
                  />
                  {t("Grandpublic")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="specifiquealindustrie"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedPublic === "specifiquealindustrie"}
                    onChange={handleRadioChange}
                  />
                  {t("Specifiquealindustrie")}
                </label>
              </div>
            </div>
            <div>
              <h4 className="poppins-medium text-gray-700">Lieu</h4>
              <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="interieur"
                    className="mr-3 poppins-regular ml-2 text-gray-500"
                    checked={selectedLieu === "interieur"}
                    onChange={handleRadioChange}
                  />
                  {t("Interieur")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="exterieur"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedLieu === "exterieur"}
                    onChange={handleRadioChange}
                  />
                  {t("Exterieur")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="Extérieure interieur"
                    className="mr-3 poppins-regular text-gray-500"
                    checked={selectedLieu === "Extérieure interieur"}
                    onChange={handleRadioChange}
                  />
                  {t("ExterieuretInterieur")}
                </label>
              </div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <button
                className={`${
                  isFormComplete ? "bg-primary" : "bg-mainBlue"
                } text-white poppins-semibold py-2 px-4 rounded bg-mainBlue`}
                disabled={!isFormComplete}
                onClick={handleSubmit}
              >
                {t("Valider")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropretiesSection;
