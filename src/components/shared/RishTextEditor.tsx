"use client";
import React, { FormEventHandler, useEffect, useRef } from "react";

function RishTextEditor({
  setFormData,
  formData,
}: {
  setFormData: Function;
  formData: any;
}) {
  const handleDescriptionChange = () => {
    if (descriptionRef.current) {
      setFormData({
        ...formData,
        eventDescription: descriptionRef.current.innerHTML,
      });
    }
  };

  const descriptionRef = useRef<HTMLDivElement>(null);
  const lastSelection = useRef<Range | null>(null);
  const applyFormat = (tag: string) => {
    if (descriptionRef.current) {
      document.execCommand(tag, false);
      saveSelection();
    }
  };
  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = formData.eventDescription;
    }
  }, []);
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      lastSelection.current = sel.getRangeAt(0).cloneRange();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default paste behavior

    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const text = clipboardData.getData("text");

    if (descriptionRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();

      if (sel && sel.rangeCount > 0) {
        range.setStart(
          sel.focusNode || descriptionRef.current,
          sel.focusOffset
        );
        range.collapse(true);
      } else {
        // If no selection exists, set range to the end of contentEditable
        range.selectNodeContents(descriptionRef.current);
        range.collapse(false);
      }

      // Insert plain text
      const textNode = document.createTextNode(text);
      range.deleteContents(); // Optional: Clear any selected content before inserting
      range.insertNode(textNode);

      // Move the cursor to the end of the pasted text
      range.setStartAfter(textNode);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);

      // Update form data
      handleDescriptionChange();
    }
  };

  return (
    <div className="mb-4 border-gray-300 border-[1.3px] p-2">
      <label
        htmlFor="eventDescription"
        className="block text-sm poppins-medium poppins-semibold text-gray-700"
      >
        Description de l'événement
      </label>
      <div
        id="eventDescription"
        ref={descriptionRef}
        contentEditable
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
        onInput={handleDescriptionChange}
        onPaste={handlePaste}
        style={{ whiteSpace: "pre-wrap", minHeight: "100px" }}
      ></div>
      <div className="flex mt-2 space-x-2">
        <img
          alt="bold"
          src="/icons/ooui_bold-b.png"
          className="w-5 h-5 cursor-pointer"
          onClick={() => applyFormat("bold")}
        />
        <img
          alt="list"
          src="/icons/fe_list-bullet.png"
          className="w-5 h-5 cursor-pointer"
          onClick={() => applyFormat("insertUnorderedList")}
        />
        <img
          alt="numbered-list"
          src="/icons/ph_list-numbers-bold.png"
          className="w-5 h-5 cursor-pointer"
          onClick={() => applyFormat("insertOrderedList")}
        />
      </div>
    </div>
  );
}

export default RishTextEditor;
