import { TransactionResponse as BaseTransactionResponse } from "@ethersproject/providers";
import { TransactionResponse } from "../types/web3";

export function makeTransactionResponse(
  input: Promise<BaseTransactionResponse>
): TransactionResponse {
  (input as TransactionResponse).wait = (confirmations) =>
    input.then((response) => response.wait(confirmations));
  return input as TransactionResponse;
}
