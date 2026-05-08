/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = (Icons as any)[name] as React.FC<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
};
