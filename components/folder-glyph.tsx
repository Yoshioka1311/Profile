import { folderArtwork } from "./folder-artwork";

export function FolderGlyph({ index }: { index: 0 | 1 | 2 }) {
  const { viewBox, back, face, crease } = folderArtwork[index];

  return (
    <svg className="folder-glyph" viewBox={viewBox} aria-hidden="true" focusable="false">
      <path className="folder-sheet" d={back} vectorEffect="non-scaling-stroke" />
      <path className="folder-face" d={face} vectorEffect="non-scaling-stroke" />
      <path className="folder-crease" d={crease} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
