import StringUtil from "@devleandrodias/string-util";

const avaliableFormats = {
  "dd-mm-yyyy": "$<day>-$<month>-$<year>",
  "yyyy-mm-dd": "$<year>-$<month>-$<day>",
  "dd/mm/yyyy": "$<day>/$<month>/$<year>",
};

const yymmdddd = new RegExp(/(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/);

const stringToDateExpressions = {};

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(avaliableFormats).includes(format)) {
      return { error: `The format ${format} is not avaliable yet` };
    }

    const expression = avaliableFormats[format];
    const [result] = date.toISOString().match(yymmdddd);

    return result.replace(yymmdddd, expression);
  }

  static formatString(date, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(date)) {
      return { error: "Your text is empty" };
    }

    if (!Object.keys(avaliableFormats).includes(currentFormat)) {
      return { error: `The format ${currentFormat} is not avaliable yet` };
    }

    if (!Object.keys(avaliableFormats).includes(expectedFormat)) {
      return { error: `The format ${expectedFormat} is not avaliable yet` };
    }
  }
}
