import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
});

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!userId || userId === "") {
      return NextResponse.json(
        { error: "Falha ao alterar imagem" },
        { status: 401 },
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não enviado" },
        { status: 400 },
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: "Tipo de arquivo inválido" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    // use Node Buffer so Cloudinary upload_stream accepts it reliably
    const buffer = Buffer.from(arrayBuffer);

    const results = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: [`${userId}`],
            public_id: file.name,
            resource_type: "image",
          },
          function (error, result) {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json(results);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Erro ao enviar imagem" },
      { status: 500 },
    );
  }
};
