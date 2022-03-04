import { TransactionResponse as BaseTransactionResponse } from "@ethersproject/providers";
import { config } from "../configs";
import { TransactionResponse } from "../types/web3";

export function makeTransactionResponse(
  input: Promise<BaseTransactionResponse>
): TransactionResponse {
  (input as TransactionResponse).wait = (confirmations) =>
    input.then((response) =>
      response.wait(confirmations ?? config.BlocksToWaitForConfirmation)
    );
  return input as TransactionResponse;
}
