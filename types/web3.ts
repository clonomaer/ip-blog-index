import { TransactionResponse as BaseTransactionResponse } from "@ethersproject/providers";
export type Bytes32 = string;
export type Address = string;

export type TransactionResponse = Promise<BaseTransactionResponse> & {
  wait: BaseTransactionResponse["wait"];
};
