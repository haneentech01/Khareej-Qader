import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import { TrackItem, TrackData } from "@/types";

export function useTracks() {
  const t = useTranslations("Tracks");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const tracks: TrackItem[] = useMemo(() => [
    { name: t("track1"), desc: t("track1_desc"), time: t("track1_duration"), img: "/images/web.png" },
    { name: t("track2"), desc: t("track2_desc"), time: t("track2_duration"), img: "/images/uxui.png" },
    { name: t("track3"), desc: t("track3_desc"), time: t("track3_duration"), img: "/images/digitalMarketing.png" },
    { name: t("track2"), desc: t("track2_desc"), time: t("track2_duration"), img: "/images/uxui.png" },
    { name: t("track3"), desc: t("track3_desc"), time: t("track3_duration"), img: "/images/digitalMarketing.png" },
    { name: t("track1"), desc: t("track1_desc"), time: t("track1_duration"), img: "/images/web.png" },
  ], [t]);

  const trackData: TrackData = {
    registerText: t("register"),
    tracks,
  };

  return { trackData, isRTL };
}
