import theme from 'styles/theme';

export function getColorByHealthscore(healthscore: number): string {
  let color = theme.primary;

  if (healthscore <= 70) {
    color = theme.red;
  } else if (healthscore > 70 && healthscore <= 85) {
    color = theme.orange;
  } else if (healthscore > 85) {
    color = theme.green;
  }

  return color;
}
