import { generateMnemonic } from "bip39";
//@ts-ignore
import ethereum_hdwallet from "ethereum-hdwallet";

export const randomPrivateKeys = Array(5)
  .fill(undefined)
  .map(() => {
    const mnemonic = generateMnemonic();
    const hdwallet = ethereum_hdwallet.fromMnemonic(mnemonic);
    return {
      privateKey: hdwallet
        .derive(`m/44'/60'/0'/0/0`)
        .getPrivateKey()
        .toString("hex"),
      balance: "1000000000000000000",
    };
  });
