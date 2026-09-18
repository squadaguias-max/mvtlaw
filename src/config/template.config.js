import { phoneLabel, projectData, projectWhatsappUrl, whatsappDigits } from "./project.data";

export const templateConfig = {
  ...projectData,
  contact: {
    ...projectData.contact,
    phone: whatsappDigits,
    phoneLabel,
  },
};

export function whatsappUrl(message = projectData.contact.whatsappMessage) {
  return projectWhatsappUrl(message);
}
