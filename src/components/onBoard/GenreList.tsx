'use client';
import { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}
export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  /*장르 더미데이터 불러오기  */
  useEffect(() => {
    fetch('/data/genres.json')
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);
  /*장르 선택 함수  */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  return (
    <div className="flex flex-wrap gap-4">
      {genres.map((genre) => {
        const isSelected = selectedIds.includes(genre.id);
        return (
          <span
            key={genre.id}
            className={`border rounded-sm px-3 py-2 cursor-pointer ${
              isSelected
                ? 'border-red bg-main-red text-white custom-box-shadow'
                : 'border-gray-700 bg-gray-900 text-gray-300'
            }`}
            onClick={() => {
              toggleSelect(genre.id);
            }}
          >
            {genre.name}
          </span>
        );
      })}
    </div>
  );
}
