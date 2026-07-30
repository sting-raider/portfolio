import { Download } from "lucide-react";
import { assetUrl, resumeDownloadUrl } from "@/lib/site";

export const metadata = { title: "Résumé" };

export default function ResumePage() {
  const resumePreviewUrl = assetUrl("/Ali_Sufiyan_Khan_Resume.pdf");
  return <div className="page-shell resume-page"><div className="resume-head"><div><p className="eyebrow">Character sheet / one page</p><h1>Résumé</h1></div><a className="button button--primary" href={resumeDownloadUrl} download data-umami-event="resume-download" data-umami-event-location="resume-page">Download PDF <Download size={17} /></a></div><iframe src={resumePreviewUrl} title="Ali Sufiyan Khan résumé" /><p className="resume-fallback">PDF preview unavailable? <a href={resumeDownloadUrl} data-umami-event="resume-open" data-umami-event-location="resume-page-fallback">Download the latest résumé directly.</a></p></div>;
}
