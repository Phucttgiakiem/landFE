
export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false
    }
    return true
}
export const formatDateVN = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });
};
export const formatPrice = (price) => {
  return Number(price).toLocaleString("vi-VN") + " VND";
};
export const formatPriceToString = (price) => {
  price = Number.isNaN(price) !== "number" ?  Number(price) : price;
  if (price >= 1000000000) {
    return (price / 1000000000) + " tỷ";
  } else if (price >= 1000000) {
    return (price / 1000000) + " triệu";
  }
  return price.toString();
};
export const buildMap = (communes) => {
  let communeMap = {};

  communes.forEach((item) => {
    communeMap[`${item.provinceCode}_${item.code}`] = item;
  });
  return communeMap;
};
export const formatNumberaddZero = (num) => {
        num = Number(num);
        if(num < 10) return `0${num}`;
        return `${num}`;
}
export const formatNumberCodeCommuneZero = (num) => String(num).padStart(5, "0");
export const formatArea = (communeMap, province, ward) => {
  const area = communeMap[`${province}_${ward}`];
  if (!area) return "";
  
  const provinceName = area
    ? area.provinceName.replace("Thành phố ", "").replace("Tỉnh ", "")
    : "";

  const wardName = area
    ? area.name.replace("Phường ", "").replace("Xã ", "")
    : "";
  return `${wardName} / ${provinceName}`;
}
export const formatDate = (DateInput) => {
  if (!DateInput) return "";
  const now = new Date();
  const date = new Date(DateInput);
  const diffMs = now - date;
  // if time is future, return "upcoming"
  if(diffMs < 0) return "sắp tới";
  
  const seconds = Math.floor(diffMs / 1000);
  if(seconds < 60) return "vừa xong";
  const minutes = Math.floor(seconds / 60);
  if(minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if(hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if(days < 7) return `${days} ngày trước`;
  const weeks = Math.floor(days / 7);
  if(weeks < 4) return `${weeks} tuần trước`;
  const months = Math.floor(days / 30);
  if(months < 12) return `${months} tháng trước`;
  const years = Math.floor(months / 12);
  return `${years} năm trước`;
}
export const formatacreage = (horizontal, vertical) => {
  
  const horizontalNum = Number(horizontal);
  const verticalNum = Number(vertical); 
  if (isNaN(horizontalNum) || isNaN(verticalNum)) {
    return "N/A";
  }
  return horizontalNum * verticalNum;
}
// utils/query.js
export const getNumber = (val) => {
    return val != null ? Number(val) : null;
};

export const parseQuery = (search) => {
    const params = new URLSearchParams(search);

    return {
        type: params.get("type") || "sell",

        priceMin: getNumber(params.get("priceMin")),
        priceMax: getNumber(params.get("priceMax")),

        areaMin: getNumber(params.get("areaMin")),
        areaMax: getNumber(params.get("areaMax")),
    };
};
export const toSlug = (str) => {
  return str
    .normalize("NFD")                 // tách dấu
    .replace(/[\u0300-\u036f]/g, "")  // xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")             // space -> -
    .replace(/[^a-z0-9-]/g, "");      // bỏ ký tự lạ
}