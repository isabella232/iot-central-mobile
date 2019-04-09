import { Subscription } from "@unimodules/core";

export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export interface Sensors {
  subscriptions: Subscription[];
}

export interface SubscribeAction {
  type: typeof SUBSCRIBE;
  subscription: Subscription;
}

export interface UnsubscribeAction {
  type: typeof UNSUBSCRIBE;
}

export type SensorActions = SubscribeAction | UnsubscribeAction;
