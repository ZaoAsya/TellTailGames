import Link from 'next/link';
import React from 'react';
import './index.css';

interface ActionProps {
  name: string;
  nextSceneId: number;
}

export const ActionComponent = ({nextSceneId, name}: ActionProps) => {
  return (
    <Link href={`/scene/${String(nextSceneId)}`}>
      <a className="action-item">{ name }</a>
    </Link>
  );
};
