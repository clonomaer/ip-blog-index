import { Contract, ethers, Signer } from "ethers";
import { Address, TransactionResponse } from "../types/web3";
import { Provider } from "@ethersproject/providers";
import { makeTransactionResponse } from "../utils/make-transaction-response";
import { formatBytes32String } from "ethers/lib/utils";

export class Content {
  constructor(public publishedOn: Date, public author: Address) {}
}

export class IPBlogV1 {
  constructor(
    public contract: Contract,
    public signer: string | Signer | Provider
  ) {}
  async detailsOf(cid: string): Promise<Content> {
    const res = await this.contract
      .connect(this.signer)
      .detailsOf(
        ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(["string"], [cid])
        )
      );
    return new Content(
      new Date(Number(res.publishedOn.toString())),
      res.author
    );
  }
  publish(cid: string): TransactionResponse {
    return makeTransactionResponse(
      this.contract.connect(this.signer).publish(cid)
    );
  }
  getAllAuthors(): Promise<string[]> {
    return this.contract.connect(this.signer).getAllAuthors();
  }
  async getAllContents(): Promise<string[]> {
    return await this.contract.connect(this.signer).getAllContents();
  }
}
