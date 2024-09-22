"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAddVisitoreMutation } from "@/store/features/api/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

function Explore() {
  const [addVisitore, addVisitoreResult] = useAddVisitoreMutation();
  const user = useSelector(selectUser);
  const [newTag, setNewTag] = useState(""); // State for the new tag
  const [formData, setFormData] = useState<any>({ tags: [] });
  const [selectedItTags, setSelectedItTags] = useState<string[]>([]); // State for selected tags
  const [selectedSanteTags, setSelectedSanteTags] = useState<string[]>([]); // State for selected tags
  const [selectedScienceTags, setSelectedScienceTags] = useState<string[]>([]); // State for selected tags
  const [selectedIngenierieTags, setSelectedIngenierieTags] = useState<
    string[]
  >([]); // State for selected tags
  const [selectedRessourceTags, setSelectedRessourceTags] = useState<string[]>(
    []
  ); // State for selected tags
  const [selectedEducationTags, setSelectedEducationTags] = useState<string[]>(
    []
  ); // State for selected tags
  const [selectedFinanceTags, setSelectedFinanceTags] = useState<string[]>([]); // State for selected tags
  const [selectedEnvironnementTags, setSelectedEnvironnementTags] = useState<
    string[]
  >([]); // State for selected tags
  const [selectedDesignTags, setSelectedDesignTags] = useState<string[]>([]); // State for selected tags
  const [selectedEntrepriseTags, setSelectedEntrepriseTags] = useState<
    string[]
  >([]); // State for selected tags

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddTag = (e: any) => {
    if (e.key === "Enter" && newTag.trim()) {
      // Check for Enter key and non-empty tag
      e.preventDefault();
      const updatedTags = [...formData!.tags, newTag.trim()]; // Create a copy and add new tag
      setFormData({ ...formData, tags: updatedTags });
      setNewTag(""); // Clear the new tag input
    }
  };
  const handleSuivant = () => {
    console.log("cloc");
    // Combine all selected tags into formData.tags
    const allSelectedTags = [
      ...selectedItTags,
      ...selectedSanteTags,
      ...selectedScienceTags,
      ...selectedIngenierieTags,
      ...selectedRessourceTags,
      ...selectedEducationTags,
      ...selectedFinanceTags,
      ...selectedEnvironnementTags,
      ...selectedDesignTags,
      ...selectedEntrepriseTags,
    ];

    setFormData({ ...formData, tags: allSelectedTags });

    addVisitore({ _id: user?._id, formData });
    console.log("All tags combined:", allSelectedTags);
  };
  const router = useRouter();
  useEffect(() => {
    if (addVisitoreResult.status === "fulfilled") {
      router.replace("/");
    } else if (addVisitoreResult.status === "rejected") {
      console.error("Error adding visitore", addVisitoreResult.error);
      // Show error message to the user or handle it differently in a production environment.
    } else if (addVisitoreResult.status === "pending") {
      console.log("Adding visitore...");
    }
  }, [addVisitoreResult]);

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...formData.tags]; // Create a copy
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleSelectedTag = (tag: string, setter: Function) => {
    setter(
      (prevSelectedTags: any) =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter((t: string) => t !== tag) // Deselect if already selected
          : [...prevSelectedTags, tag] // Select if not already selected
    );
  };

  const renderTags = () => {
    return formData?.tags?.map((tag: any, index: number) => (
      <span
        key={index}
        className="mr-2 bg-gray-100 rounded-md px-2 py-1 inline-flex"
      >
        {tag}
        <button
          type="button"
          className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={() => handleRemoveTag(index)}
        >
          &times;
        </button>
      </span>
    ));
  };
  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);
  const t = useTranslations("Explor");
  return (
    <div className="flex overflow-hidden ">
      <div className="md:block hidden relative w-1/3 h-screen overflow-hidden">
        <Image
          src="/images/Frame 1063.svg" // Update with your image path
          alt="Static Image"
          width={600}
          height={600}
          objectFit="cover"
          className="fixed  w-1/3 h-[90%]"
        />
      </div>

      {/* Right Section - Scrollable Content */}
      <div className="flex-1 h-screen overflow-y-scroll element-with-scrollbar p-8 bg-white">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Content Blocks */}
          <section className="space-y-6">
            <div className="mb-4 rounded-lg p-2">
              <label
                htmlFor="entreprise"
                className="mb-4 block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                {t("VotreEntreprise")}
              </label>
              <input
                type="text"
                id="entreprise"
                name="entreprise"
                className="rounded-sm text-[#6F7287] border-[1.3px] shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                placeholder="Tapez-la ici"
                onChange={handleInputChange}
                value={formData?.entreprise}
              />
            </div>
            <div className="mb-4 rounded-md p-2">
              <label
                htmlFor="profession"
                className="mb-4 block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                {t("VotreProfession")}{" "}
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                className="rounded-sm text-[#6F7287] border-[1.3px] shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                placeholder="Tapez-la ici"
                onChange={handleInputChange}
                value={formData?.profession}
              />
            </div>
            <div className="mb-4 rounded-lg p-2">
              <label
                htmlFor="tags"
                className="mb-4 block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                {t("tags")}{" "}
              </label>
              <div className="mb-4 p-2">
                <label
                  htmlFor="tags"
                  className="block text-sm poppins-medium poppins-semibold text-gray-700"
                >
                  {t("addTags")}{" "}
                </label>
                <div className="flex flex-row mb-1">
                  <img alt="searchicon" src="/icons/Search.svg" />{" "}
                  <input
                    type="text"
                    id="tags"
                    name="tags" // Not actually used for input, but can follow naming conventions
                    className="poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-[#6F7287] rounded-md p-4"
                    placeholder={t("Rechercher des tags")}
                    value={newTag} // Controlled input for the new tag
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag} // Handle Enter key press
                  />
                </div>
                {renderTags()} {/* Display existing tags */}
                <hr className="mx-3" />
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="IT"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Technologie et IT")}{" "}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Codage",
                    "Développement logiciel",
                    "Cybersécurité",
                    "Développement web",
                    "Développement mobile",
                    "Science des données",
                    "Intelligence Artificielle (IA)",
                    "Robotique et Automatisation",
                    "Télécommunications",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedItTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() => handleSelectedTag(tag, setSelectedItTags)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="affaire"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Affaire et Entrepreneuriat")}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Affaire et Entrepreneuriat",
                    "Planification Stratégique",
                    "Développement Commercial",
                    "Importation et Exportation",
                    "Management",
                    "Marketing et Publicité",
                    "Startups et entrepreneuriat",
                    "Dropshipping",
                    "E-Commerce",
                    "Réseautage",
                    "Leadership",
                    "Finance",
                    "Marketing",
                    "Stratégie d'entreprise",
                    "Startups",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedEntrepriseTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedEntrepriseTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="sante"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Affaire et Entrepreneuriat")}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Cosmétiques",
                    "Médecine Esthétique",
                    "Technologie médicale",
                    "Fitness",
                    "Nutrition",
                    "Santé mentale",
                    "Innovation en santé",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedSanteTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedSanteTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Design et Crétivité")}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Design Industriel",
                    "Écriture créative",
                    "Photographie",
                    "Illustration",
                    "Design UX/UI",
                    "Design graphique",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedDesignTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedDesignTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Science et Recherche")}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Science et Recherche",
                    "Biologie",
                    "Chimie",
                    "Astronomie",
                    "Biotechnologie",
                    "Mathématiques et Statistiques",
                    "Science de l'Environnement",
                    "Physique",
                    "Science des Matériaux",
                    "Méthodologie de Recherche",
                    "Science de l'Espace",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedScienceTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedScienceTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("éducation et apprentissage")}{" "}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Programmes de Formation",
                    "E-learning",
                    "Enseignement supérieur",
                    "Stratégies pédagogiques",
                    "Apprentissage en ligne",
                    "Technologie éducative",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedEducationTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedEducationTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Finance et Investissement")}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Stratégies d'investissement",
                    "Finances personnelles",
                    "Fintech",
                    "Banque",
                    "Cryptomonnaie",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedFinanceTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedFinanceTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Environnement et Durabilité")}{" "}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Solutions éco-responsables",
                    "Changement climatique",
                    "Mode de vie durable",
                    "Conservation",
                    "Énergie verte",
                    "Environnement et Durabilité",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3  rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedEnvironnementTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedEnvironnementTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Ingénierie et Architecture")}{" "}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Génie civil",
                    "Architecture",
                    "Génie mécanique",
                    "Génie électrique",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedIngenierieTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedIngenierieTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-[100px] h-[330px] rounded-md p-2 text-[#6F7287] border-[1.3px]">
                <label
                  htmlFor="science"
                  className="mt-4 mb-4 ml-5 block text-xl poppins-semibold text-titles"
                >
                  {t("Ressources humaines et Développement professionnel")}{" "}
                </label>
                <div className="flex flex-wrap">
                  {[
                    "Développement professionnel",
                    "Coaching de carrière",
                    "Recrutement",
                    "Gestion des ressources humaines",
                    "Culture en milieu de travail",
                    "Management",
                    "Gestion des Talents",
                    "Développement Organisationnel",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`poppins-medium mx-3 my-3 text-gray-600 rounded-3xl p-3 px-6 cursor-pointer ${
                        selectedRessourceTags.includes(tag)
                          ? "bg-mainBlue  text-white"
                          : "bg-gray-100 text-[#6F7287]"
                      }`}
                      onClick={() =>
                        handleSelectedTag(tag, setSelectedRessourceTags)
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className=" absolute bottom-[-10px] right-0  p-4 w-2/3 bg-white ">
                <button
                  onClick={handleSuivant}
                  className="px-6 py-2 bg-mainBlue text-white poppins-regular rounded-xl float-end"
                >
                  Suivant
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Explore;
