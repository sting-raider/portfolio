import { FlaskConical } from "lucide-react";

export const metadata = { title: "The Lab" };

export default function LabPage() {
  return <div className="page-shell"><section className="page-hero compact-hero lab-hero"><div><p className="eyebrow">The lab / controlled mess</p><h1>Experiments that<br /><em>teach before they ship.</em></h1><p className="page-lede">A future home for prototypes, discarded approaches, and technical notes. Nothing is hidden here yet — even the empty state is honest.</p></div><FlaskConical className="lab-flask" /></section><section className="empty-lab"><span>NULL</span><h2>The benches are being prepared.</h2><p>RoleAtlas and the robotics project currently consume the available electricity.</p></section></div>;
}
