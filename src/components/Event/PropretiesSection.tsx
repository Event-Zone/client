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

  const toggleEventProperties = () => {
    setShowEventProperties(!showEventProperties);
  };
  const isFormComplete = Object.values(formValues).every(
    (value) => value !== ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = () => {
    setShowEventProperties(false);
    setIsSubmitted(true);
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-between items-center w-full p-4 border-[2px] border-gray-200 rounded-lg">
        <div>
          <h3 className="text-lg poppins-semibold">Propriété de l'événement</h3>{" "}
          <p className="text-gray-500 poppins-regular">
            {" "}
            Personnalisez chaque aspect de votre evenement
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
              <h4 className="poppins-medium text-gray-700">Accessibilite</h4>
              <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="gratuit pour les visiteurs"
                    className="poppins-regular ml-2 mr-3 text-gray-500"
                    onChange={handleChange}
                  />
                  Gratuit pour les visiteurs
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="evenement payant"
                    className="poppins-regular mr-3 text-gray-500"
                    onChange={handleChange}
                  />
                  Evenement payant
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="invitation seulement"
                    className="poppins-regular mr-3 text-gray-500"
                    onChange={handleChange}
                  />
                  Invitation seulement
                </label>
                <label>
                  <input
                    type="radio"
                    name="accessibilite"
                    value="accesrestreint"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Acces restreint
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
                    onChange={handleChange}
                  />
                  Evenement internation
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementnational"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Evenement national
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementuniversaire"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Evenement universaire
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementregional"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Evenement regional
                </label>
                <label>
                  <input
                    type="radio"
                    name="portee"
                    value="evenementlocal"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Evenement local
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
                    onChange={handleChange}
                  />
                  Professionnels
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="etudiant"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Etudiant
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="grandpublic"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Grand public
                </label>
                <label>
                  <input
                    type="radio"
                    name="public"
                    value="specifiquealindustrie"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Specifique a l'industrie
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
                    onChange={handleChange}
                  />
                  Interieur
                </label>
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="exterieur"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Exterieur
                </label>
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="exterieureinterieur"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Exterieur/ Interieur
                </label>
                <label>
                  <input
                    type="radio"
                    name="lieu"
                    value="virtuel"
                    className="mr-3 poppins-regular text-gray-500"
                    onChange={handleChange}
                  />
                  Virtuel
                </label>
              </div>
            </div>
            {isFormComplete && (
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSubmit}
              >
                Terminer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropretiesSection;
