import { redirect } from "next/navigation";

export default function HomePage() {
  // misal redirect langsung ke login
  redirect("/login");
}
