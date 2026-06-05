"use client";

import { useMemo, useState } from "react";
import InfluencerCard from "./InfluencerCard";
import {
  type Influencer,
  type Country,
  type Platform,
  COUNTRY_ORDER,
  COUNTRY_LABEL,
  PLATFORM_LABEL,
} from "../_data/sample";

export default function InfluencerFilter({ data }: { data: Influencer[] }) {
  const [country, setCountry] = useState<Country | "ALL">("ALL");
  const [platform, setPlatform] = useState<Platform | "ALL">("ALL");
  const [cats, setCats] = useState<Set<string>>(new Set());

  // 데이터에 실제로 존재하는 국가만(노출 순서 유지)
  const countries = useMemo<Country[]>(
    () => COUNTRY_ORDER.filter((c) => data.some((inf) => inf.country === c)),
    [data]
  );
  // 데이터에 실제로 존재하는 플랫폼만
  const platforms = useMemo<Platform[]>(() => {
    const set = new Set<Platform>();
    data.forEach((inf) => inf.channels.forEach((ch) => set.add(ch.platform)));
    return Array.from(set);
  }, [data]);
  // 데이터에 실제로 존재하는 분야(자유 문자열)만
  const categories = useMemo<string[]>(() => {
    const set = new Set<string>();
    data.forEach((inf) => inf.categories.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [data]);

  const toggleCat = (c: string) =>
    setCats((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });

  const filtered = useMemo(
    () =>
      data.filter((inf) => {
        if (country !== "ALL" && inf.country !== country) return false;
        if (
          platform !== "ALL" &&
          !inf.channels.some((ch) => ch.platform === platform)
        )
          return false;
        if (cats.size > 0 && !inf.categories.some((c) => cats.has(c)))
          return false;
        return true;
      }),
    [data, country, platform, cats]
  );

  const reset = () => {
    setCountry("ALL");
    setPlatform("ALL");
    setCats(new Set());
  };
  const dirty = country !== "ALL" || platform !== "ALL" || cats.size > 0;

  return (
    <div>
      <div className="ppl-filter">
        <div className="ppl-filter__row">
          <span className="ppl-filter__label">국가</span>
          <button
            type="button"
            className={`ppl-chip ${country === "ALL" ? "is-active" : ""}`}
            onClick={() => setCountry("ALL")}
          >
            전체
          </button>
          {countries.map((c) => (
            <button
              key={c}
              type="button"
              className={`ppl-chip ${country === c ? "is-active" : ""}`}
              onClick={() => setCountry(c)}
            >
              {COUNTRY_LABEL[c]}
            </button>
          ))}
        </div>

        {platforms.length > 0 && (
          <div className="ppl-filter__row">
            <span className="ppl-filter__label">플랫폼</span>
            <button
              type="button"
              className={`ppl-chip ${platform === "ALL" ? "is-active" : ""}`}
              onClick={() => setPlatform("ALL")}
            >
              전체
            </button>
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                className={`ppl-chip ${platform === p ? "is-active" : ""}`}
                onClick={() => setPlatform(p)}
              >
                {PLATFORM_LABEL[p]}
              </button>
            ))}
          </div>
        )}

        {categories.length > 0 && (
          <div className="ppl-filter__row">
            <span className="ppl-filter__label">분야</span>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`ppl-chip ppl-chip--cat ${
                  cats.has(c) ? "is-active" : ""
                }`}
                onClick={() => toggleCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ppl-result-bar">
        <p className="ppl-result-count">
          총 <b>{filtered.length}</b>명
        </p>
        {dirty && (
          <button type="button" className="ppl-reset" onClick={reset}>
            필터 초기화 ✕
          </button>
        )}
      </div>

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
