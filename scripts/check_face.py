"""Save small preview tiles to find face position."""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = Image.open(ROOT / "public" / "photo_src.png").convert("RGB")
W, H = src.size
print(f"Source: {W}x{H}")

# Save top-third, mid-third, bottom-third strips as small previews
for label, top, bot in [("top", 0, H//3), ("mid", H//3, 2*H//3), ("bot", 2*H//3, H)]:
    strip = src.crop((0, top, W, bot)).resize((200, 200))
    out = ROOT / "scripts" / f"preview_{label}.jpg"
    strip.save(out, "JPEG", quality=80)
    print(f"Saved preview_{label}.jpg (rows {top}-{bot})")
