"use client";

import Image from "next/image";
import { useState } from "react";
import NoPhoto from "../../../../../../public/foto1.png";
import { UploadIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { updateAvatar } from "../_actions/update-avatar";

interface AvatarProfileProps {
  avatarUrl: string | null;
  userId: string;
}
export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);
  const inputId = `avatar-input-${userId}`;

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;

    setLoading(true);
    try {
      const image = e.target.files[0];
      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        toast.error("Formato de imagem inválido");
        return;
      }
      const newFileName = `${userId}`;
      const newFile = new File([image], newFileName, { type: image.type });

      // mostra preview imediato enquanto sobe (opcional)
      setPreviewImage(URL.createObjectURL(image));

      const urlImage = await uploadImage(newFile);
      if (!urlImage || urlImage === "") {
        toast.error("falha ao carregar imagem!");
        return;
      }
      setPreviewImage(urlImage);

      await updateAvatar({ avatarUrl: urlImage });
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(image: File) {
    try {
      toast("Estamos enviando sua imagem...");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("userId", userId);

      // Use URL relativa para garantir que cookies de sessão sejam enviados.
      const response = await fetch(`/api/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        toast.error("Falha ao enviar sua imagem");
        return null;
      }

      toast.success("Imagem enviada com sucesso!");
      return data.secure_url as string;
    } catch (err) {
      console.log(err);
      toast.error("Falha ao enviar sua imagem");
      return null;
    }
  }

  return (
    <div className="relative h-40 w-40 md:h-48 md:w-48">
      <div
        className="relative flex items-end-safe justify-center
        w-full h-full  z-20 mt-4"
      >
        <div
          className="absolute cursor-pointer z-10 bg-slate-50/80 p-2
          rounded-full shadow-xl flex items-center justify-center"
        >
          {loading ? (
            <LoaderIcon size={16} color="#131313" className="animate-spin" />
          ) : (
            <UploadIcon size={16} color="#131313" />
          )}
        </div>
        <label htmlFor={inputId} className="sr-only">
          Enviar foto de perfil
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/png, image/jpeg"
          className="relative opacity-0 cursor-pointer z-50 w-48 h-48"
          onChange={handleChange}
        />
      </div>
      {previewImage ? (
        <Image
          src={previewImage}
          alt="Foto de perfil da Clínica"
          fill
          className="w-full h-48 rounded-full object-cover bg-slate-200"
          quality={100}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Image
          src={NoPhoto}
          alt="Foto de perfil da Clínica"
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
