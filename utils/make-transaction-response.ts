import { TransactionResponse as BaseTransactionResponse } from "@ethersproject/providers";
import { config } from "../configs";
import { TransactionResponse } from "../types/web3";

export function makeTransactionResponse(
  input: Promise<BaseTransactionResponse>
): TransactionResponse {
  const res = input.then((x) => x.wait());
  (res as TransactionResponse).transactionResponse = input;
  return res as TransactionResponse;
}
