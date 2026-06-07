# -*- coding: utf-8 -*-
"""PASSION GROUP OG 이미지 생성 v2 — 실제 사진 배경 + 그라데이션 스크림 + 타이포.
1200x630. 브랜드 레드 액센트, malgun(Pretendard 대용) bold."""
import os
from PIL import Image, ImageDraw, ImageFont

PUB = os.path.join(os.path.dirname(__file__), "..", "public")
W, H = 1200, 630
RED = (230, 51, 41)          # #E63329 브랜드 레드
WHITE = (255, 255, 255)
MUTE = (226, 232, 240)       # #E2E8F0 서브텍스트(밝은 회색)

FB = r"C:\Windows\Fonts\malgunbd.ttf"
FR = r"C:\Windows\Fonts\malgun.ttf"


def font(p, s):
    return ImageFont.truetype(p, s)


def cover(path, tw, th, focus_y=0.5):
    """이미지를 tw x th 에 꽉 채워 cover-crop (focus_y: 세로 크롭 기준 0~1)."""
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale + 0.5), int(ih * scale + 0.5)
    im = im.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = int((nh - th) * focus_y)
    return im.crop((left, top, left + tw, top + th))


def vgrad(w, h, a_top, a_bot):
    m = Image.new("L", (1, h))
    for y in range(h):
        m.putpixel((0, y), int(a_top + (a_bot - a_top) * y / max(1, h - 1)))
    return m.resize((w, h))


def hgrad(w, h, a_left, a_right):
    m = Image.new("L", (w, 1))
    for x in range(w):
        m.putpixel((x, 0), int(a_left + (a_right - a_left) * x / max(1, w - 1)))
    return m.resize((w, h))


def scrim(img, mask, color=(8, 10, 18)):
    layer = Image.new("RGB", img.size, color)
    img.paste(Image.composite(layer, img, mask), (0, 0))


def text_shadow(d, xy, txt, fnt, fill, sh=(0, 0, 0), off=2):
    x, y = xy
    d.text((x + off, y + off), txt, font=fnt, fill=sh)
    d.text((x, y), txt, font=fnt, fill=fill)


def photo_card(out, bg, focus_y, kicker, title, subtitle):
    img = cover(bg, W, H, focus_y)
    scrim(img, hgrad(W, H, 215, 30))          # 왼쪽 진하게(텍스트 영역)
    scrim(img, Image.new("L", (W, H), 55))     # 전체 살짝
    scrim(img, vgrad(W, H, 0, 150))            # 하단 진하게
    d = ImageDraw.Draw(img)

    x = 80
    fk = font(FB, 30)
    kw = d.textlength(kicker, font=fk)
    d.rounded_rectangle([x, 86, x + kw + 44, 86 + 52], radius=26, fill=RED)
    d.text((x + 22, 86 + 9), kicker, font=fk, fill=WHITE)

    text_shadow(d, (x, 190), title, font(FB, 96), WHITE, off=3)
    fsub = font(FR, 37)
    y = 330
    for line in subtitle.split("\n"):
        text_shadow(d, (x, y), line, fsub, MUTE, off=2)
        y += 54

    text_shadow(d, (x, H - 72), "www.timeofpassion.com", font(FB, 30), WHITE, off=2)

    try:
        logo = Image.open(os.path.join(PUB, "logo_passion.png")).convert("RGBA")
        ls = 104
        logo = logo.resize((ls, ls), Image.LANCZOS)
        img.paste(logo, (W - ls - 64, 64), logo)
    except Exception as e:
        print("logo skip:", e)

    img.save(out, "JPEG", quality=88)
    print("saved", out)


def triptych(out, panels, kicker, title, subtitle):
    img = Image.new("RGB", (W, H))
    pw = W // 3
    for i, (p, fy) in enumerate(panels):
        w_i = pw if i < 2 else W - pw * 2
        panel = cover(p, w_i, H, fy)
        img.paste(panel, (i * pw, 0))
    d = ImageDraw.Draw(img)
    for i in (1, 2):
        d.rectangle([i * pw - 2, 0, i * pw + 2, H], fill=WHITE)
    scrim(img, Image.new("L", (W, H), 110))
    scrim(img, vgrad(W, H, 60, 150))
    d = ImageDraw.Draw(img)

    fk = font(FB, 30)
    kw = d.textlength(kicker, font=fk)
    cx = W // 2
    d.rounded_rectangle([cx - kw / 2 - 22, 150, cx + kw / 2 + 22, 150 + 52],
                        radius=26, fill=RED)
    d.text((cx - kw / 2, 159), kicker, font=fk, fill=WHITE)

    ft = font(FB, 100)
    tw = d.textlength(title, font=ft)
    text_shadow(d, (cx - tw / 2, 248), title, ft, WHITE, off=3)

    fsub = font(FR, 36)
    y = 388
    for line in subtitle.split("\n"):
        lw = d.textlength(line, font=fsub)
        text_shadow(d, (cx - lw / 2, y), line, fsub, MUTE, off=2)
        y += 52

    try:
        logo = Image.open(os.path.join(PUB, "logo_passion.png")).convert("RGBA")
        ls = 84
        logo = logo.resize((ls, ls), Image.LANCZOS)
        img.paste(logo, (cx - ls // 2, 44), logo)
    except Exception as e:
        print("logo skip:", e)

    img.save(out, "JPEG", quality=88)
    print("saved", out)


os.makedirs(os.path.join(PUB, "time"), exist_ok=True)
os.makedirs(os.path.join(PUB, "people"), exist_ok=True)

# 열정의시간 — 전문 회의실 사진
photo_card(
    os.path.join(PUB, "time", "og-time-v2.jpg"),
    os.path.join(PUB, "portal", "time.jpg"), 0.42,
    "열정의시간",
    "병원 마케팅 전문",
    "국내 마케팅부터 일본·중국·대만 해외환자 유치까지\n13년 노하우의 병원 전문 에이전시",
)

# 열정의사람들 — 네온 크리에이터 스튜디오(사람 중심)
photo_card(
    os.path.join(PUB, "people", "og-people-v2.jpg"),
    os.path.join(PUB, "portal", "people.jpg"), 0.45,
    "열정의사람들",
    "인플루언서 마케팅",
    "일본·중국·대만, 현지 인플루언서로 진출하다\n동아시아 시장을 여는 글로벌 마케팅",
)

# PASSION GROUP — 3브랜드 트립틱
triptych(
    os.path.join(PUB, "og-passion-v2.jpg"),
    [
        (os.path.join(PUB, "portal", "time.jpg"), 0.42),
        (os.path.join(PUB, "portal", "people.jpg"), 0.45),
        (os.path.join(PUB, "portal", "space.jpg"), 0.5),
    ],
    "PASSION GROUP",
    "열정 그룹",
    "열정의시간 · 열정의사람들 · 열정의공간\n열정으로 시간·사람·공간을 잇습니다",
)
