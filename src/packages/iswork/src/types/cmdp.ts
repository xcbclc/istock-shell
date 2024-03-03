export type TCmdpMetaValue = string | number | boolean | undefined | null;

export type TCmdpResolveInfo = {
  subDomain: string;
  controller: string;
  method: string;
};

export type TCmdpMeta = {
  status?: string | number;
  [k: string]: TCmdpMetaValue;
} | null;

export type TCmdpPayload = Record<string, any> | TCmdpMetaValue;

export type TCmdpMessage<Payload = TCmdpPayload> = {
  address: string;
  meta?: TCmdpMeta;
  payload?: Payload;
};

export type TCmdpAddressInfo = {
  protocol?: string;
  user: string;
  domains: string[];
  port: string;
  controller: string;
  method: string;
};

export type TCmdpInfo = {
  protocol: string;
  address: string;
  meta?: TCmdpMeta;
  payload?: TCmdpPayload;
  returnMeta?: TCmdpMeta;
  returnPayload?: TCmdpPayload;
} & TCmdpAddressInfo;

export type TCmdpOptions = {
  protocol?: string;
};
