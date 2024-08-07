import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const cardData = [
  {
    title: "Starter",
    price: "Gratuit",
    features: [
      { text: "Support Prioritaire", checked: true },
      { text: "Badge d'organisateur premium", checked: false },
      { text: "Liste des Sponsors", checked: false },
      { text: "Plusieurs photos et vidéos", checked: false },
      { text: "Promotion sur les réseaux sociaux", checked: false },
      { text: "Lien d'inscription", checked: true },
      { text: "Site web et localisation", checked: true },
      { text: "Pages vitrine personnalisée pour vous", checked: false },
      { text: "Nombre d'événements : 1", checked: true },
    ],
    icon: "/starterIcon.png",
    borderColor: "border-gray-400",
  },
  {
    title: "Business",
    price: 4000,
    features: [
      { text: "Nombre d'événements illimités", checked: true },
      { text: "Pages vitrine personnalisée pour vous", checked: true },
      { text: "Mobile, Email, site web et localisation", checked: true },
      { text: "Lien d'inscription", checked: true },
      { text: "Promotion sur les réseaux sociaux", checked: true },
      { text: "Plusieurs photos et vidéos", checked: true },
      { text: "Liste des Sponsors", checked: true },
      { text: "Badge d'organisateur premium", checked: true },
      { text: "Support Prioritaire", checked: true },
    ],
    icon: "/businessIcon.png",
    borderColor: "border-mainBlue",
  },
  {
    title: "Student",
    price: "Gratuit",
    features: [
      { text: "Nombre d'événements: 5", checked: true },
      { text: "Pages vitrine personnalisée pour vous", checked: true },
      { text: "Mobile, Email, site web et localisation", checked: true },
      { text: "Lien d'inscription", checked: true },
      { text: "Promotion sur les réseaux sociaux", checked: false },
      { text: "Plusieurs photos et vidéos", checked: false },
      { text: "Liste des Sponsors", checked: false },
      { text: "Badge d'organisateur premium", checked: false },

      { text: "Support Prioritaire", checked: false },
    ],
    icon: "/studentIcon.png",
    borderColor: "border-gray-400",
  },
];

function Cards({ price }: { price: number }) {
  const router = useRouter();
  console.log(price);
  return (
    <div
      key={`${price}`}
      className="flex flex-row mt-4 px-20 transition-transform duration-800 hover:transform animate-slide-up"
    >
      {cardData.map((card, index) => (
        <div
          onClick={() => router.push(`/events/create/${card.title}`)}
          key={index}
          className={`mr-3 flex flex-col ${card.borderColor} border-[1.5px] rounded-[30px] p-4 transition-transform duration-800 hover:transform hover:-translate-y-3`}
        >
          <div className="flex mb-4">
            <img alt={`${card.title}-icon`} src={card.icon} />
          </div>
          <h3 className="text-titles font-poppins text-3xl">{card.title}</h3>
          <p className="text-sm mb-3 text-gray-600 poppins-semibold">
            {card.title === "Starter"
              ? "Le plan idéal pour commencer. Publiez un événement gratuitement, mais avec des fonctionnalités de base."
              : card.title === "Business"
              ? "Maximisez la visibilité de vos événements avec un accès complet aux fonctionnalités premium pour les entreprises."
              : "Le plan idéal pour commencer. Publiez un événement gratuitement, mais avec des fonctionnalités de base."}
          </p>
          <h3 className="text-titles font-poppins text-3xl font-bold">
            {index === 1 ? price : "Gratuit"}
            {index === 1 ? (
              price === 4000 ? (
                <span className="ml-2 text-sm mb-3 text-gray-600 font-poppins">
                  DA/mois
                </span>
              ) : (
                <span className="ml-2 text-sm mb-3 text-gray-600 font-poppins">
                  DA/1 ans
                </span>
              )
            ) : null}
          </h3>
          <hr className="mx-3 my-5 " />
          {card.features.map((feature, idx) => (
            <p
              key={idx}
              className="text-sm mb-3 text-gray-600 font-poppins flex"
            >
              <img
                alt={feature.checked ? "check" : "uncheck"}
                src={feature.checked ? "/check.png" : "/uncheck.png"}
                className="mr-2 w-[20px] h-[20px]"
              />
              {feature.text}
            </p>
          ))}
          <div className="flex justify-center items-center my-5">
            <button className="hover:text-white hover:bg-mainBlue text-mainBlue py-2 text-xl border-[1.2px] w-full border-mainBlue rounded-md">
              Commencer aujourd'hui
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
