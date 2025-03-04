export enum subsType {
  free = 'free',
  premium = 'premium',
  pro = 'pro',
}

export const subsPrice = {
  [subsType.free]: 0,
  [subsType.premium]: 1000,
  [subsType.pro]: 1300,
};