import AWS from "aws-sdk";

export function documentClient(action, params) {
	const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({
		paramValidation: false
	});

	return dynamoDBDocumentClient[action](params).promise();
}
