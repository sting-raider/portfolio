import Link from "next/link";
import { Byte } from "@/components/Byte";

export default function NotFound() {
  return <div className="not-found"><Byte mood="sheepish" /><p className="pixel-label">ERROR 404</p><h1>This path fell out of the map.</h1><p>* The page is missing.<br />* The navigation still works.</p><Link className="button button--primary" href="/">Return to the save point</Link></div>;
}
