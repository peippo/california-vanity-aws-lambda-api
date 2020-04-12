import * as dynamoDBService from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function single(event, context) {
	console.log(event.pathParameters.id);
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { id: parseInt(event.pathParameters.id) },
	};

	try {
		const result = await dynamoDBService.documentClient("get", params);

		if (result.Item) {
			return success(result.Item);
		} else {
			return failure({ status: false, error: "Plate not found" });
		}
	} catch (e) {
		return failure({ status: false });
	}
}
