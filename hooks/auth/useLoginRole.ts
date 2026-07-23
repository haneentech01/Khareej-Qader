"use client";
import { Role } from "@/types";
import { useSearchParams } from "next/navigation";

export function useLoginRole(propRole?: Role): Role {
  const searchParams = useSearchParams();
  const queryRole = searchParams.get("role");

  if (propRole && propRole !== "admin") {
    return propRole;
  }
  if (queryRole === "student" || queryRole === "mentor") {
    return queryRole;
  }
  return "student";
}
