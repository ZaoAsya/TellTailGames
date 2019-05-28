import Link from 'next/link';
import React from 'react';
import './index.css';

interface TagProps {
  nameRu: string;
  nameEn: string;
}

export const TagComponent = ({nameRu, nameEn}: TagProps) => {
  return (
    <Link href={`/${nameEn}`}>
      <a className="button-grey tag">#{ nameRu }</a>
    </Link>
  );
};
