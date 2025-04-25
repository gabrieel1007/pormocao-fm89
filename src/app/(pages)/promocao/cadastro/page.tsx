import { PromotionCreateForm } from "@/app/(pages)/promocao/cadastro/_components/promotion-create-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[60rem_1fr] gap-5">
      <div className="flex items-center justify-center h-screen">
        <PromotionCreateForm />
      </div>
      <div className="bg-[url(https://diario89.com.br/public/images/fundo.jpg)]">
        <div className="flex items-center justify-center h-screen">
          <Image
            src={"https://diario89.com.br/public/images/logo1.png"}
            width={522}
            height={344}
            alt="logo diario fm"
          />
        </div>
      </div>
    </div>
  );
}
