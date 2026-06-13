import { redirect } from "next/navigation";

export default function ErrorPage() {
  redirect("/error/404");
}
