import json
import boto3

# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# Use the DynamoDB object to select our table
table = dynamodb.Table('flightData')

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object we got from the Lambda service and store in variables
    flight_id = event['flightid']
    d_l = event['d_l']
    a_l = event['a_l']
    d_and_t = event['d_t']
    n_p = event['n_p']
    
    # Write flight_id data to the DynamoDB table and save the response in a variable
    response = table.put_item(
        Item={
            'flight_id': flight_id,
            'departure_location': d_l,
            'arrival_location': a_l,
            'date_time': d_and_t,
            'no_of_passengers':n_p,
            'status':'BOOKED'
        }
    )
    
    # Return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('flight data saved successfully!')
    }
