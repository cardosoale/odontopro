"use client";

import Image from "next/image";
import { useState } from "react";
import NoPhoto from "../../../../../../public/foto1.png";
import { UploadIcon } from "lucide-react";

interface AvatarProfileProps {
  avatarUrl: string | null;
  userId: string;
}
export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl);
  return (
    <div className="relative h-40 w-40 md:h-48 md:w-48">
      <div
        className="relative flex items-end-safe justify-center
        w-full h-full  z-20 mt-4"
      >
        <span
          className="absolute cursor-pointer z-10 bg-slate-50/80 p-2
          rounded-full shadow-xl"
        >
          <UploadIcon size={16} color="#131313" />
        </span>
        <input
          type="file"
          className="relative opacity-0 cursor-pointer z-50 w-48 h-48
          rounded-full"
        />
      </div>
      {previewImage ? (
        <Image
          src={previewImage}
          alt="foto de perfil da Clinica"
          fill
          className="w-full h-48 rounded-full object-cover bg-slate-200"
          quality={100}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Image
          src={NoPhoto}
          alt="foto de perfil da Clinica"
          fill
          className="w-full h-48 rounded-full object-cover bg-slate-200"
          quality={100}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
