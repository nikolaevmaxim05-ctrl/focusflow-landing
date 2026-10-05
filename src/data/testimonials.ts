import type { TestimonialsContent } from "./types";

export const testimonials: TestimonialsContent = {
  intro: {
    title: "What people say",
  },
  items: [
    {
      quote:
        "I finally finish my study sessions instead of scrolling my phone. The timer and the rain sound are all I need.",
      name: "Emma Larsen",
      role: "Medical student",
      photo: {
        src: "/testimonials/emma.webp",
        alt: "Portrait of Emma Larsen",
        width: 200,
        height: 200,
      },
    },
    {
      quote:
        "The streaks got me hooked. I haven't missed a day of deep work in two months.",
      name: "Daniel Ortiz",
      role: "Freelance designer",
      photo: {
        src: "/testimonials/daniel.webp",
        alt: "Portrait of Daniel Ortiz",
        width: 200,
        height: 200,
      },
    },
    {
      quote:
        "Clean, simple and out of the way. I open it, press start and get to work.",
      name: "Priya Nair",
      role: "Software engineer",
      photo: {
        src: "/testimonials/priya.webp",
        alt: "Portrait of Priya Nair",
        width: 200,
        height: 200,
      },
    },
  ],
};
