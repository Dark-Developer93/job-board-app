/* eslint-disable no-param-reassign */

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClientSideReset() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.toString() === "") {
      const form = document.querySelector("form") as HTMLFormElement | null;
      if (form) {
        form.reset();
      }

      document.querySelectorAll("select").forEach((selectElement) => {
        if (selectElement instanceof HTMLSelectElement) {
          selectElement.value = "all";
          selectElement.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });

      const searchInput = document.querySelector(
        'input[name="q"]',
      ) as HTMLInputElement | null;
      if (searchInput) searchInput.value = "";

      const remoteCheckbox = document.querySelector(
        'input[name="remote"]',
      ) as HTMLInputElement | null;
      if (remoteCheckbox) remoteCheckbox.checked = false;
    }
  }, [searchParams]);

  return null;
}
