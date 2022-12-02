import { deepStrictEqual } from "assert";

import DateUtil from "./index.js";

// formatDate

{
  const format = "dd-M-Y";
  const expected = { error: `The format ${format} is not avaliable yet` };
  const date = new Date(1990, 2, 1);
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "01-12-1990";
  const format = "dd-mm-yyyy";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "25/12/2001";
  const format = "dd/mm/yyyy";
  const date = new Date("2001-12-25");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "1985-07-15";
  const format = "yyyy-mm-dd";
  const date = new Date("1985-07-15");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

// formatString

{
  const date = "";
  const expected = { error: "Your text is empty" };
  const result = DateUtil.formatString(date);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-april-01",
    format: "yyyy-M-dd",
  };

  const expected = { error: `The format ${data.format} is not avaliable yet` };
  const result = DateUtil.formatString(data.value, data.format);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };

  const expectedFormat = "dd/M/yyyy";
  const expected = {
    error: `The format ${expectedFormat} is not avaliable yet`,
  };
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };

  const expectedFormat = "yyyy-mm-dd";
  const expected = "1990-01-01";
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };

  const expectedFormat = "dd-mm-yyyy";
  const expected = "01-01-1990";
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: " 1 9 90 /0 7 /0 1  ",
    format: "yyyy/mm/dd",
  };

  const expectedFormat = "dd/mm/yyyy";
  const expected = "01/07/1990";
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: " 1990/07/01",
    format: "yyyy/mm/dd",
  };

  const expectedFormat = "yyyy-mm-dd";
  const expected = "1990-07-01";
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "01/07/1990",
    format: "dd/mm/yyyy",
  };

  const expectedFormat = "yyyy-mm-dd";
  const expected = "1990-07-01";
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
