export default function(geom, outline, stroke, color) {
  function process(geom, outline, stroke, color) {
    let clone;
    if (Array.isArray(geom)) {
      clone = [];
      for (let i in geom) {
        clone.push(process(geom[i], outline, stroke, color));
      }
    } else {
      clone = {};
      for (let key in geom) {
        if (["fill", "fillopacity"].indexOf(key) == -1) {
          clone[key] = geom[key];
        }
      }
      if (
        geom.type == "translate" ||
        geom.type == "rotate" ||
        geom.type == "scale"
      ) {
        clone.draw = [];
        for (let draw in geom.draw) {
          clone.draw.push(process(geom.draw[draw], outline, stroke, color));
        }
      } else {
        clone.strokewidth =
          clone.stroke !== false
            ? Number(clone.strokewidth || stroke) + 2 * outline
            : 2 * outline;
        clone.stroke = color;
        clone.fill = false;
        clone.linecap = "round";
      }
    }
    return clone;
  }
  return process(geom, outline, stroke, color);
}
