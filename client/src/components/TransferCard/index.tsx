import React from "react";
import { AssetTitle, TransferCardContainer } from "./styles";
import { DepositButtonBar } from "../DepositButtonBar";
import { AssetType } from "../../core/asset";
import { useAssets } from "../../store/wallet/hook";
import { DoubleIndicator } from "../DoubleIndicator";
import { HBar, RateTitle, VSpace } from "../../theme";
import { Web3ButtonWrapper } from "../Buttons";
import { formatBN } from "../../utils/formatter";

export interface TransferCardProps {
  asset: AssetType;
}

export function TransferCard({ asset }: TransferCardProps): React.ReactElement {
  const { name, decimals, mainBalance, l2Balance, icon } = useAssets(asset);

  const token = useAssets("token");

  const approveBar =
    asset === "token" ? (
      <HBar>
        <RateTitle>
          Approved: {formatBN(token.allowance, token.decimals)}
        </RateTitle>
      </HBar>
    ) : undefined;

  return (
    <TransferCardContainer>
      <HBar>
        <img src={icon} height={"20px"} alt={name} />
        <AssetTitle> {name}</AssetTitle>
      </HBar>
      <DoubleIndicator
        leftTitle={"Wallet"}
        leftValue={mainBalance}
        leftDecimals={decimals}
        rightTitle={"Deposited"}
        rightValue={l2Balance}
        rightDecimals={decimals}
      />
      <VSpace height={12} />
      <Web3ButtonWrapper>
        <DepositButtonBar asset={asset} />
      </Web3ButtonWrapper>
      {approveBar}
    </TransferCardContainer>
  );
}
