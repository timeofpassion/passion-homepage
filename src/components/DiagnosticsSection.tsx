import { TrendingDown, Eye, Globe } from 'lucide-react'
import { ReactNode } from 'react'

const diagnostics = [
  {
    title: "광고비 누수",
    desc: "예산은 늘어나지만 매출은 제자리입니다. 마케팅 구조의 근본적인 결함을 진단하고 새어나가는 비용을 차단해야 합니다.",
    icon: TrendingDown,
  },
  {
    title: "불투명한 성과",
    desc: "숫자뿐인 리포트에 속지 마십시오. 실제 환자 내원 데이터와 연동된 본질적인 성과 지표를 구축합니다.",
    icon: Eye,
  },
  {
    title: "해외 유치 한계",
    desc: "일본, 중국, 대만 환자가 실제 내원으로 이어지는 글로벌 프로세스를 설계하여 진료 범위를 세계로 확장합니다.",
    icon: Globe,
  },
]

export default function DiagnosticsSection() {
  return (
    <section className="pt-48 md:pt-56 pb-32">
      <div className="mx-auto px-6 max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-mono-sys text-xs md:text-sm text-[#cc0000] mb-6 inline-flex items-center gap-3">
            <span className="w-12 h-px bg-[#cc0000]/50"></span>
            DIAGNOSTIC REPORT
            <span className="w-12 h-px bg-[#cc0000]/50"></span>
          </p>
          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">원장님, 혹시 이런 고민 있으신가요?</h2>
          <p className="text-white/50 text-base md:text-lg">병원 마케팅에서 가장 자주 막히는 세 가지를 짚어드립니다</p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {diagnostics.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="glass-card tech-border group p-8 md:p-10 text-center transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-10px_rgba(204,0,0,0.2)]"
              >
                {/* 데코레이터 */}
                <div className="relative mx-auto mb-6 w-36 h-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                  <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'linear-gradient(to right, rgba(204,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(204,0,0,0.12) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-[#0a0000] border-t border-l border-white/30 flex items-center justify-center group-hover:border-[#cc0000] transition-colors duration-500">
                    <Icon className="w-6 h-6 text-[#cc0000]" aria-hidden />
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-xl md:text-2xl text-white mb-4">{item.title}</h3>

                {/* 장식 라인 */}
                <div className="w-12 h-px bg-[#cc0000]/50 mx-auto mb-4 group-hover:w-20 transition-all duration-500"></div>

                {/* 본문 */}
                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
