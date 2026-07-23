"use client";

import { useTranslations } from "next-intl";
import type { AdminCourse } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    courses: AdminCourse[];
}

export function CoursesTable({ courses }: Props) {
    const t = useTranslations("Admin.courses");

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <Table dir="rtl">
                <TableHeader>
                    <TableRow className="bg-slate-50/50">
                        <TableHead className="font-extrabold text-center">{t("table.id")}</TableHead>
                        <TableHead className="font-extrabold text-center">{t("table.name")}</TableHead>
                        <TableHead className="font-extrabold text-center">{t("table.description")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-12 text-brand-muted">
                                {t("no_data")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        courses.map((course) => (
                            <TableRow key={course.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-bold text-center">#{course.id}</TableCell>
                                <TableCell>
                                    <p className="font-bold text-black text-center">{course.name}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-brand-muted text-sm wrap-break-word whitespace-normal text-start">
                                        {course.description}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
