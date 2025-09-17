import { ApiKeys } from "./api-keys"

export class Subscription {


	remainingRequests = "0"

	lastSevenDaysRequests = "0"

	todayRequests = "0"

	lifeTimeRequests="0";

	enabledEndpoints="0";

	apiKeys: ApiKeys[] = [];

}
