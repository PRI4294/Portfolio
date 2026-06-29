"""
Process /public/profile.jpg into a clean circular portrait:

  1. Tight face-centred crop.
  2. Two layers of the same face: SHARP version + BLURRED version.
  3. Use a soft elliptical face-mask to combine them — face stays sharp,
     everything else is creamy bokeh (so the white wall is blurred into
     soft warm-grey shapes that read as "background", not as scenery).
  4. Multiply with a radial darken layer so the blurred background goes
     deep, while the face stays bright.
  5. Composite the result onto a dark violet-tinted backdrop using a
     second, larger alpha mask so the photo edges fade smoothly into the
     site's dark theme.

Run with:  python scripts/process_portrait.py
Re-run after restoring the original JPG to /public/profile.jpg first.
"""

from PIL import Image, ImageDraw, ImageChops, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC  = ROOT / "public" / "profile.jpg"
DST  = ROOT / "public" / "profile.jpg"

SIZE = 720
FACE_X, FACE_Y = 330, 790
CROP_SIDE      = 600

# Bokeh layer — how strong the background blur is.
BOKEH_BLUR_PX = 32

# Spatial vignette darkening the background.
BG_DARKEN = 0.55

# Inner face mask — face stays sharp inside this elliptical zone.
FACE_W_FRAC = 0.30
FACE_H_FRAC = 0.40
FACE_FEATHER = 55

# Outer alpha mask — photo fades into the backdrop outside this zone.
OUTER_W_FRAC = 0.45
OUTER_H_FRAC = 0.50
OUTER_FEATHER = 75

# Backdrop palette.
BG_EDGE   = (6,   8,  15)
BG_CENTRE = (24, 28,  78)


def radial_gradient(size, inner_rgb, outer_rgb, gamma=1.8):
    img = Image.new("RGB", (size, size), outer_rgb)
    draw = ImageDraw.Draw(img)
    c = size // 2
    max_r = int(size * 0.62)
    for r in range(max_r, 0, -1):
        t = (1 - r / max_r) ** gamma
        col = tuple(
            int(outer_rgb[i] + (inner_rgb[i] - outer_rgb[i]) * t)
            for i in range(3)
        )
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
    """Grayscale radial: white at centre, darker at edges. Multiply with face."""
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


# ── 1. crop ──────────────────────────────────────────────────────────────
src = Image.open(SRC).convert("RGB")
W, H = src.size
half = CROP_SIDE // 2
left = max(0, min(W - CROP_SIDE, FACE_X - half))
top  = max(0, min(H - CROP_SIDE, FACE_Y - half))
face_sharp = src.crop((left, top, left + CROP_SIDE, top + CROP_SIDE)).resize(
    (SIZE, SIZE), Image.LANCZOS
)

# ── 2. bokeh layer ───────────────────────────────────────────────────────
face_bokeh = face_sharp.filter(ImageFilter.GaussianBlur(BOKEH_BLUR_PX))

# ── 3. combine sharp face + bokeh background ────────────────────────────
face_mask = ellipse_mask(SIZE, FACE_W_FRAC, FACE_H_FRAC, FACE_FEATHER)
combined = Image.composite(face_sharp, face_bokeh, face_mask)

# ── 4. spatial darkening of the background ──────────────────────────────
darken = radial_darken(SIZE, BG_DARKEN)
combined = ImageChops.multiply(combined, darken)

# ── 5. composite onto backdrop using a softer, larger outer mask ────────
backdrop = radial_gradient(SIZE, BG_CENTRE, BG_EDGE)
outer = ellipse_mask(SIZE, OUTER_W_FRAC, OUTER_H_FRAC, OUTER_FEATHER)
result = Image.composite(combined, backdrop, outer)

result.save(DST, "JPEG", quality=92, optimize=True)
print("wrote", DST, f"({SIZE}x{SIZE})")
