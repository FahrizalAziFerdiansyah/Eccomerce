export const getCity = (data, id) => {
  let tmp = data.find(({city_id}) => city_id == id);
  return tmp.city_name;
};
export const getProvince = (data, id) => {
  let tmp = data.find(({province_id}) => province_id == id);
  return tmp.province;
};
