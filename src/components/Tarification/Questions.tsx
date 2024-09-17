import { useTranslations } from "next-intl";
import React, { useState } from "react";

function Questions() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const t = useTranslations("Questions");
  const questions = [
    {
      question:
        "Comment puis-je passer à un pack payant depuis la version gratuite?",
      answer:
        "Vous pouvez passer à un pack payant à tout moment en accédant à la section Paramètres de votre compte et en sélectionnant le plan qui convient le mieux à vos besoins",
    },
    {
      question: "Y a-t-il des frais cachés en plus du prix du pack?",
      answer:
        "Non, nos tarifs sont transparents. Le prix que vous voyez pour chaque pack est le coût total, sans frais cachés supplémentaires.",
    },
    {
      question: "Comment fonctionne la promotion sur les réseaux sociaux ?",
      answer:
        "Les promotions sur les réseaux sociaux incluent la mise en avant de vos événements sur nos pages sociales. Nous utiliserons nos canaux pour augmenter la visibilité de vos événements.",
    },
    {
      question:
        "Puis-je modifier mon pack en cours de route si mes besoins changent?",
      answer:
        "Absolument, vous pouvez mettre à niveau ou rétrograder votre pack à tout moment pour vous assurer que votre abonnement correspond à l'évolution de vos besoins en événements.",
    },
    {
      question: "Quels sont les moyens de paiement?",
      answer:
        "Pour la payement, vous pouvez vous rendre d notre Agence qui se trouve au niveau de Hussein dey, Alger , sinon les payements par CCP ou banque sont acceptés.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  return (
    <div className="flex lg:flex-row flex-col mt-8 bg-[#F0F6FD] w-full px-3 md:px-24 py-8 justify-around">
      <div className="flex flex-col  justify-start items-start p-8 ">
        <h3 className="poppins-semibold bg-mainBlue text-white rounded-2xl text-center  px-4">
          Packs
        </h3>
        <h3 className="poppins-bold text-titles text-[30px]  md:text-[48px]">
          {t("title")}
        </h3>
        <p className="text-sm text-gray-600 poppins-regular">{t("des")} </p>
      </div>
      <div className="flex flex-col w-[80%] ml-8">
        {questions.map((item, index) => (
          <div key={index} className="mb-4 flex items-start w-full">
            <div className="w-full ">
              <div
                onClick={() => toggleQuestion(index)}
                className={`flex flex-row rounded-md p-4 justify-between cursor-pointer ${
                  openQuestion === index ? "bg-mainBlue text-white" : "bg-white"
                } `}
              >
                <h4 className={`cursor-pointer poppins-medium `}>
                  {t(`question${index}`)}
                </h4>
                <img
                  src={` ${
                    openQuestion !== index
                      ? "/icons/ArrowDownCircle.png"
                      : "/icons/ArrowUpCircle.png"
                  }`}
                  alt="Arrow Icon"
                  className={`w-[24px] h-[24px] mr-2 transition-transform duration-300 ${
                    openQuestion === index ? "rotate-180" : ""
                  }`}
                  onClick={() => toggleQuestion(index)}
                />
              </div>
              {openQuestion === index && (
                <p className="poppins-regular  poppins-regular mt-2 bg-white rounded-md text-titles">
                  {t(`answer${index}`)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
