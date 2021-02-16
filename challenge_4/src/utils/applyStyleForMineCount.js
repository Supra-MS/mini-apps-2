export const applyStyleForMineCount = (content, style) => {
  let colors = {
    '💣': 'rgba(255, 0, 0, 0.5)',
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'rgba(234, 0, 255, 0.988)',
    5: '#fff600',
    6: 'deepskyblue',
    7: 'rgb(125, 50, 247)',
    8: '#9162ece0',
  };

  if (content === '💣') {
    style = Object.assign({}, style, { backgroundColor: colors[content] });
    return style;
  } else {
    for (let i = 1; i < 9; i++) {
      if (content === i) {
        style = Object.assign({}, style, { color: colors[content] });
        return style;
      }
    }
  }

};
