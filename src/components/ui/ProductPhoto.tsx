import Image from "next/image";
import { productImages, type ProductImageId } from "@/data/product-images";

type ProductPhotoProps = {
  id: ProductImageId;
  /** Classes aplicadas à <img>; normalmente object-contain + limite de altura. */
  className?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Render fotográfico de uma embalagem.
 * Usa as dimensões intrínsecas do arquivo para reservar espaço e evitar
 * deslocamento de layout enquanto a imagem carrega.
 */
export function ProductPhoto({
  id,
  className = "",
  sizes,
  priority,
}: ProductPhotoProps) {
  const image = productImages[id];

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
