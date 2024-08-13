export const keyValueAdapter = (array: any[] | undefined | null, labelProp: string, valueProp: string) => {
  if (!array) return [{ label: "", value: "" }];
  try {
    return array.map(item => {
      return {
        label: item[labelProp],
        value: item[valueProp],
      };
    });
  } catch (error) {
    return [{ label: "", value: "" }];
  }
};
