import { InjectionKey } from "vue";

export const applicationTitleKey = Symbol() as InjectionKey<string>;
export const authUrlKey = Symbol() as InjectionKey<string>;
export const authVersionKey = Symbol() as InjectionKey<number>;
export const environmentKey = Symbol() as InjectionKey<string>;
export const userTeamMemberNumberKey = Symbol() as InjectionKey<string>;
