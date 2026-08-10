import type { Location } from "./types";

/**
 * PLACEHOLDER ADDRESS AND HOURS — replace with the clinic's real details.
 * `mapUrl` / `mapEmbedUrl` are intentionally empty: the location section falls
 * back to a plain address panel until real links are added, so the site never
 * shows a map pointing at the wrong place.
 */
export const locations: Location[] = [
  {
    id: "riverton",
    name: "Riverton clinic",
    addressLine1: "148 North Bridge Street",
    addressLine2: "Suite 2",
    city: "Riverton",
    state: "OH",
    postalCode: "45042",
    country: "US",
    phone: "(555) 010-2400",
    email: "hello@northsidefamilychiro.example",
    mapUrl: "",
    mapEmbedUrl: "",
    parkingNote:
      "Free parking behind the building, entered from Mill Lane. The entrance is at street level with no steps.",
    hours: [
      { dayOfWeek: 1, openTime: "08:00", closeTime: "17:30", isClosed: false },
      { dayOfWeek: 2, openTime: "09:00", closeTime: "19:00", isClosed: false },
      { dayOfWeek: 3, openTime: "08:00", closeTime: "17:30", isClosed: false },
      { dayOfWeek: 4, openTime: "09:00", closeTime: "19:00", isClosed: false },
      { dayOfWeek: 5, openTime: "08:00", closeTime: "15:00", isClosed: false },
      { dayOfWeek: 6, openTime: "09:00", closeTime: "12:00", isClosed: false },
      { dayOfWeek: 0, openTime: null, closeTime: null, isClosed: true },
    ],
  },
];
