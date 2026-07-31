"use server";

import { tokenKey } from "@/config";
import { getApi } from "./api";
import { getCookie } from "./cookies";

async function callAllApis() {
  const urls = ["mover-services", "config/time-slots/active", "config/team-pricing/active"];
  const token = await getCookie(tokenKey);
  if (token) {
    urls.push("me/cards");
  }

  return Promise.all(urls.map((url) => getApi(url))).then((values) => {
    return {
      movers: values[0],
      timeslots: values[1],
      availableRequirements: values[2],
      savePaymetCards: values[3] || [],
    };
  });
}

export const getHomeData = async () => {
  try {
    const data = await callAllApis();

    return {
      movers: data.movers,
      timeslots: data.timeslots,
      availableRequirements: data.availableRequirements,
      savePaymetCards: data.savePaymetCards,
    };
  } catch (error) {
    return { movers: [], timeslots: [], availableRequirements: [], savePaymetCards: [] };
  }
};
