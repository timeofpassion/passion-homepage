"use client";

import { useMemo, useState } from "react";
import InfluencerCard from "./InfluencerCard";
import {
  type Influencer,
  type Country,
  type Category,
  CATEGORY_LABEL,
  COUNTRY_LABEL,
} from "../_data/sample";

const COUNTRIES: (Country | "ALL")[] = ["ALL", "JP", "CN", "TW"];
const CATEGORIES: Category[] = [
  "beauty",
  "food",
  "travel",
  "lifestyle",
  "fashion",
  "tech",
];

export default function InfluencerFilter({ data }: { data: Influencer[] }) {
  const [country, setCountry] = useState<Country | "ALL">("ALL");
  const [cats, setCats] = useState<Set<Category>>(new Set());

  const toggleCat = (c: Category) =>
    setCats((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });

  const filtered = useMemo(
    () =>
      data.filter((inf) => {
        if (country !== "ALL" && inf.country !== country) return false;
        if (cats.size > 0 && !inf.category.some((c) => cats.has(c)))
          return false;
        return true;
      }),
    [data, country, cats]
  );

  return (
    <div>
      <div className="ppl-filter">
        <div className="ppl-filter__row">
          <span className="ppl-filter__label">국가</span>
          {COUNTRIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`ppl-chip ${country === c ? "is-active" : ""}`}
              onClick={() => setCountry(c)}
            >
              {c === "ALL" ? "전체" : COUNTRY_LABEL[c]}
            </button>
          ))}
        </div>
        <div className="ppl-filter__row">
          <span className="ppl-filter__label">분야</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`ppl-chip ppl-chip--cat ${
                cats.has(c) ? "is-active" : ""
              }`}
              onClick={() => toggleCat(c)}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      <p className="ppl-result-count">
        총 <b>{filtered.length}</b>명
      </p>

      {filtered.length === 0 ? (
        <div className="ppl-empty">조건에 맞는 인플루언서가 없습니다.</div>
      ) : (
        <div className="ppl-inf-grid">
          {filtered.map((inf) => (
            <InfluencerCard key={inf.id} inf={inf} />
          ))}
        </div>
      )}
    </div>
  );
}
