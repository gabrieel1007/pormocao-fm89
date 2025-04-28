"use client";

import { createPromotionService } from "@/server/services/create-promotion.service";
import Form from "next/form";
import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function PromotionCreateForm() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [imagePreview, setImagePreview] = useState<false | string>(false);

  async function handleSubmit(formData: FormData) {
    setShowButton(false);
    const response = await createPromotionService(formData);
    if (response[0]) {
      toast.success("Promoção criada com sucesso.", { duration: 3000 });
      return;
    }
    toast.error(response[1].message, { duration: 3000 });
    return;
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
    <div className="shadow-lg rounded-xl border border-gray-200">
      <Form className="grid gap-5 py-5" action={handleSubmit}>
        <div>
          <label className="grid">
            <span className="mx-4 text-lg font-semibold">Título</span>
            <input
              className="mx-4 min-w-100 h-12 bg-gray-100 text-gray-800 rounded-2xl placeholder:text-lg placeholder:pl-5"
              type="text"
              name="title"
              placeholder="Título da promoção"
              minLength={5}
              maxLength={30}
              required
            />
          </label>
        </div>
        <div className="grid">
          <label className="mx-4">
            <span className="text-lg font-semibold ">Banner</span>
            <input
              className="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:text-white
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-red-800
                dark:hover:file:bg-red-700
              "
              type="file"
              name="banner"
              accept="image/*"
              onChange={showButtonPreview}
              required
            />
          </label>
        </div>
        <div>
          <label className="grid">
            <span className="mx-4 text-lg font-semibold">Link</span>
            <input
              className="mx-4 min-w-100 h-12 bg-gray-100 text-gray-800 rounded-2xl placeholder:text-lg placeholder:pl-5"
              type="url"
              name="linkUrl"
              placeholder="Link da promoção"
            />
          </label>
        </div>
        <div>
          <label className="grid">
            <span className="mx-4 text-lg font-semibold">Descrição</span>
            <textarea
              className="mx-4 min-w-100 bg-gray-100 text-gray-800 font-normal rounded-2xl placeholder:text-lg placeholder:pl-5"
              name="description"
              placeholder="Descrição da promoção"
              minLength={5}
              maxLength={500}
              rows={4}
              required
            ></textarea>
          </label>
        </div>
        <div>
          <label className="grid">
            <span className="mx-4 text-lg font-semibold">Data inicio</span>
            <input
              className="mx-4 min-w-100 h-12 bg-gray-100 text-gray-800 text-lg pl-5 rounded-2xl"
              type="date"
              name="startDate"
              required
            />
          </label>
        </div>
        <div>
          <label className="grid">
            <span className="mx-4 text-lg font-semibold">Data final</span>
            <input
              className="mx-4 min-w-100 h-12 bg-gray-100 text-gray-800 text-lg pl-5 rounded-2xl"
              type="date"
              name="endDate"
              required
            />
          </label>
        </div>
        <div className="flex justify-center my-1">
          <button
            className="w-100 h-13 bg-red-950 hover:bg-red-800 rounded-2xl cursor-pointer"
            type="submit"
          >
            <p className="text-white text-xl">Salvar</p>
          </button>
        </div>
      </Form>
      {showButton && <button onClick={showImagePreview}>Ver Imagem</button>}
      {imagePreview && (
        <Image src={imagePreview} width={350} height={350} alt="image" />
      )}
      <Toaster></Toaster>
    </div>
  );
}
