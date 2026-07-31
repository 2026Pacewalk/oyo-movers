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

export const removeCountryFromAddress = (address) => {
  if (!address) return "";
  const line =
    typeof address === "string" ? address : address?.addressLine1 || address?.formatted_address || "";
  if (!line) return "";

  const countries = ["Australia", "New Zealand", "United States", "United Kingdom", "Canada"];
  let cleanedAddress = line;
  countries.forEach((country) => {
    const pattern = new RegExp(`,\\s*${country}\\s*$`, "i");
    cleanedAddress = cleanedAddress.replace(pattern, "");
  });

  return cleanedAddress;
};

export const reviewData = [
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Great experience from introduction to delivery. Extremely clear and polished communication in terms of availability to do the job, turned up on time and supportive of useful help in the move.",
    user: "Daniel Offer",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "I had an outstanding experience with Oyo Movers during my recent move! They helped me relocate my 3-bedroom home across Melbourne twice in the past year.",
    user: "Laura Cole",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "I had an outstanding experience with Oyo Movers during my recent move! They helped me relocate my 3-bedroom home across Melbourne twice in the past year.",
    user: "Ashley Choy",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review: "Very easy to deal with. The best in the business and nothing was too hard for them to move.",
    user: "Brendan Cauchi",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Used OYO Movers few times and I found them highly professional and skilful. Employees working in their team were knowledgeable and completed the jobs very efficiently...",
    user: "Erya Zhang",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Perfect service, quick, professional and polite and made the whole process easy and stress free.Would recommend highly for anyone moving.",
    user: "David Preston",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Excellent service and time management. I recommend OYO movers. They are well equipped,professionally organized and knowledgeable on moving...",
    user: "Mohammad Bashar",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "100% RECOMMENDED, such a life savior as i made the booking quite late for my moving date. the movers are so friendly, fun and they made the process stress free asw!...",
    user: "Anjanette Kimmiko",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Absolutely stess free moving with OYO Movers! I would recommend them to anyone. We didnt have to worry about anything. Our items were transported with utmost care. Thank you guys!",
    user: "Veena Prakash",
  },
  {
    logo: "google-logo.png",
    star: 5,
    review:
      "Fantastic service from Sunny and the team (AK and Mickey). Great communication, arrived on time,very profession service and a pleasure...",
    user: "Darren R",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Perfectly planned move Sonny &amp; his team followed our companies plan perfectly across 4 retail locations in Melbourne to get the job done...",
    user: "Alana Barnes",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "I had an urgent need to move my house, and despite the fact i had called up late, oyo movers responded timely and comforted me by obliging...",
    user: "Maria A",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Sunny and his team are the best you can get when it comes to moving your house with utmost care and peace of mind. We hired them and it was...",
    user: "Tanuj",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Spoke to Sunny who arranged the move quickly and very efficiently. Was always given lots of information about what they were going to do and...",
    user: "NickyB",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Top Guy for my move..... Moves! I first used for a gum tree pick up 7 years ago! I then used him three times for moving houses! This would...",
    user: "Reimana D.",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Had a good experience using their services. Except to help out if you want to hurry the process up. Recommend agreeing and locking in pricing",
    user: "Simon",
  },
  {
    logo: "womo-logo.png",
    star: 5,
    review:
      "The best Removalist’s, totally trustworthy and everything arrived in perfect condition, also great communication throughout, highly recommended",
    user: "Wendy Gray",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Great help from Sunny from OYO Movers! With short notice that Sunny could help me out and he did a feast job helping with some shop counters",
    user: "Allenn",
  },
  {
    logo: "womo-logo.png",
    star: 5,
    review:
      "I had an urgent need to move my house, and despite the fact i had called up late, oyo movers responded timely and comforted me by obliging...",
    user: "Maria A",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Sunny and his team are the best you can get when it comes to moving your house with utmost care and peace of mind. We hired them and it was...",
    user: "Tanuj",
  },
  {
    logo: "product-review-logo.png",
    star: 5,
    review:
      "Spoke to Sunny who arranged the move quickly and very efficiently. Was always given lots of information about what they were going to do and...",
    user: "NickyB",
  },
];