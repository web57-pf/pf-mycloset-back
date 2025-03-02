export enum subsType {
  free = 'Free',
  premium = 'Premium',
  pro = 'Pro',
}

export const subsPrice = {
  [subsType.free]: 0,
  [subsType.premium]: 1000,
  [subsType.pro]: 1300,
};