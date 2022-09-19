export const COLOR_WHITE = "#FFFFFF";
export const COLOR_BLACK = "#000000";
export const COLOR_PRIMARY = "rgb(255, 99, 0)";
export const COLOR_PRIMARY_OPACITY_SMALL = "rgba(255, 99, 0, 0.25)";
export const COLOR_PRIMARY_LIGHT = "rgb(239, 156, 104)";
export const COLOR_PRIMARY_DARK = "rgb(163, 84, 34)";
export const COLOR_DARK = "rgb(69, 71, 70)";

export const SUCCESS = "success";
export const INFO = "info";
export const WARNING = "warning";
export const ERROR = "error";
export const STRING = "string";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const USER_TYPE = "USER_TYPE";
export const INDIVIDUAL = "individual";
export const COMPANY = "company";

export const REGEX_NUMBER_VALID = /^[0-9]*\.?[0-9]*$/;
export const PRE_THUMBNAIL = "/assets/images/invest-card-sample-thumbnail.png";

export const ID_OF_STATUS_APPROVED = 3;
export const ID_OF_STATUS_COMPLETED = 5;
export const ID_OF_STATUS_CLOSED = 6;
export const VALUE_OF_VERIFIED = 1;
export const VALUE_OF_UNVERIFIED = 0;
export const VALUE_OF_PAID = 1;
export const VALUE_OF_NOT_PAID = 0;

/**
 * TOKEN_CURRENCY = 1.2; $1 = 1.2KLASMA; token_amount = price * TOKEN_CURRENCY
 */
export const TOKEN_CURRENCY = 1;

export const INIT_REMAINED_M_SECONDS = 1000;

export const URL_OF_BRIDGE = "https://bridge.walletconnect.org";

// For test
export const URL_OF_RPC = "https://ropsten.infura.io/v3";
export const CHAIN_ID_HEX = "0x3";
export const CHAIN_ID_DECIMAL = 3;
export const COIN_SYMBOL = "RopstenETH";
export const CHAIN_LABEL = "Ropsten Test Network";

export const TOKEN_SYMBOL = "KLASMA";
export const TOKEN_DECIMAL = 18;

// //  For real
// export const URL_OF_RPC = "https://mainnet.infura.io/v3";
// export const CHAIN_ID_HEX = "0x38";
// export const CHAIN_ID_DECIMAL = 56;
// export const COIN_SYMBOL = "BNB";
// export const CHAIN_LABEL = "Binance Smart Chain";

export const ADMIN_WALLET_ADDRESS =
  "0x51d2c6db60b43B17b1E51224BB7433d74b7B6838";
export const CONTRACT_ADDRESS_OF_TOKEN =
  "0x7522C29f19C7dd26e7d74a2fd6B8740E10f9bA9c";
export const CONTRACT_ABI_OF_TOKEN = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minTokensBeforeSwap",
        type: "uint256"
      }
    ],
    name: "MinTokensBeforeSwapUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensSwapped",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethReceived",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensIntoLiqudity",
        type: "uint256"
      }
    ],
    name: "SwapAndLiquify",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "enabled", type: "bool" }
    ],
    name: "SwapAndLiquifyEnabledUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "_burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "_liquidityFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "_maxTxAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "_mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "geUnlockTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromFee",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isLiquidityPool",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "time", type: "uint256" }],
    name: "lock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "enabled", type: "bool" }],
    name: "setIsLiquidityPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "_enabled", type: "bool" }],
    name: "setSwapAndLiquifyEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_time", type: "uint256" }],
    name: "setTimeToSell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "swapAndLiquifyEnabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "timeToSell",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router02", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

export const MESSAGE_SIGNUP_SUCCESS = "You've been signed up successfully.";
export const MESSAGE_FILE_UPLOAD_FAILED = "File uploading has been failed.";
export const MESSAGE_FILE_UPLOAD_SUCCESS = "Success! Files have been uploaded.";
export const MESSAGE_CAMPAIGN_CREATE_SUCCESS =
  "New campaign has been created successfully.";
export const MESSAGE_CAMPAIGN_UPDATE_SUCCESS =
  "Campaign has been updated successfully.";
export const MESSAGE_INVESTED_SUCCESS = `You've invested successfully. Please check your wallet. Please import our token(${CONTRACT_ADDRESS_OF_TOKEN}) on ${CHAIN_LABEL}. You can see our ${TOKEN_SYMBOL} token.`;
export const MESSAGE_INVESTMENT_FAILED =
  "Your investment has been failed. Please try again in a few minute.";
export const MESSAGE_CANT_SET_FAVORITE =
  "You can't set favorite to the post you created.";
export const MESSAGE_COMMENT_UPDATE_SUCCESS = "The comment has been updated.";
export const MESSAGE_COMMENT_CREATE_SUCCESS = "New comment has been created.";
export const MESSAGE_PROFILE_UPDATE_SUCCESS = "Your profile has been updated.";
export const MESSAGE_PASSWORD_UPDATE_SUCCESS =
  "Your password has been updated.";
export const MESSAGE_EMAIL_VERIFY_REQUIRED =
  "Please verify your email to invest.";
export const MESSAGE_WALLET_ADDRESS_SAVED =
  "Your wallet address has been saved.";
export const MESSAGE_INVESTED_BUT_NOT_TOKEN_RECEIVED = `You've invested but you didn't receive our ${TOKEN_SYMBOL} token yet. No worries. You are booked. We will send you it as soon as the problem is fixed on our side.`;
