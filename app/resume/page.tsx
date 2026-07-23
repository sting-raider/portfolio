import { Download } from "lucide-react";
import { assetUrl } from "@/lib/site";

export const metadata = { title: "Résumé" };

export default function ResumePage() {
  const resumeUrl = assetUrl("/Ali_Sufiyan_Khan_Resume.pdf");
  return <div className="page-shell resume-page"><div className="resume-head"><div><p className="eyebrow">Character sheet / one page</p><h1>Résumé</h1></div><a className="button button--primary" href={resumeUrl} download>Download PDF <Download size={17} /></a></div><iframe src={resumeUrl} title="Ali Sufiyan Khan résumé" /><p className="resume-fallback">PDF preview unavailable? <a href={resumeUrl}>Open the résumé directly.</a></p></div>;
}
