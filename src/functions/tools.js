module.exports = {
  lvl: function (exp) {
    return Math.floor(Math.sqrt(exp) / 5);
  },
  expThreshold: function (lvl) {
    return Math.floor(lvl * lvl * 25);
  },
  randomExp: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  roundRect: function (ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    return ctx;
  },
};
