export default function splitAgeMinMax(roleAgeString: string) {
  const list = roleAgeString.split("~");
  const result = list
    .map(function (x) {
      return parseInt(x, 10);
    })
    .sort();

  return { minAge: result[0], maxAge: result[1] };
}
