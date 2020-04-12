import AWS from "aws-sdk";

export function documentClient(action, params) {
	const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({
		paramValidation: false,
	});

	return dynamoDBDocumentClient[action](params).promise();
}

export function client(action, params) {
	const dynamoDBClient = new AWS.DynamoDB({
		paramValidation: false,
	});

	return dynamoDBClient[action](params).promise();
}
