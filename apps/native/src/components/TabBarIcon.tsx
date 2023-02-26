import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export default function TabBarIcon(props: {
  name: ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}
