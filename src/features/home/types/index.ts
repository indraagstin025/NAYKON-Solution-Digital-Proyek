import React from "react";

export interface ConsultationFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface FormStatus {
  type: "idle" | "sending" | "success" | "error";
  message: string;
}

export interface HighlightItem {
  icon: React.ReactNode;
  label: string;
}

export interface ServiceTeaserItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  linkText: string;
  linkHref: string;
  icon: React.ReactNode;
}

export interface WorkflowStepItem {
  stepNumber: string;
  badge: string;
  title: string;
  description: string;
  milestone: string;
  icon: React.ReactNode;
}

export interface PortfolioTeaserItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  businessImpact: string;
  icon: React.ReactNode;
}

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string;
  isLink?: boolean;
  linkHref?: string;
}
