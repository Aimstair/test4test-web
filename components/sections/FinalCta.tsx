import QRCode from "qrcode";
import { PLAY_URL } from "@/lib/content";
import { FinalCtaClient } from "./FinalCtaClient";

/** Server wrapper: renders the Play Store QR code at build time. */
export async function FinalCta() {
  const qr = await QRCode.toString(`${PLAY_URL}&referrer=utm_source%3Dqr`, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });
  return <FinalCtaClient qrSvg={qr} />;
}
