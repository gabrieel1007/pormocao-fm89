"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  bannerUrl: string;
  linkUrl: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
export function CardPromotionInformation({
  title,
  bannerUrl,
  linkUrl,
  description,
  startDate,
  endDate,
}: Props) {
  const cardRef = useRef<HTMLDivElement | undefined>(undefined);
  const hoveredRef = useRef<HTMLDivElement | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement | undefined>(undefined);
  const hoveredTextRef = useRef<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    const cardElm = cardRef.current;
    const hoveredElm = hoveredRef.current;
    const imageElm = imageRef.current;
    const hoveredTextElm = hoveredTextRef.current;

    if (cardElm && hoveredElm && imageElm && hoveredTextElm) {
      cardElm.addEventListener("mouseout", () => {
        hoveredElm.classList.remove("flex");
        hoveredElm.classList.add("hidden");
        imageElm.classList.remove("scale-110");
        return;
      });
      cardElm.addEventListener("mouseover", () => {
        hoveredElm.classList.add("flex");
        hoveredElm.classList.remove("hidden");
        imageElm.classList.add(
          ..."transform transition-transform duration-300 ease-in-out scale-110".split(
            " "
          )
        );
        hoveredTextElm.classList.add("animate-slide-down");
      });
      return;
    }
    return;
  }, []);

  function handleClick() {
    window.location.href = linkUrl;
  }

  return (
    <div ref={cardRef} className="overflow-hidden relative mb-5">
      <div className="overflow-hidden">
        <Image
          ref={imageRef}
          className="object-cover max-h-94 max-w-156 select-none cursor-pointer"
          src={
            "https://diario89.com.br/upload/promocao/1ee88967f1ebf93a9749169aaaada05d.jpg"
          }
          width={390}
          height={235}
          alt="promotion"
        />
      </div>
      <div
        ref={hoveredRef}
        className="hidden absolute inset-0 w-full  bg-red-800/80"
      >
        <div
          ref={hoveredTextRef}
          className="w-full grid gap-10 pt-5 opacity-100"
        >
          <div className="text-white text-center text-3xl">
            .::.{title}.::.
            <p className="text-center text-white text-sm pt-5 mx-10 break-all">
              {description}
            </p>
            <p className="pb-5 pt-2 text-center text-white text-sm">
              {startDate.toLocaleDateString()}
              {` até `}
              {endDate.toLocaleDateString()}
            </p>
            <button
              className="items-center bg-amber-300 rounded-lg cursor-pointer 
                hover:m-5 
                hover:scale-150 
                hover:font-bold 
                transition-all 
                duration-300 
                ease-in-out "
              type="button"
              onClick={handleClick}
            >
              <p className="text-red-950 text-sm p-2">PARTICIPE!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
