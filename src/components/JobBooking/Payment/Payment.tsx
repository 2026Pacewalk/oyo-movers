import { getApi } from "@/lib/api";
import AppInitializer from "../JobInitializer";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import Payment from "@/components/Payment";

const PaymentPage = async () => {
  const token = await getCookie(tokenKey);

  let paymentCards: any = [];
  if (token) {
    // paymentCards = await getApi("me/cards");
  }
  return (
    <AppInitializer savePaymetCards={paymentCards}>
      <Payment paymentCards={paymentCards} />
    </AppInitializer>
  );
};

export default PaymentPage;
