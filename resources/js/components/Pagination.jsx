import React from "react";
import { Inertia } from "@inertiajs/inertia";
import CoreButton from "./CoreButton";

export default function Pagination({ links }) {
  if (!links || links.length <= 1) return null;

  return (
    <nav className="flex justify-center mt-6 space-x-1" aria-label="Pagination">
      {links.map((link, idx) => {
        const cleanLabel =
          link.label.replace(/&laquo;|&raquo;|<.*?>/g, "").trim() || "...";
        return (
          <CoreButton 
            color="green"
            variant="dashed"
            size="sm"   
            key={idx}
            disabled={!link.url || link.active}
            onClick={() => link.url && Inertia.visit(link.url, {preserveScroll: true})}
          >
            {cleanLabel}
          </CoreButton>
        );
      })}
    </nav>
  );
}
