# -*- coding: utf-8 -*-
"""PASSION GROUP OG 이미지 생성 (1200x630). 브랜드 컬러·Pretendard 대용 malgun."""
import os
from PIL import Image, ImageDraw, ImageFont

PUB = os.path.join(os.path.dirname(__file__), "..", "public")
RED = (230, 51, 41)        # #E63329 브랜드 레드
WARM = (255, 249, 248)     # #fff9f8 웜 화이트
DARK = (15, 23, 42)        # #0f172a 텍스트
SUB = (71, 85, 105)        # #475569 서브텍스트
W, H = 1200, 630

FB = r"C:\Windows\Fonts\malgunbd.ttf"   # bold
FR = r"C:\Windows\Fonts\malgun.ttf"     # regular


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_card(out, kicker, title, subtitle, accent=RED):
    img = Image.new("RGB", (W, H), WARM)
    d = ImageDraw.Draw(img)

    # 좌측 레드 액센트 바
    d.rectangle([0, 0, 16, H], fill=accent)

    # 로고 (우상단)
    try:
        logo = Image.open(os.path.join(PUB, "logo_passion.png")).convert("RGBA")
        ls = 110
        logo = logo.resize((ls, ls))
        img.paste(logo, (W - ls - 64, 56), logo)
    except Exception as e:
        print("logo skip:", e)

    x = 80
    # kicker (상단 작은 라벨)
    d.text((x, 96), kicker, font=font(FB, 30), fill=accent)
    # 메인 타이틀
    d.text((x, 200), title, font=font(FB, 92), fill=DARK)
    # 서브타이틀 (줄바꿈 지원)
    fsub = font(FR, 38)
    y = 330
    for line in subtitle.split("\n"):
        d.text((x, y), line, font=fsub, fill=SUB)
        y += 56

    # 하단 도메인
    d.text((x, H - 70), "www.timeofpassion.com", font=font(FB, 30), fill=accent)

    img.save(out, "JPEG", quality=90)
    print("saved", out)


os.makedirs(os.path.join(PUB, "time"), exist_ok=True)
os.makedirs(os.path.join(PUB, "people"), exist_ok=True)

draw_card(
    os.path.join(PUB, "og-passion.jpg"),
    "PASSION GROUP",
    "열정 그룹",
    "열정의시간 · 열정의사람들 · 열정의공간\n열정으로 시간·사람·공간을 잇습니다.",
)
draw_card(
    os.path.join(PUB, "time", "og-time.jpg"),
    "열정의시간",
    "병원 마케팅 전문",
    "국내 마케팅부터 일본·중국·대만 해외환자 유치까지\n13년 노하우의 병원 전문 에이전시",
)
draw_card(
    os.path.join(PUB, "people", "og-people.jpg"),
    "열정의사람들",
    "인플루언서 마케팅",
    "일본·중국·대만, 현지 인플루언서로 진출하다\n동아시아 시장 진출 글로벌 마케팅",
)
