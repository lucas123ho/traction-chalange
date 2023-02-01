import { Avatar, AvatarProps } from 'antd';
import { useMemo } from 'react';

import theme from 'styles/theme';

import { getFirstLetters } from 'utils/formatter';

interface Props extends AvatarProps {
  name?: string;
}

export default function CustomAvatar({ name, ...props }: Props) {
  const firstLetters = useMemo(() => {
    if (!name) {
      return;
    }

    const firstLettersAsArray = getFirstLetters(name);
    const firstLettersUpperCase = firstLettersAsArray.map((letter) =>
      letter.toUpperCase()
    );

    return firstLettersUpperCase.slice(0, 2).join('');
  }, [name]);

  return (
    <Avatar style={{ backgroundColor: theme.highlight }} {...props}>
      {!props.src && firstLetters}
    </Avatar>
  );
}
