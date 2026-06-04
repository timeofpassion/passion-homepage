"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

export default function ConnectForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!email) {
      setStatus("error");
      setMsg("이메일을 입력해 주세요.");
      return;
    }

    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/space/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      setMsg("감사합니다. 소식과 방문 안내를 가장 먼저 보내드리겠습니다.");
      form.reset();
    } catch {
      setStatus("error");
      setMsg(
        "전송에 실패했습니다. hello@passionspace.kr 로 직접 연락 주셔도 됩니다."
      );
    }
  };

  return (
    <form className="spc-form" onSubmit={onSubmit} noValidate>
      <div className="spc-form__field">
        <input
          className="spc-form__input"
          type="text"
          name="name"
          placeholder="이름 (선택)"
          autoComplete="name"
        />
      </div>
      <div className="spc-form__field">
        <input
          className="spc-form__input"
          type="email"
          name="email"
          placeholder="이메일 주소"
          autoComplete="email"
          required
        />
      </div>
      <button
        type="submit"
        className="spc-btn spc-btn--light spc-form__submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "전송 중…" : "구독하기"}
      </button>

      {msg && (
        <p
          className="spc-form__msg"
          role="status"
          style={status === "error" ? { color: "#e9a99a" } : undefined}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
