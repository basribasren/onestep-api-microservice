everithing.io
nginx as gateway
ergast developer api

Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing
REST and WebSocket APIs at any scale. API developers can create APIs that access AWS or other web
services as well as data stored in the AWS Cloud. As an API Gateway API developer, you can create APIs
for use in your own client applications (apps). Or you can make your APIs available to third-party app
developers.

Amazon API Gateway offers features such as the following:
• Support for stateful (WebSocket (p. 596)) and stateless (REST (p. 177)) APIs.
• Powerful, flexible authentication (p. 346) mechanisms, such as AWS Identity and Access Management
policies, Lambda authorizer functions, and Amazon Cognito user pools.
• Developer portal (p. 629) for publishing your APIs.
• Canary release deployments (p. 660) for safely rolling out changes.
• CloudTrail (p. 568) logging and monitoring of API usage and API changes.
• CloudWatch access logging and execution logging, including the ability to set alarms. For more
information, see the section called “Monitor API Execution with Amazon CloudWatch” (p. 569) and
the section called “Monitor WebSocket API Execution with CloudWatch” (p. 616).
• Ability to use AWS CloudFormation templates to enable API creation. For more information, see
Amazon API Gateway Resource Types Reference and Amazon API Gateway V2 Resource Types
Reference.
• Support for custom domain names (p. 640).
• Integration with AWS WAF (p. 430) for protecting your APIs against common web exploits.
• Integration with AWS X-Ray (p. 558) for understanding and triaging performance latencies

Developer portal
An application that allows your customers to register, discover, and subscribe to your API products
(API Gateway usage plans), manage their API keys, and view their usage metrics for your APIs

API endpoint
A hostname for an API in API Gateway that is deployed to a specific region. The hostname is of the
form {api-id}.execute-api.{region}.amazonaws.com.

API key
An alphanumeric string that API Gateway uses to identify an app developer who uses your REST or
WebSocket API. API Gateway can generate API keys on your behalf, or you can import them from a
CSV file. You can use API keys together with Lambda authorizers (p. 380) or usage plans (p. 432)
to control access to your APIs.

The app does not need to know where the requested data is stored and fetched from on the backend. In
API Gateway REST APIs, the frontend is encapsulated by method requests and method responses. The API
interfaces with the backend by means of integration requests and integration responses

Integration request
The internal interface of a WebSocket API route or REST API method in API Gateway, in which you
map the body of a route request or the parameters and body of a method request to the formats
required by the backend.

Integration response
The internal interface of a WebSocket API route or REST API method in API Gateway, in which you
map the status codes, headers, and payload that are received from the backend to the response
format that is returned to a client app.

Mapping template
A scripts in Velocity Template Language (VTL) that transforms a request body from the frontend
data format to the backend data format, or that transforms a response body from the backend data
format to the frontend data format. Mapping templates can be specified in the integration request
or in the integration response. They can reference data made available at run time as context and
stage variables. The mapping can be as simple as an identity transform that passes the headers or
body through the integration as-is from the client to the backend for a request. The same is true for
a response, in which the payload is passed from the backend to the client

Method request
The public interface of a REST API method in API Gateway that defines the parameters and body
that an app developer must send in requests to access the backend through the API.

Method response
The public interface of a REST API that defines the status codes, headers, and body models that an
app developer should expect in responses from the API.

Private API endpoint
An API endpoint that is exposed through interface VPC endpoints and allows a client to securely
access private API resources inside a VPC. Private APIs are isolated from the public internet, and they
can only be accessed using VPC endpoints for API Gateway that have been granted access.

Private integration
An API Gateway integration type for a client to access resources inside a customer's VPC through a
private REST API endpoint without exposing the resources to the public internet.

Proxy integration
A simplified API Gateway integration configuration for a REST or WebSocket API. You can set up
a proxy integration as an HTTP proxy integration or a Lambda proxy integration. For HTTP proxy
integration, API Gateway passes the entire request and response between the frontend and an HTTP
backend. In REST APIs, proxy integration is most commonly used with a proxy resource, which is
represented by a greedy path variable (e.g., {proxy+}) combined with a catch-all ANY method.

Route request
The public interface of a WebSocket API method in API Gateway that defines the body that an app
developer must send in the requests to access the backend through the API.

Route response
The public interface of a WebSocket API that defines the status codes, headers, and body models
that an app developer should expect from API Gateway.

jika seseorang mau akses gateway dia harus punya token gateway
jika gateway mau akses microservice dia harus punya token user
OK di microservice tidak menyimpan session
session di simpan di gateway
const gateway = require('./helpers/gateway.helper.js');
ESB
    "superagent": "^5.0.5",
    "superagent-logger": "^1.1.0",
    "superagent-prefix": "0.0.2",
    "vhost": "3.0.2",
    yargs
    avsc
    nats
    "node-nats-streaming": "0.0.51",
jwt public key and private key
    "lru-cache": "^5.1.1"
    "ipaddr.js": "^1.9.0",
    
    "lint-staged": "8.2.0",
    "memory-usage": "1.2.1",
		"getstream-node": "1.5.0",
    pause
    "supertest": "4.0.2",
    https://microservices.io/patterns/microservices.html
    https://knexjs.org/
    	spotify portal
REST vs. gRPC: Pertempuran API
    "tape": "4.10.1",
    "joi": "14.3.1",
    "nodemailer": "5.1.1",
    "fastify": "2.4.1",
    "fastify-cors": "2.1.3",
    "fastify-formbody": "3.1.0",
    "fastify-multipart": "1.0.0",

server response / basic
