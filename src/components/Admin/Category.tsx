import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useAddTypeMutation,
  useDeleteTypesMutation,
  useGetTypesQuery,
} from "@/store/features/api/apiSlice";
import React, { useEffect, useState } from "react";
import Progress from "../shared/Progress";

function Category() {
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();
  const [deleteType, deleteTypeResult] = useDeleteTypesMutation();

  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const {
    data: types,
    isLoading: typesLoading,
    error: typesError,
    refetch: refetchTypes,
  } = useGetTypesQuery();
  const [addCategory, { isLoading: addLoading, isError, status }] =
    useAddCategoryMutation();
  const [
    addType,
    { isLoading: typeLoading, isError: typeIsError, status: TypeStatus },
  ] = useAddTypeMutation();
  const [categoryTyped, setcategoryTyped] = useState<string>("");
  const [uiTypeTyped, setuiTypeTyped] = useState<string>("");

  useEffect(() => {
    console.log(data);
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  const handleAdd = async () => {
    if (categoryTyped !== "") addCategory(categoryTyped);
  };
  const handleAddType = async () => {
    if (uiTypeTyped !== "") addType(uiTypeTyped);
  };
  const handleDelete = async () => {
    if (selected?.length !== 0) deleteCategory(selected);
  };
  const handleDeleteType = async () => {
    if (typeSelected?.length !== 0) deleteType(typeSelected);
  };
  useEffect(() => {
    if (deleteCategoryResult.status === "rejected") {
      alert("failed to delete category");
    } else if (deleteCategoryResult.status === "fulfilled") {
      alert("deleted successfully");
      refetch();
    }
  }, [deleteCategoryResult]);
  useEffect(() => {
    if (deleteTypeResult.status === "rejected") {
      alert("failed to delete type");
    } else if (deleteTypeResult.status === "fulfilled") {
      alert("deleted successfully");
      refetchTypes();
    }
  }, [deleteTypeResult]);

  useEffect(() => {
    if (status === "fulfilled") {
      alert("Category added successfully");
      setcategoryTyped("");
      refetch();
    } else if (isError) {
      alert("Failed to add category");
    }
  }, [status, isError]);
  useEffect(() => {
    if (TypeStatus === "fulfilled") {
      alert("type added successfully");
      setuiTypeTyped("");
      refetchTypes();
    } else if (typeIsError) {
      alert("Failed to add type");
    }
  }, [TypeStatus, typeIsError]);

  // Manage selected categories
  const [selected, setSelected] = useState<any[]>([]);
  const [typeSelected, setTypeSelected] = useState<any[]>([]);

  const toggleCheckbox = (category: any) => {
    // Check if the category is already selected
    if (
      selected.find((selectedCategory) => selectedCategory._id === category._id)
    ) {
      // If already selected, remove it from the array
      setSelected((prevSelected) =>
        prevSelected.filter(
          (selectedCategory) => selectedCategory._id !== category._id
        )
      );
    } else {
      // If not selected, add it to the array
      setSelected((prevSelected) => [...prevSelected, category]);
    }
  };

  const toggleTypeCheckbox = (type: any) => {
    // Check if the category is already selected
    if (typeSelected.find((selectedType) => selectedType._id === type._id)) {
      // If already selected, remove it from the array
      setTypeSelected((prevSelected) =>
        prevSelected.filter((selectedType) => selectedType._id !== type._id)
      );
    } else {
      // If not selected, add it to the array
      setTypeSelected((prevSelected) => [...prevSelected, type]);
    }
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  useEffect(() => {
    console.log(typeSelected);
  }, [typeSelected]);
  return (
    <div className="md:p-20 h-[400px] overflow-scroll element-with-scrollbar">
      <div>
        <div className="flex">
          <div>
            <input
              type="text"
              className="poppins-regular"
              placeholder="Category.."
              value={categoryTyped}
              onChange={(e) => {
                setcategoryTyped(e.target.value);
              }}
            />{" "}
            <button
              onClick={handleAdd}
              className="text-gray-600 poppins-medium border-[1.4px] border-gray-400 rounded-lg p-4 hover:bg-gray-500 hover:text-white"
            >
              Add Category
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-600 poppins-medium border-[1.4px] border-gray-400 rounded-lg p-4 hover:bg-gray-500 hover:text-white"
            >
              Delete Category
            </button>
          </div>

          <div>
            <input
              type="text"
              className="poppins-regular"
              placeholder="Types.."
              value={uiTypeTyped}
              onChange={(e) => {
                setuiTypeTyped(e.target.value);
              }}
            />{" "}
            <button
              onClick={handleAddType}
              className="text-gray-600 poppins-medium border-[1.4px] border-gray-400 rounded-lg p-4 hover:bg-gray-500 hover:text-white"
            >
              Add Type
            </button>
            <button
              onClick={handleDeleteType}
              className="text-gray-600 poppins-medium border-[1.4px] border-gray-400 rounded-lg p-4 hover:bg-gray-500 hover:text-white"
            >
              Delete Type
            </button>
          </div>
        </div>
      </div>
      <div className="h-500px overflow-scroll element-with-scrollbar flex">
        <div className="flex-1">
          {data?.map((category: any) => (
            <div key={category._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selected.some(
                  (selectedCategory) => selectedCategory._id === category._id
                )}
                onChange={() => toggleCheckbox(category)}
                className="h-4 w-4 mr-1"
              />
              <p className="poppins-medium w-fit bg-slate-300 rounded-2xl p-2">
                {category.name}
              </p>
            </div>
          ))}{" "}
        </div>
        <div className="flex-1">
          {types?.map((type: any) => (
            <div key={type._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={typeSelected.some(
                  (selectedtype) => selectedtype._id === type._id
                )}
                onChange={() => toggleTypeCheckbox(type)}
                className="h-4 w-4 mr-1"
              />
              <p className="poppins-medium w-fit bg-slate-300 rounded-2xl p-2">
                {type.name}
              </p>
            </div>
          ))}{" "}
        </div>
      </div>
      {(addLoading ||
        isLoading ||
        deleteCategoryResult.isLoading ||
        typesLoading ||
        typeLoading ||
        deleteTypeResult.isLoading) && <Progress />}
    </div>
  );
}

export default Category;
