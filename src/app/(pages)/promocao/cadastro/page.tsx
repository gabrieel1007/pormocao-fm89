import { PromotionCreateForm } from "@/app/(pages)/promocao/cadastro/_components/promotion-create-form";

export default function Page() {
  return (
    //
    <div className="min-h-dvh grid grid-cols-[60rem_1fr] gap-5">
      <div className="flex items-center justify-center h-screen">
        <PromotionCreateForm />
      </div>
      <div className="bg-[url(https://diario89.com.br/public/images/fundo.jpg)]"></div>
    </div>
  );
}
