import {
  TransactionResponse as BaseTransactionResponse,
  TransactionReceipt,
} from "@ethersproject/providers";
export type Bytes32 = string;
export type Address = string;

export type TransactionResponse = Promise<TransactionReceipt> & {
  transactionResponse: Promise<BaseTransactionResponse>;
};
