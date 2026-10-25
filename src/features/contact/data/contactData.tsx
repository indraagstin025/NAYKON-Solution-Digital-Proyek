import React from "react";
import { EnvelopeClosedIcon, ClockIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

export const CONTACT_CHANNELS = [
  {
    icon: <EnvelopeClosedIcon className="h-5 w-5" />,
    title: "Email Resmi Konsultasi",
    content: "contact@naykon.id",
    isLink: true,
    linkHref: "mailto:contact@naykon.id",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "Jam Kerja Operasional",
    content: "Senin – Jumat, 09.00 – 18.00 WIB",
  },
  {
    icon: <ChatBubbleIcon className="h-5 w-5" />,
    title: "Komitmen Respons",
    content: "Tinjauan spesifikasi & estimasi dalam 1x24 jam kerja",
  },
];
