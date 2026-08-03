import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import { TrackItem, TrackData } from "@/types";
import { useTracksCMS } from "@/hooks/cms/useTracksCMS";

export function useTracks() {
  const t = useTranslations("Tracks");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { tracks: cmsTracks } = useTracksCMS();

  const tracks: TrackItem[] = useMemo(() => {
    if (cmsTracks && cmsTracks.length > 0) {
      return cmsTracks.map((cmsItem) => ({
        name: cmsItem.name,
        desc: cmsItem.desc,
        time: cmsItem.time,
        img: cmsItem.img,
      }));
    }

    return [
      { name: t("track1"), desc: t("track1_desc"), time: t("track1_duration"), img: "/images/web.png" },
      { name: t("track2"), desc: t("track2_desc"), time: t("track2_duration"), img: "/images/uxui.png" },
      { name: t("track3"), desc: t("track3_desc"), time: t("track3_duration"), img: "/images/digitalMarketing.png" },
    ];
  }, [cmsTracks, t]);

  const trackData: TrackData = {
    registerText: t("register"),
    tracks,
  };

  return { trackData, isRTL };
}
