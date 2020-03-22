import * as dynamoDBService from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function random(event, context) {
	let randomPlate;
	const itemCountParams = {
		TableName: process.env.TABLE_NAME,
		ProjectionExpression: "plate"
	};

	try {
		const result = await dynamoDBService.documentClient(
			"scan",
			itemCountParams
		);

		if (result.Items) {
			let randomItemNumber = getRandomInt(0, result.Count - 1);
			randomPlate = result.Items[randomItemNumber].plate;
		} else {
			return failure({ status: false, error: "No plates found" });
		}
	} catch (e) {
		return failure({ status: false });
	}

	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { plate: randomPlate }
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

export async function single(event, context) {
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: { plate: event.pathParameters.plate }
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
