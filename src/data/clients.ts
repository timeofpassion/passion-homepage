// 그룹 공용 클라이언트 로고 목록 (단일 소스)
// 열정의시간(ClientsSection) + 열정의사람들(/people) 마키가 함께 사용한다.
// 클라이언트 추가/수정은 여기 한 곳만 고치면 양쪽에 반영된다.

export type ClientLogo = { name: string; logo: string };

export const clientLogos: ClientLogo[] = [
  { name: "MELLOW", logo: "/clients/logo_mellow.png" },
  { name: "오야로피부과", logo: "/clients/logo_oaro.png" },
  { name: "오체안피부과", logo: "/clients/logo_ozhean.png" },
  { name: "순수안 피부과", logo: "/clients/logo_soosoan.png" },
  { name: "별성형외과의원", logo: "/clients/logo_star.png" },
  { name: "타임리턴의원", logo: "/clients/logo_timereturn.png" },
  { name: "Beautique Clinic", logo: "/clients/logo_lefilleo.png" },
  { name: "OLARA CLINIC", logo: "/clients/logo_olara.png" },
  { name: "Genabelle", logo: "/clients/logo_henabelle.png" },
  { name: "오늘우리학교는", logo: "/clients/logo_school.png" },
  { name: "르웰의원", logo: "/clients/logo_lewell.png" },
  { name: "신통정형외과", logo: "/clients/logo_sintong.png" },
  { name: "이현한방병원", logo: "/clients/logo_ehyun.png" },
  { name: "군포시", logo: "/clients/logo_gunpo.png" },
  { name: "한세대학교", logo: "/clients/logo_hansei.png" },
  { name: "캡틴 법률사무소", logo: "/clients/logo_captain.png" },
  { name: "RE&WELL", logo: "/clients/logo_rewell.png" },
  { name: "메디힘", logo: "/clients/logo_medihim.png" },
  { name: "Babitalk", logo: "/clients/logo_babitalk.png" },
  { name: "SMPS", logo: "/clients/logo_smps.png" },
  { name: "글로리의원", logo: "/clients/logo_glory.png" },
  { name: "더리즈의원", logo: "/clients/logo_theliz.png" },
  { name: "랩인큐브", logo: "/clients/logo_labincube.png" },
  { name: "이안한방병원", logo: "/clients/logo_eahn.png" },
];
