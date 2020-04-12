import * as dynamoDBService from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function count(event, context) {
	const params = {
		TableName: process.env.TABLE_NAME,
	};

	try {
		const result = await dynamoDBService.client("describeTable", params);

		if (result.Table.ItemCount) {
			return success(result.Table.ItemCount);
		} else {
			return failure({ status: false, error: "Table not found" });
		}
	} catch (e) {
		return failure({ status: false, error });
	}
}
