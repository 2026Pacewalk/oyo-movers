export const serialize = (params) => {
  if (params) {
    const queryObj = {};
    // ? Removing Empry Values
    Object.keys(params).map((key) => {
      if (params[key]) {
        queryObj[key] = params[key];
      }
    });

    if (Object.keys(queryObj).length) {
      return (
        "?" +
        Object.keys(queryObj)
          .map((key) => key + "=" + params[key])
          .join("&")
      );
    } else {
      return "";
    }
  } else {
    return "";
  }
};

export const priceToDollar = (price) => {
  return `$${price.toFixed(2)}`;
};

// export const phoneNumberRegex = /^0\d{9}$/;
export const phoneNumberRegex = /^(?:\+?61[-\s]?|0)4\d(?:[-\s]?\d){7}$/;

export const adressLevels = ["ground", "lift", "stairs"];

export const makeId = (length = 5) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const recomandedHouseMoving = {
  "Studio Apartment": {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "2 Men & Medium Truck.",
  },
  "1 Bedroom": {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "2 Men & Medium Truck.",
  },
  ["2 Bedroom"]: {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "3 Men & 2 Trucks.",
  },
  ["3 Bedroom"]: {
    ["Lightly"]: "2 Men & Medium Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "3 Men & 2 Trucks.",
  },
  ["4+ Bedroom"]: {
    ["Lightly"]: "2 Men & Medium Truck.",
    ["Moderately"]: "3 Men & 2 Trucks.",
    ["Heavily"]: "3 Men & 2 Trucks.",
  },
};
export const recomandedOfficeMoving = {
  "Small Office": {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "2 Men & Medium Truck.",
  },
  "Medium Office": {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "2 Men & Medium Truck.",
  },
  ["Large Workplace"]: {
    ["Lightly"]: "2 Men & Small Truck.",
    ["Moderately"]: "2 Men & Medium Truck.",
    ["Heavily"]: "3 Men & 2 Trucks.",
  },
};
