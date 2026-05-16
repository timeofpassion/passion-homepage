import { Plus } from 'lucide-react'

const clients = [
  { name: "MELLOW", logo: "/clients/logo_mellow.png" },
  { name: "오아로피부과", logo: "/clients/logo_oaro.png" },
  { name: "오체안피부과", logo: "/clients/logo_ozhean.png" },
  { name: "순수안피부과", logo: "/clients/logo_soosoan.png" },
  { name: "별성형외과의원", logo: "/clients/logo_star.png" },
  { name: "타임리턴의원", logo: "/clients/logo_timereturn.png" },
  { name: "Lefilleo", logo: "/clients/logo_lefilleo.png" },
  { name: "OLARA", logo: "/clients/logo_olara.png" },
  { name: "Genabelle", logo: "/clients/logo_henabelle.png" },
  { name: "오늘우리학교는", logo: "/clients/logo_school.png" },
  { name: "르웰의원", logo: "/clients/logo_lewell.png" },
  { name: "신통정형외과", logo: "/clients/logo_sintong.png" },
  { name: "이현한방병원", logo: "/clients/logo_ehyun.png" },
  { name: "군포시", logo: "/clients/logo_gunpo.png" },
  { name: "한세대학교", logo: "/clients/logo_hansei.png" },
  { name: "캡틴법률사무소", logo: "/clients/logo_captain.png" },
  { name: "RE&WELL", logo: "/clients/logo_rewell.png" },
  { name: "메디힐", logo: "/clients/logo_medihim.png" },
  { name: "Babitalk", logo: "/clients/logo_babitalk.png" },
  { name: "SMPS", logo: "/clients/logo_smps.png" },
]

export default function ClientsSection() {
  return (
    <section className="pt-32 md:pt-40 pb-32 relative z-10">
      <div className="mx-auto px-6 max-w-7xl">
        {/* 헤더 */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-mono-sys text-xs md:text-sm text-[#cc0000] mb-6 inline-flex items-center gap-3">
            <span className="w-12 h-px bg-[#cc0000]/50"></span>
            CLIENT NETWORK
            <span className="w-12 h-px bg-[#cc0000]/50"></span>
          </p>
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            열정의 시간을 오랫동안 믿고 맡겨주신<br className="hidden md:block" /> 우리 소중한 클라이언트
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-4">
            &lt;열정의시간은 클라이언트의 &lsquo;진짜&rsquo; 직원처럼 결과와 매출을 먼저 걱정합니다&gt;
          </p>
        </div>

        {/* 로고 그리드 */}
        <div className="max-w-6xl mx-auto border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {clients.map((client, index) => {
              const col = index % 4
              const row = Math.floor(index / 4)
              const isEven = (col + row) % 2 === 0
              const showPlus = col < 3 && row < 4

              return (
                <div
                  key={client.name}
                  className={`
                    relative group aspect-[3/2] flex items-center justify-center p-4 md:p-6 lg:p-8
                    border-r border-b border-white/10
                    transition-colors duration-500
                    ${isEven ? 'bg-white/[0.03]' : 'bg-transparent'}
                    hover:bg-white/[0.08]
                  `}
                >
                  {/* + 교차점 아이콘 (데스크탑 전용) */}
                  {showPlus && (
                    <Plus
                      className="hidden md:block absolute -right-[10px] -bottom-[10px] size-5 text-[#cc0000]/60 z-10"
                      strokeWidth={1}
                    />
                  )}

                  {/* 로고 이미지 */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-6 md:h-8 lg:h-10 w-auto max-w-[120px] md:max-w-[140px] object-contain
                               brightness-0 invert opacity-70
                               transition-all duration-500
                               group-hover:opacity-100 group-hover:scale-105
                               group-hover:drop-shadow-[0_0_8px_rgba(204,0,0,0.4)]"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
