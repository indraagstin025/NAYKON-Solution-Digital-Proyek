"use client";

import { useState } from "react";
import type { ConsultationFormData, FormStatus } from "../types";

const INITIAL_FORM_DATA: ConsultationFormData = {
  name: "",
  email: "",
  service: "website",
  message: "",
};

export function useConsultationForm() {
  const [formData, setFormData] = useState<ConsultationFormData>(INITIAL_FORM_DATA);
  const [formStatus, setFormStatus] = useState<FormStatus>({
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
    setFormData(INITIAL_FORM_DATA);
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
