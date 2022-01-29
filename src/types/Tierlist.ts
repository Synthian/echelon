export default interface Tierlist {
  tiers: Tier[];
}

export interface Tier {
  label: string;
  color: string;
  items: TierItem[];
}

export interface TierItem {
  label: string;
}
