import Resume from "@/views/resume/Resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Murtuza Ahmed resume and explore his professional experience as a MERN Stack Developer, including work history, education, and technical skills.",
};

export default function ResumePage() {
  return (
    <>
      <Resume />
    </>
  );
}
