"use client";

//import { createForm } from "@/server/promotions/create-form";
import { createPromotionService } from "@/server/services/create-promotion.service";
import Form from "next/form";
import Image from "next/image";
import React, { useState } from "react";

export function PromotionCreateForm() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [imagePreview, setImagePreview] = useState<false | string>(false);

  async function handleSubmit(formData: FormData) {
    const response = await createPromotionService(formData);
    if (response[0]) {
      return alert("promoção criada com sucesso.");
    }
    alert(response[1].message);
  }

  async function showButtonPreview(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      setShowButton(false);
      setImagePreview(false);
      return;
    }
    setSelectedFile(selectedFile);
    setShowButton(true);
    return;
  }

  async function showImagePreview() {
    if (!selectedFile) {
      setShowButton(false);
      return;
    }

    setImagePreview(URL.createObjectURL(selectedFile));
    return;
  }

  return (
    <div className="border-3 border-black shadow-2xl rounded-xl">
      <Form className="grid gap-5 py-5" action={handleSubmit}>
        <input
          className="my-3 mx-3 0 border-3 border-gray-400 text-gray-800 font-normal rounded-sm"
          type="file"
          name="banner"
          accept="image/*"
          onChange={showButtonPreview}
          required
        />
        <input
          className="my-3 mx-3 min-w-100  border-3 border-gray-400 text-gray-800 rounded-sm"
          type="text"
          name="title"
          placeholder="Nome"
          minLength={5}
          maxLength={30}
          required
        />
        <input
          className="my-3 mx-3 min-w-100  border-3 border-gray-400 text-gray-800 font-normal rounded-sm"
          type="url"
          name="linkUrl"
          placeholder="Link"
        />
        <textarea
          className="my-3 mx-3 min-w-100 border-3 border-gray-400 text-gray-800 font-normal rounded-sm"
          name="description"
          placeholder="Descrição"
          minLength={5}
          maxLength={500}
          rows={5}
          required
        ></textarea>
        <input
          className="my-3 mx-3 min-w-100  border-3 border-gray-400 text-gray-800 font-normal rounded-sm"
          type="date"
          name="startDate"
          required
        />
        <input
          className="my-3 mx-3 min-w-100  border-3 border-gray-400 text-gray-800 font-normal rounded-sm"
          type="date"
          name="endDate"
          required
        />
        <div className="flex justify-center">
          <button
            className="my-3 mx-3 border-3 w-100 h-10 border-blue-300 bg-blue-200 rounded-sm"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </Form>
      {showButton && <button onClick={showImagePreview}>Ver Imagem</button>}
      {imagePreview && (
        <Image src={imagePreview} width={350} height={350} alt="image" />
      )}
    </div>
  );
}
