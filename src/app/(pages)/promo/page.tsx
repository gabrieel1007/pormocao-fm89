import { CardPromotionInformation } from "@/app/(pages)/promo/_components/card-promotion-information";
import { getPromotions } from "@/server/promotions/get-promotions";
import Image from "next/image";

export default async function Page() {
  const promotions = await getPromotions();

  return (
    <div className="min-h-dvh grid grid-rows-[4rem_1fr] gap-5">
      <div className="sticky inset-0 bg-red-500 z-500 ">navbar</div>
      <div className="container">
        <div className="grid mb-20 mt-12">
          {/* //<span className=""></span> */}
          <div className="h-fit grid text-center gap-5">
            <span className="text-5xl text-red-950 mb-10">
              <strong>Promoções</strong>
            </span>
            <span className="">
              A Diário presenteia você, o melhor ouvinte do mundo! Clique na
              promoção, faça seu cadastro e concorra!!
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map((promotion, i) => (
                <CardPromotionInformation
                  key={i}
                  title={promotion.title}
                  bannerUrl={promotion.bannerUrl}
                  description={promotion.description}
                  endDate={promotion.endDate}
                  startDate={promotion.startDate}
                  linkUrl={promotion.linkUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid-rows-2 mb-0">
        <div className="bg-white h-5"></div>
        <div className="flex justify-center h-20 bg-amber-300">
          <Image
            src="https://diario89.com.br/public/images/footer_insta.png"
            width={500}
            height={20}
            alt="logo"
          />
        </div>
      </div>
      <div>
        <div className="bg-gray-700 h-70 mb-0">footer</div>
      </div>
    </div>
  );
}
