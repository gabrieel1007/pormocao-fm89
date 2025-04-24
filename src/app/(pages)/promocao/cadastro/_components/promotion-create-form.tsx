"use client";

import { createForm } from "@/server/promotions/create-form";
import Form from "next/form";
import Image from "next/image";
import React, { useState } from "react";

export function PromotionCreateForm() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [imagePreview, setImagePreview] = useState<false | string>(false);

  async function handleSubmit(formData: FormData) {
    const response = await createForm(formData);
    alert(response);
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
    <div>
      <Form action={handleSubmit}>
        <input
          type="file"
          name="bannerUrl"
          accept="image/*"
          onChange={showButtonPreview}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Nome"
          minLength={5}
          maxLength={30}
          required
        />
        <input type="url" name="linkUrl" placeholder="Link" required />
        <textarea
          name="description"
          placeholder="Descrição"
          minLength={5}
          maxLength={500}
          rows={5}
          required
        ></textarea>
        <input type="date" name="startDate" required />
        <input type="date" name="endDate" required />
        <button type="submit">Salvar</button>
      </Form>
      {showButton && <button onClick={showImagePreview}>Ver Imagem</button>}
      {imagePreview && (
        <Image src={imagePreview} width={350} height={350} alt="image" />
      )}
    </div>
  );
}
