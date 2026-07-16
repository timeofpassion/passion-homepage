// 그룹 공용 클라이언트 로고 목록 (단일 소스)
// 열정의시간(ClientsSection) + 열정의사람들(/people)이 함께 사용한다.
// 클라이언트 추가/수정은 여기 한 곳만 고치면 양쪽에 반영된다(미러링).
// medical: true = 병원·의원 등 의료기관. 열정의시간(/time)은 의료만 노출, 열정의사람들(/people)은 전체 노출.

export type ClientLogo = { name: string; logo: string; medical?: boolean };

export const clientLogos: ClientLogo[] = [
  { name: "MELLOW", logo: "/clients/logo_mellow.png", medical: true },
  { name: "오벨피부과 AUVEL", logo: "/clients/logo_auvel.png", medical: true },
  { name: "오아로피부과", logo: "/clients/logo_oaro.png", medical: true },
  { name: "오체안피부과", logo: "/clients/logo_ozhean.png", medical: true },
  { name: "순수안 피부과", logo: "/clients/logo_soosoan.png", medical: true },
  { name: "별성형외과의원", logo: "/clients/logo_star.png", medical: true },
  { name: "타임리턴의원", logo: "/clients/logo_timereturn.png", medical: true },
  { name: "Beautique Clinic", logo: "/clients/logo_lefilleo.png", medical: true },
  { name: "OLARA CLINIC", logo: "/clients/logo_olara.png", medical: true },
  { name: "Genabelle", logo: "/clients/logo_henabelle.png", medical: true },
  { name: "오늘우리학교는", logo: "/clients/logo_school.png" },
  { name: "르웰의원", logo: "/clients/logo_lewell.png", medical: true },
  { name: "신통정형외과", logo: "/clients/logo_sintong.png", medical: true },
  { name: "이현한방병원", logo: "/clients/logo_ehyun.png", medical: true },
  { name: "군포시", logo: "/clients/logo_gunpo.png" },
  { name: "한세대학교", logo: "/clients/logo_hansei.png" },
  { name: "캡틴 법률사무소", logo: "/clients/logo_captain.png" },
  { name: "RE&WELL", logo: "/clients/logo_rewell.png", medical: true },
  { name: "메디힘", logo: "/clients/logo_medihim.png", medical: true },
  { name: "Babitalk", logo: "/clients/logo_babitalk.png", medical: true },
  { name: "SMPS", logo: "/clients/logo_smps.png", medical: true },
  { name: "글로리의원", logo: "/clients/logo_glory.png", medical: true },
  { name: "더리즈의원", logo: "/clients/logo_theliz.png", medical: true },
  { name: "랩인큐브", logo: "/clients/logo_labincube.png", medical: true },
  { name: "이안한방병원", logo: "/clients/logo_eahn.png", medical: true },
  { name: "커피스미스", logo: "/clients/logo_coffeesmith.png" },
  { name: "제주본가", logo: "/clients/logo_jejubonga.png" },
  { name: "세민성형외과", logo: "/clients/logo_semin.png", medical: true },
  { name: "아이니크성형외과", logo: "/clients/logo_inik.png", medical: true },
  { name: "글로비성형외과", logo: "/clients/logo_globi.png", medical: true },
  { name: "르무이헤어룸", logo: "/clients/logo_lemui.png" },
  { name: "팔당불오징어", logo: "/clients/logo_paldang.png" },
];
