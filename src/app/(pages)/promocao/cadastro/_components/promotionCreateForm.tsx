"use client";

import Form from "next/form";

export function PromotionCreateForm() {
  async function handleSubmit(formData: FormData) {
    console.log("formData", formData);
  }

  return (
    <div>
      <Form action={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <input
          type="text"
          name="title"
          placeholder="Nome"
          minLength={5}
          maxLength={30}
          required
        />
        <input type="url" name="link" placeholder="Link" required />
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
    </div>
  );
}
