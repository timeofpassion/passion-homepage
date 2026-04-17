"use client";

import { useState, useEffect } from "react";

interface ClientInfo {
  id: string;
  name: string;
  category: string;
  importance: string;
}

interface DoctorSettings {
  hospitalName: string;
  doctorName: string;
  doctorList: string[];
  mainTreatments: string;
  treatmentList: string[];
  specialty: string;
}

interface Review {
  title: string;
  content: string;
}

interface PlatformResult {
  platform: string;
  platformLabel: string;
  charRange: string;
  reviews: Review[];
  savedCount: number;
  error?: string;
}

interface InputPanelProps {
  onGenerate: (result: { results: PlatformResult[] }) => void;
  onLoadingChange: (loading: boolean) => void;
}

const PLATFORMS = [
  { key: "naver", label: "네이버플레이스" },
  { key: "google_kr", label: "구글맵" },
  { key: "kakao", label: "카카오맵" },
];

const EMPHASIS_POINTS = ["결과", "상담", "시설", "가성비", "회복", "접근성"];

export default function InputPanel({ onGenerate, onLoadingChange }: InputPanelProps) {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [clientsError, setClientsError] = useState("");

  const [selectedClient, setSelectedClient] = useState("");
  const [doctorSettings, setDoctorSettings] = useState<DoctorSettings | null>(null);

  const [platforms, setPlatforms] = useState<string[]>(["naver"]);
  const [emphasisPoints, setEmphasisPoints] = useState<string[]>(["결과"]);
  const [count, setCount] = useState<number | "">("");

  const [treatmentNames, setTreatmentNames] = useState<string[]>([]);
  const [treatmentInput, setTreatmentInput] = useState("");
  const [doctorNames, setDoctorNames] = useState<string[]>([]);
  const [doctorInput, setDoctorInput] = useState("");

  const [specialNotes, setSpecialNotes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    fetch("/api/review/clients")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.detail || data.error || `${r.status}`);
        return data;
      })
      .then((data) => {
        setClients(data.clients || []);
        setLoadingClients(false);
      })
      .catch((e) => {
        setClientsError(String(e.message || e));
        setLoadingClients(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedClient) {
      setDoctorSettings(null);
      return;
    }
    fetch(`/api/review/doctor-settings?hospital=${encodeURIComponent(selectedClient)}`)
      .then((r) => r.json())
      .then((data) => setDoctorSettings(data.settings || null))
      .catch(() => setDoctorSettings(null));
    setTreatmentNames([]);
    setDoctorNames([]);
    setTreatmentInput("");
    setDoctorInput("");
  }, [selectedClient]);

  const togglePlatform = (key: string) => {
    setPlatforms((prev) => (prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]));
  };

  const toggleEmphasis = (point: string) => {
    setEmphasisPoints((prev) => (prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]));
  };

  const handleTreatmentInput = (val: string) => {
    if (val.includes(",")) {
      const parts = val.split(",").map((s) => s.trim()).filter(Boolean);
      setTreatmentNames((prev) => Array.from(new Set([...prev, ...parts])));
      setTreatmentInput("");
    } else {
      setTreatmentInput(val);
    }
  };

  const handleTreatmentCommit = () => {
    const v = treatmentInput.trim();
    if (v) {
      setTreatmentNames((prev) => Array.from(new Set([...prev, v])));
      setTreatmentInput("");
    }
  };

  const handleDoctorInput = (val: string) => {
    if (val.includes(",")) {
      const parts = val.split(",").map((s) => s.trim()).filter(Boolean);
      setDoctorNames((prev) => Array.from(new Set([...prev, ...parts])));
      setDoctorInput("");
    } else {
      setDoctorInput(val);
    }
  };

  const handleDoctorCommit = () => {
    const v = doctorInput.trim();
    if (v) {
      setDoctorNames((prev) => Array.from(new Set([...prev, v])));
      setDoctorInput("");
    }
  };

  const addTreatment = (name: string) => {
    if (!treatmentNames.includes(name)) setTreatmentNames([...treatmentNames, name]);
  };
  const addDoctor = (name: string) => {
    if (!doctorNames.includes(name)) setDoctorNames([...doctorNames, name]);
  };

  const removeTreatment = (name: string) => setTreatmentNames(treatmentNames.filter((n) => n !== name));
  const removeDoctor = (name: string) => setDoctorNames(doctorNames.filter((n) => n !== name));

  const handleFeedbackSubmit = async () => {
    setFeedbackError("");
    setFeedbackSuccess("");
    if (!selectedClient) {
      setFeedbackError("먼저 병원을 선택해주세요");
      return;
    }
    const trimmed = feedbackText.trim();
    if (trimmed.length < 3) {
      setFeedbackError("피드백 내용을 3자 이상 입력해주세요");
      return;
    }
    setFeedbackSubmitting(true);
    try {
      const res = await fetch("/api/review/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospitalName: selectedClient,
          feedback: trimmed,
          platforms: platforms.length > 0 ? platforms.map((p) => {
            if (p === "naver") return "네이버플레이스";
            if (p === "google_kr") return "구글맵";
            if (p === "kakao") return "카카오맵";
            return "전체";
          }) : ["전체"],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedbackError(data.detail || data.error || "저장 실패");
        return;
      }
      setFeedbackSuccess(data.message || "피드백 저장 완료");
      setFeedbackText("");
      setTimeout(() => setFeedbackSuccess(""), 5000);
    } catch {
      setFeedbackError("네트워크 오류");
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedClient) return setError("병원을 선택해주세요");
    if (platforms.length === 0) return setError("플랫폼을 1개 이상 선택해주세요");
    const numCount = typeof count === "number" ? count : 0;
    if (!numCount || numCount < 1) return setError("생성 개수를 입력해주세요");

    const finalTreatments = treatmentInput.trim() ? [...treatmentNames, treatmentInput.trim()] : treatmentNames;
    const finalDoctors = doctorInput.trim() ? [...doctorNames, doctorInput.trim()] : doctorNames;

    setError("");
    setGenerating(true);
    onLoadingChange(true);

    try {
      const res = await fetch("/api/review/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platforms,
          hospitalName: selectedClient,
          emphasisPoints,
          count: numCount,
          treatmentNames: finalTreatments.length > 0 ? finalTreatments : undefined,
          doctorNames: finalDoctors.length > 0 ? finalDoctors : undefined,
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

  const treatmentSuggestions = doctorSettings?.treatmentList?.filter((t) => !treatmentNames.includes(t)) ?? [];
  const doctorSuggestions = doctorSettings?.doctorList?.filter((d) => !doctorNames.includes(d)) ?? [];
  const countNum = typeof count === "number" ? count : 0;
  const totalCount = platforms.length * countNum;

  return (
    <div>
      {/* 병원 선택 */}
      <div className="rs-field">
        <label className="rs-label rs-required">병원 선택</label>
        {loadingClients ? (
          <div className="rs-skeleton" />
        ) : clientsError ? (
          <div className="rs-alert rs-alert--danger">
            <strong>병원 목록 조회 실패</strong>
            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8, wordBreak: "break-word" }}>{clientsError}</div>
            <div style={{ fontSize: 11, marginTop: 6, opacity: 0.6 }}>
              해결: 노션에서 해당 DB → ··· → Connections에 인테그레이션 추가
            </div>
          </div>
        ) : clients.length === 0 ? (
          <div className="rs-alert rs-alert--warning">
            &quot;계약 중&quot; 상태 병원이 없습니다. 노션 클라이언트 DB를 확인해주세요.
          </div>
        ) : (
          <select
            className="rs-select"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">병원을 선택하세요 ({clients.length}개)</option>
            {clients.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* 피드백 제출 박스 (병원 선택 후 노출) */}
      {selectedClient && (
        <div className="rs-feedback-box">
          <div className="rs-feedback-title">개선사항 제출</div>
          <div className="rs-feedback-desc">
            수정/개선 요청을 입력하면 다음 원고 생성에 자동 반영됩니다.
          </div>
          <textarea
            className="rs-feedback-textarea"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder={`예: "${selectedClient} 원고에서 주차 얘기 빼고 대기 시간 쪽으로 바꿔주세요"`}
            rows={3}
          />
          <button
            type="button"
            className="rs-feedback-submit"
            onClick={handleFeedbackSubmit}
            disabled={feedbackSubmitting}
          >
            {feedbackSubmitting ? "저장 중..." : "피드백 제출"}
          </button>
          {feedbackError && (
            <div className="rs-alert rs-alert--danger" style={{ marginTop: 8 }}>
              {feedbackError}
            </div>
          )}
          {feedbackSuccess && <div className="rs-feedback-success">{feedbackSuccess}</div>}
        </div>
      )}

      {/* 플랫폼 */}
      <div className="rs-field">
        <label className="rs-label rs-required">플랫폼 (다중 선택)</label>
        <div className="rs-btn-group rs-btn-group--3">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`rs-toggle ${platforms.includes(p.key) ? "is-active" : ""}`}
              onClick={() => togglePlatform(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 강조 포인트 */}
      <div className="rs-field">
        <label className="rs-label">강조 포인트 (복수 선택)</label>
        <div className="rs-chip-group">
          {EMPHASIS_POINTS.map((point) => (
            <button
              key={point}
              type="button"
              className={`rs-chip ${emphasisPoints.includes(point) ? "is-active" : ""}`}
              onClick={() => toggleEmphasis(point)}
            >
              {point}
            </button>
          ))}
        </div>
      </div>

      {/* 생성 개수 */}
      <div className="rs-field">
        <label className="rs-label rs-required">생성 개수 (플랫폼별)</label>
        <div className="rs-count-row">
          <input
            type="number"
            min={1}
            max={30}
            value={count}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") {
                setCount("");
              } else {
                const n = parseInt(v);
                if (!isNaN(n)) setCount(Math.max(1, Math.min(30, n)));
              }
            }}
            placeholder="개수"
            className="rs-input rs-number"
          />
          <span style={{ fontSize: 12, color: "var(--rs-text-dim)" }}>개</span>
          {platforms.length > 0 && countNum > 0 && (
            <span className="rs-count-total">
              총 {totalCount}개 ({platforms.length} × {countNum})
            </span>
          )}
        </div>
      </div>

      {/* 시술명 */}
      <div className="rs-field">
        <label className="rs-label">
          시술명
          <span style={{ fontWeight: 400, fontSize: 11, color: "var(--rs-text-dim)", marginLeft: 6 }}>
            쉼표 또는 Enter로 여러 개
          </span>
        </label>
        {treatmentNames.length > 0 && (
          <div className="rs-tags">
            {treatmentNames.map((name) => (
              <span key={name} className="rs-tag">
                {name}
                <button type="button" className="rs-tag-close" onClick={() => removeTreatment(name)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className="rs-input"
          value={treatmentInput}
          onChange={(e) => handleTreatmentInput(e.target.value)}
          onBlur={handleTreatmentCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleTreatmentCommit();
            }
          }}
          placeholder="예: 보톡스, 울쎄라, 레이저토닝"
        />
        {treatmentSuggestions.length > 0 && (
          <div className="rs-suggestions">
            <div className="rs-suggestions-label">노션 등록 주력시술 (클릭 추가)</div>
            <div>
              {treatmentSuggestions.map((t) => (
                <button key={t} type="button" className="rs-suggestion" onClick={() => addTreatment(t)}>+ {t}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 원장명 */}
      <div className="rs-field">
        <label className="rs-label">
          원장명
          <span style={{ fontWeight: 400, fontSize: 11, color: "var(--rs-text-dim)", marginLeft: 6 }}>
            쉼표 또는 Enter로 여러 명
          </span>
        </label>
        {doctorNames.length > 0 && (
          <div className="rs-tags">
            {doctorNames.map((name) => (
              <span key={name} className="rs-tag">
                {name}
                <button type="button" className="rs-tag-close" onClick={() => removeDoctor(name)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className="rs-input"
          value={doctorInput}
          onChange={(e) => handleDoctorInput(e.target.value)}
          onBlur={handleDoctorCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleDoctorCommit();
            }
          }}
          placeholder="예: 김OO 원장님, 이OO 원장님"
        />
        {doctorSuggestions.length > 0 && (
          <div className="rs-suggestions">
            <div className="rs-suggestions-label">노션 등록 원장 (클릭 추가)</div>
            <div>
              {doctorSuggestions.map((d) => (
                <button key={d} type="button" className="rs-suggestion" onClick={() => addDoctor(d)}>+ {d}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 특이사항 */}
      <div className="rs-field">
        <label className="rs-label">특이사항 (선택)</label>
        <textarea
          className="rs-textarea"
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
          placeholder="예: 이벤트 진행 중, 신시술 출시, 20대 타깃"
          rows={2}
        />
      </div>

      {error && <div className="rs-alert rs-alert--danger">{error}</div>}

      <button
        type="button"
        className="rs-generate"
        onClick={handleGenerate}
        disabled={generating}
      >
        {generating ? "생성 중..." : totalCount > 0 ? `리뷰 원고 ${totalCount}개 생성` : "리뷰 원고 생성"}
      </button>
    </div>
  );
}
