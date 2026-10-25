"use client";

import { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactFormStatus {
  type: "idle" | "sending" | "success" | "error";
  message: string;
}

const INITIAL_STATE: ContactFormData = {
  name: "",
  email: "",
  service: "website",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_STATE);
  const [formStatus, setFormStatus] = useState<ContactFormStatus>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: "error",
        message: "Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.",
      });
      return;
    }

    setFormStatus({ type: "sending", message: "Sedang mengirim pesan..." });

    setTimeout(() => {
      setFormStatus({
        type: "success",
        message:
          "Terima kasih! Pesan Anda telah kami terima. Tim NAIKON akan menghubungi Anda dalam waktu 1x24 jam kerja.",
      });
      resetForm();
    }, 900);
  };

  return {
    formData,
    formStatus,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
