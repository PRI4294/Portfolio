"""
Process /public/Profile.png — tight face crop + bokeh background + dark vignette
so it blends naturally with the dark portfolio theme.
"""
from PIL import Image, ImageDraw, ImageChops, ImageFilter, ImageEnhance
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC  = ROOT / "public" / "photo_src.png"
DST  = ROOT / "public" / "Profile.png"

# Output square size
SIZE = 1080

# ── Face centre in the 860×1828 source image ─────────────────────────────────
# Face confirmed in middle third (rows 609-1218), centred horizontally
FACE_X    = 430   # centre horizontally
FACE_Y    = 1000  # shifted down to include upper body
CROP_SIDE = 860   # full width — shows face + upper body to mid-torso

BOKEH_BLUR_PX = 28
BG_DARKEN     = 0.55
FACE_W_FRAC   = 0.32
FACE_H_FRAC   = 0.42
FACE_FEATHER  = 50
OUTER_W_FRAC  = 0.46
OUTER_H_FRAC  = 0.52
OUTER_FEATHER = 70
BG_EDGE       = (6,   8,  15)
BG_CENTRE     = (24, 28,  78)


def radial_gradient(size, inner_rgb, outer_rgb, gamma=1.8):
    img = Image.new("RGB", (size, size), outer_rgb)
    draw = ImageDraw.Draw(img)
    c = size // 2
    max_r = int(size * 0.62)
    for r in range(max_r, 0, -1):
        t = (1 - r / max_r) ** gamma
        col = tuple(int(outer_rgb[i] + (inner_rgb[i] - outer_rgb[i]) * t) for i in range(3))
        draw.ellipse((c - r, c - r, c + r, c + r), fill=col)
    return img.filter(ImageFilter.GaussianBlur(2))


def ellipse_mask(size, w_frac, h_frac, feather, y_offset_frac=-0.04):
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    hw = int(size * w_frac)
    hh = int(size * h_frac)
    cc = size // 2
    cy = cc + int(size * y_offset_frac)
    d.ellipse((cc - hw, cy - hh, cc + hw, cy + hh), fill=255)
    return m.filter(ImageFilter.GaussianBlur(feather))


def radial_darken(size, strength, max_r_frac=0.55, gamma=1.4):
    outer_g = int(255 * (1 - strength))
    img = Image.new("L", (size, size), outer_g)
    d = ImageDraw.Draw(img)
    c = size // 2
    max_r = int(size * max_r_frac)
    for r in range(max_r, 0, -1):
        t = (1 - r / max_r) ** gamma
        g = int(outer_g + (255 - outer_g) * t)
        d.ellipse((c - r, c - r, c + r, c + r), fill=g)
    return img.filter(ImageFilter.GaussianBlur(40)).convert("RGB")


src = Image.open(SRC).convert("RGB")
W, H = src.size
print(f"Source: {W}x{H}")

half = CROP_SIDE // 2
left = max(0, min(W - CROP_SIDE, FACE_X - half))
top  = max(0, min(H - CROP_SIDE, FACE_Y - half))
result = src.crop((left, top, left + CROP_SIDE, top + CROP_SIDE)).resize(
    (SIZE, SIZE), Image.LANCZOS
)
print(f"Cropped region: ({left},{top}) to ({left+CROP_SIDE},{top+CROP_SIDE})")

# Sharpening: unsharp mask + contrast boost
result = result.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=2))
result = ImageEnhance.Contrast(result).enhance(1.12)
result = ImageEnhance.Sharpness(result).enhance(1.4)

result.save(DST, "PNG", optimize=True)
print(f"Saved to {DST}")
