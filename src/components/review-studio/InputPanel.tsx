"use client";

import { useState, useEffect } from "react";
import { getPlatformSpec } from "@/lib/review-prompts";

interface ClientInfo {
  id: string;
  name: string;
  category: string;
  importance: string;
}

interface Review {
  title: string;
  content: string;
}

interface InputPanelProps {
  onGenerate: (result: { reviews: Review[]; savedCount: number; platform: string }) => void;
  onLoadingChange: (loading: boolean) => void;
}

const PLATFORMS = [
  { key: "naver", label: "네이버플레이스" },
  { key: "google_kr", label: "구글맵(한국어)" },
  { key: "google_en", label: "구글맵(영문)" },
  { key: "kakao", label: "카카오맵" },
];

const EMPHASIS_POINTS = ["결과", "상담", "시설", "가성비", "회복", "접근성"];
const COUNT_OPTIONS = [3, 5, 10];

export default function InputPanel({ onGenerate, onLoadingChange }: InputPanelProps) {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);

  const [selectedClient, setSelectedClient] = useState("");
  const [platform, setPlatform] = useState("naver");
  const [emphasisPoints, setEmphasisPoints] = useState<string[]>(["결과"]);
  const [count, setCount] = useState(3);
  const [treatmentName, setTreatmentName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // 클라이언트 목록 로드
  useEffect(() => {
    fetch("/api/review/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data.clients || []);
        setLoadingClients(false);
      })
      .catch(() => setLoadingClients(false));
  }, []);

  const toggleEmphasis = (point: string) => {
    setEmphasisPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleGenerate = async () => {
    if (!selectedClient) {
      setError("병원을 선택해주세요");
      return;
    }
    setError("");
    setGenerating(true);
    onLoadingChange(true);

    try {
      const res = await fetch("/api/review/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          hospitalName: selectedClient,
          emphasisPoints,
          count,
          treatmentName: treatmentName || undefined,
          doctorName: doctorName || undefined,
          specialNotes: specialNotes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "생성 실패");
        return;
      }

      onGenerate(data);
    } catch {
      setError("네트워크 오류");
    } finally {
      setGenerating(false);
      onLoadingChange(false);
    }
  };

  const spec = getPlatformSpec(platform);

  return (
    <div className="space-y-5">
      {/* 병원 선택 */}
      <div>
        <label className="block text-sm text-white/60 mb-2">병원 선택 *</label>
        {loadingClients ? (
          <div className="h-11 bg-white/[0.03] rounded-lg animate-pulse" />
        ) : (
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full h-11 bg-white/[0.05] border border-white/10 rounded-lg px-3 text-white text-sm focus:outline-none focus:border-brand-500/50 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0a0000]">병원을 선택하세요</option>
            {clients.map((c) => (
              <option key={c.id} value={c.name} className="bg-[#0a0000]">
                {c.name} ({c.importance})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 플랫폼 선택 */}
      <div>
        <label className="block text-sm text-white/60 mb-2">플랫폼 *</label>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPlatform(p.key)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                platform === p.key
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/40"
                  : "bg-white/[0.03] text-white/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-white/30 mt-1.5">권장 글자수: {spec.charRange}</p>
      </div>

      {/* 강조 포인트 */}
      <div>
        <label className="block text-sm text-white/60 mb-2">강조 포인트 (복수 선택)</label>
        <div className="flex flex-wrap gap-2">
          {EMPHASIS_POINTS.map((point) => (
            <button
              key={point}
              onClick={() => toggleEmphasis(point)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                emphasisPoints.includes(point)
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/40"
                  : "bg-white/[0.03] text-white/40 border border-white/10 hover:border-white/20"
              }`}
            >
              {point}
            </button>
          ))}
        </div>
      </div>

      {/* 생성 개수 */}
      <div>
        <label className="block text-sm text-white/60 mb-2">생성 개수 *</label>
        <div className="flex gap-2">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                count === n
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/40"
                  : "bg-white/[0.03] text-white/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {n}개
            </button>
          ))}
        </div>
      </div>

      {/* 선택 입력 필드들 */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">시술명 (선택)</label>
          <input
            type="text"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
            placeholder="예: 보톡스, 울쎄라, 레이저토닝"
            className="w-full h-10 bg-white/[0.03] border border-white/10 rounded-lg px-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-500/50"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">원장명 (선택)</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="예: 김OO 원장님"
            className="w-full h-10 bg-white/[0.03] border border-white/10 rounded-lg px-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-500/50"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">특이사항 (선택)</label>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="예: 이벤트 진행 중, 신시술 출시, 20대 타깃"
            rows={2}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-500/50 resize-none"
          />
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
      )}

      {/* 생성 버튼 */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/20"
      >
        {generating ? "생성 중..." : `리뷰 원고 ${count}개 생성`}
      </button>
    </div>
  );
}
