import Script from "next/script";
import { useEffect } from "react";

const AdSense = ({ pId, slotId }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error: ", e);
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${pId}`}
        data-ad-slot={slotId}
        data-ad-format="auto"
      />
    </>
  );
};

export default AdSense;
