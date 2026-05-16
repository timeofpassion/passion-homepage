import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TrendingDown, Eye, Globe } from 'lucide-react'
import { ReactNode } from 'react'

const diagnostics = [
  {
    id: "01 // EFFICIENCY",
    title: "광고비 누수",
    desc: "예산은 늘어나지만 매출은 제자리입니다. 마케팅 구조의 근본적인 결함을 진단하고 새어나가는 비용을 차단해야 합니다.",
    icon: TrendingDown,
  },
  {
    id: "02 // TRANSPARENCY",
    title: "불투명한 성과",
    desc: "숫자뿐인 리포트에 속지 마십시오. 실제 환자 내원 데이터와 연동된 본질적인 성과 지표를 구축합니다.",
    icon: Eye,
  },
  {
    id: "03 // EXPANSION",
    title: "해외 유치 한계",
    desc: "일본, 중국, 대만 환자가 실제 내원으로 이어지는 글로벌 프로세스를 설계하여 진료 범위를 세계로 확장합니다.",
    icon: Globe,
  },
]

export default function DiagnosticsSection() {
  return (
    <section className="py-16 md:py-32" style={{
      background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
    }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">병원 마케팅의 핵심 문제</h2>
          <p className="mt-4 text-muted-foreground">세 가지 근본적인 문제를 진단하고 해결합니다</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diagnostics.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.id} className="group border-0 bg-muted shadow-none">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Icon className="size-6" aria-hidden />
                  </CardDecorator>
                  <span
                    className="font-mono-sys"
                    style={{ fontSize: 11, color: "#cc0000", marginBottom: 12, display: "block" }}
                  >
                    {item.id}
                  </span>
                  <h3 className="mt-6 font-medium text-lg">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
    <div className="absolute inset-0 [--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"/>
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-[rgba(255,255,255,0.1)]">{children}</div>
  </div>
)
