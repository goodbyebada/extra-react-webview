export default function splitAgeMinMax(roleAgeString: string) {
  const [minAge, maxAge] = roleAgeString.split("~");

  return { minAge: minAge, maxAge: maxAge };
}
