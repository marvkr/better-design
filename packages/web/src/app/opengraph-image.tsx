import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderHomeOgImage,
} from "@/lib/og-home";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderHomeOgImage();
}
