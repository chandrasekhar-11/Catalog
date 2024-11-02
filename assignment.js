fetch("values.json")
  .then((response) => response.json())
  .then((data) => main(data))
  .catch((error) => console.error("Error fetching the JSON:", error));


function decodeValue(base, value) {
  return parseInt(value, base);
}


function parseInput(data_V) {
  const data = data_V;
  const keys = data.keys;
  const r = keys.r;
  const t = keys.t;
  const points = [];

  for (const key in data) {
    if (key !== "keys") {
      const a = parseInt(key); 
      const b = decodeValue(parseInt(data[key].base), data[key].value); 
      points.push({ a, b });
    }
  }

  return { r, t, points };
}


function lagrangeInterpolation(points, t) {
  let polynomial = 0;

  
  for (let i = 0; i < t; i++) {
    const ai = points[i].x;
    const bi = points[i].y;
    let term = bi;

    for (let j = 0; j < t; j++) {
      if (i !== j) {
        const aj = points[j].a;
        term *= (0 - aj) / (ai - aj); 
      }
    }

    polynomial += term;
  }

  return polynomial;
}


function main(data) {
  const { r, t, points } = parseInput(data);
  const secret = lagrangeInterpolation(points, t);
  console.log("Secret (constant term c):", secret);
}
