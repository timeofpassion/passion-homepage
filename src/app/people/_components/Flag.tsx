import { type Country, COUNTRY_FLAG_SRC, COUNTRY_LABEL } from "../_data/sample";

// 국기 SVG(이모지 깨짐 방지). size 는 px.
export default function Flag({
  country,
  size = 22,
  className,
}: {
  country: Country;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={COUNTRY_FLAG_SRC[country]}
      alt={COUNTRY_LABEL[country]}
      width={size}
      height={Math.round((size * 2) / 3)}
      className={className}
      loading="lazy"
    />
  );
}
