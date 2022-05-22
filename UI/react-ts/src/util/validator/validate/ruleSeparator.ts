interface ruleObject {
  type?: string;
  min?: number;
  max?: number;
  reference?: string;
}
/**
 *
 * @param rule long line describing the rule associated to the property
 * @returns separatorObject
 */
export default function separator(rule: string) {
  let result: ruleObject = {};
  if (!rule || !rule.includes("[")) {
    result.type = rule.toLowerCase().replace(/[^a-z]/g, "");
    return result;
  }
  rule = rule.replace(/\s/g, "");
  let type = rule
    .slice(0, rule.indexOf("["))
    .replace(/[^a-z]/g, "")
    .trim();
  result.type = type;
  rule = rule.slice(rule.indexOf("[")).trim();
  const regex = /\[(\d*\:*\d*)\]/;
  if (rule && regex.test(rule)) {
    if (rule.includes(":")) {
      let [min, max] = rule
        .replace(/[\[\]\:]/g, " ")
        .trim()
        .split(" ")
        .map((element) => parseInt(element));
      if (max < min) {
        let temp = max;
        max = min;
        min = temp;
      }
      if (max) {
        result.min = min;
        result.max = max;
      } else {
        result.max = min;
      }

      return result;
    }
    let min = rule.replace(/[\[\]\:]/g, " ").trim();
    result.min = parseInt(min);
    return result;
  } else if (rule && /\[(\w*)\]/.test(rule)) {
    let reference = rule.replace(/[\[\]]/g, " ").trim();
    result.reference = reference;
  }
  return result;
}

