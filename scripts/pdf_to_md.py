"""Convert official ZOBS PDF to clean Markdown (frozen source of truth)."""
import pymupdf
import re
from pathlib import Path

SRC = Path("docs/source/zobs-2024.pdf")
OUT_DIR = Path("docs")
OUT_DIR.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(SRC)
lines_out = []
lines_out.append("# Zakon o osnovama sigurnosti saobracaja na putevima u BiH")
lines_out.append("")
lines_out.append("> Source: Parlamentarna skupstina BiH, lawId=1218, Nesluzbeni precisceni tekst novembar 2024.")
lines_out.append("> Download: https://www.parlament.ba/law/DownloadDocument?lawDocumentId=1ec38890-c533-446f-868b-d629bbde3d22&langTag=bs")
lines_out.append("> This MD is a frozen extraction for app use. Legally binding text is Sluzbeni glasnik BiH.")
lines_out.append("")

for i, page in enumerate(doc):
    text = page.get_text()
    # normalize whitespace, keep structure
    text = text.replace("\r", "")
    # add page marker
    lines_out.append(f"\n<!-- p. {i+1} -->\n")
    lines_out.append(text.strip())
    lines_out.append("")

full = "\n".join(lines_out)
# basic cleanup: collapse 3+ newlines
full = re.sub(r"\n{3,}", "\n\n", full)

(OUT_DIR / "zobs-2024.md").write_text(full, encoding="utf-8")
print(f"Wrote docs/zobs-2024.md chars={len(full)}")

# Split: penalties start at first KAZNENE ODREDBE heading
upper = full.upper()
idx = upper.find("XI - KAZNENE ODREDBE")
if idx == -1:
    idx = upper.find("KAZNENE ODREDBE")
print("split index:", idx)
if idx > 0:
    (OUT_DIR / "zobs-2024-01-pravila.md").write_text(full[:idx], encoding="utf-8")
    (OUT_DIR / "zobs-2024-02-kaznene.md").write_text(full[idx:], encoding="utf-8")
    print("Wrote split files")
