import StringUtil from "@devleandrodias/string-util";

const avaliableFormats = {
  "dd-mm-yyyy": "$<day>-$<month>-$<year>",
  "dd/mm/yyyy": "$<day>/$<month>/$<year>",
  "yyyy-mm-dd": "$<year>-$<month>-$<day>",
  "yyyy/mm/dd": "$$<year>/$<month>/<day>",
};

const ddmmyy = new RegExp(/(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/);
const yymmdd = new RegExp(/(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/);

const stringToDateExpressions = {
  "dd-mm-yyyy": ddmmyy,
  "dd/mm/yyyy": ddmmyy,
  "yyyy-mm-dd": yymmdd,
  "yyyy/mm/dd": yymmdd,
};

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(avaliableFormats).includes(format)) {
      return { error: `The format ${format} is not avaliable yet` };
    }

    const expression = avaliableFormats[format];
    const [result] = date.toISOString().match(yymmdd);

    return result.replace(yymmdd, expression);
  }

  static formatString(dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: "Your text is empty" };
    }

    if (!Object.keys(avaliableFormats).includes(currentFormat)) {
      return { error: `The format ${currentFormat} is not avaliable yet` };
    }

    if (!Object.keys(avaliableFormats).includes(expectedFormat)) {
      return { error: `The format ${expectedFormat} is not avaliable yet` };
    }

    const toDateExp = stringToDateExpressions[currentFormat];
    const dateStrInISO = StringUtil.removeEmptySpaces(dateStr).replace(
      toDateExp,
      "$<year>-$<month>-$<day>"
    );

    const finalDate = new Date(dateStrInISO);

    return this.formatDate(finalDate, expectedFormat);
  }
}
