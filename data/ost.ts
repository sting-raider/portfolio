import { assetUrl } from "@/lib/site";

export type OstTrack = {
  title: string;
  url: string;
};

export const ostTracks: OstTrack[] = [
  { title: "Fallen Down", url: assetUrl("/assets/audio/fallen-down.mp3") },
  { title: "Spider Dance", url: assetUrl("/assets/audio/spider-dance.mp3") },
  { title: "Hopes and Dreams", url: assetUrl("/assets/audio/hopes-and-dreams.mp3") },
  { title: "MEGALOVANIA", url: assetUrl("/assets/audio/megalovania.mp3") },
  { title: "My Castle Town", url: assetUrl("/assets/audio/my-castle-town.mp3") },
  { title: "ASGORE", url: assetUrl("/assets/audio/asgore.mp3") },
  { title: "CORE", url: assetUrl("/assets/audio/core.mp3") },
  { title: "Petal Dance", url: assetUrl("/assets/audio/petal-dance.mp3") },
];
