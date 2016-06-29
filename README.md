# restful-error-es6
## Simple class to handle RESTful error with ES6 sugar syntax
RESTfulError is a utility class that help to generate error response in a webservice or a web application endpoint. 


When you implement a RESTful endpoint in Node.js you have to handle the error in response.
For example if you use expressjs to develop a webservice or a web application you follow the pattern reported below:
```javascript
//Import some required modules
const BookCtrl = require('controllers/Book');
const express = require('express');
const app = express();
//Some other configuration for the express app
//List of routes
app.get("/books/:id", (req, res, next) => {
    BookCtrl.findBookById(req.params.id, (err, res) => {
        if (err) {
          res.status(500).json({error: "Message to report error"});
        } else {
            res.status(200).json(res);
        }
    });
});
```
Every time your system generate an error you handle it and the corresponding response. The idea is to have a generic Error object that encapsulate all types of error and dispatch it to a centralized error middleware that will provide to generate the response as reported below:
```javascript
//Import some required modules
const BookCtrl = require('controllers/Book');
const RESTfulError = require("restful-error-es6");
const express = require('express');
const app = express();
//Some other configuration for the express app
//List of routes
app.get("/books/:id", (req, res, next) => {
    BookCtrl.findBookById(req.params.id, (err, res, next) => {
        if (err) {
            next(
                 new RESTfulError(
                     RESTfulError.INTERNAL_SERVER_ERROR,
                     "Your custom message for the error.",
                     err
                 )
               );
        } else {
            res.status(200).json(res);
        }
    });
});
```
In your error middleware you parse the error object and adapt your error response to be coherent with your rest or web application endpoint.

#### Installation
If you want use RESTfulError you have to install it. There are two methods for that:
In your package.json add the following item: 
```json
"restful-error-es6": "version"
```
then digit 
```console
npm install
```

**Example**:
```json
"restful-error-es6": "*" for the latest version
"restful-error-es6": "1.0.0" for the version 1.0.0
```
**OR**

launch this command:
```console
npm install restful-error-es6 --save
```
#### Below is reported the list of errors and their descriptions that are currently maneged by the RETfulError class

## Errors

### BAD_REQUEST
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
400 | Bad Request | BAD_REQUEST | [RFC7231, Section 6.5.1](http://tools.ietf.org/html/rfc7231)

##### Description:
The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.

### UNAUTHORIZED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
401 | Unauthorized | UNAUTHORIZED | [RFC7235, Section 3.1](http://tools.ietf.org/html/rfc7235)

##### Description:
The request requires user authentication. The response MUST include a WWW-Authenticate header field containing a challenge applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field. If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials. If the 401 response contains the same challenge as the prior response, and the user agent has already attempted authentication at least once, then the user SHOULD be presented the entity that was given in the response, since that entity might include relevant diagnostic information.

### FORBIDDEN
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
403 | Forbidden | FORBIDDEN | [RFC7231, Section 6.5.3](http://tools.ietf.org/html/rfc7231)

##### Description:
The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated. If the request method was not HEAD and the server wishes to make public why the request has not been fulfilled, it SHOULD describe the reason for the refusal in the entity. If the server does not wish to make this information available to the client, the status code 404 (Not Found) can be used instead.

### NOT_FOUND
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
404 | Not Found | NOT_FOUND | [RFC7231, Section 6.5.4](http://tools.ietf.org/html/rfc7231)

##### Description:
The server has not found anything matching the Request-URI. No indication is given of whether the condition is temporary or permanent. The 410 (Gone) status code SHOULD be used if the server knows, through some internally configurable mechanism, that an old resource is permanently unavailable and has no forwarding address. This status code is commonly used when the server does not wish to reveal exactly why the request has been refused, or when no other response is applicable.

### METHOD_NOT_ALLOWED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
405 | Method Not Allowed | METHOD_NOT_ALLOWED | [RFC7231, Section 6.5.5](http://tools.ietf.org/html/rfc7231)

##### Description:
The method specified in the Request-Line is not allowed for the resource identified by the Request-URI. The response MUST include an Allow header containing a list of valid methods for the requested resource.

### NOT_ACCEPTABLE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
406 | Not Acceptable | NOT_ACCEPTABLE | [RFC7231, Section 6.5.6](http://tools.ietf.org/html/rfc7231)

##### Description:
The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.

### PROXY_AUTHENTICATION_REQUIRED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
407 | Proxy Authentication Required | PROXY_AUTHENTICATION_REQUIRED | [RFC7235, Section 3.2](http://tools.ietf.org/html/rfc7235)

##### Description:
This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy. The proxy MUST return a Proxy-Authenticate header field containing a challenge applicable to the proxy for the requested resource. The client MAY repeat the request with a suitable Proxy-Authorization header field.

### REQUEST_TIMEOUT
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
408 | Request Timeout | REQUEST_TIMEOUT | [RFC7231, Section 6.5.7](http://tools.ietf.org/html/rfc7231)

##### Description:
The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.

### CONFLICT
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
409 | Conflict | CONFLICT | [RFC7231, Section 6.5.8](http://tools.ietf.org/html/rfc7231)

##### Description:
The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request. The response body SHOULD include enough information for the user to recognize the source of the conflict. Ideally, the response entity would include enough information for the user or user agent to fix the problem; however, that might not be possible and is not required.

### GONE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
410 | Gone | GONE | [RFC7231, Section 6.5.9](http://tools.ietf.org/html/rfc7231)

##### Description:
The requested resource is no longer available at the server and no forwarding address is known. This condition is expected to be considered permanent. Clients with link editing capabilities SHOULD delete references to the Request-URI after user approval. If the server does not know, or has no facility to determine, whether or not the condition is permanent, the status code 404 (Not Found) SHOULD be used instead. This response is cacheable unless indicated otherwise.

### LENGTH_REQUIRED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
411 | Length Required | LENGTH_REQUIRED | [RFC7231, Section 6.5.10](http://tools.ietf.org/html/rfc7231)

##### Description:
The server refuses to accept the request without a defined Content- Length. The client MAY repeat the request if it adds a valid Content-Length header field containing the length of the message-body in the request message.

### PRECONDITION_FAILED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
412 | Precondition Failed | PRECONDITION_FAILED | [RFC7232, Section 4.2](http://tools.ietf.org/html/rfc7232)

##### Description:
The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server. This response code allows the client to place preconditions on the current resource metainformation (header field data) and thus prevent the requested method from being applied to a resource other than the one intended.

### REQUEST_ENTITY_TOO_LARGE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
413 | Request Entity Too Large | REQUEST_ENTITY_TOO_LARGE | [RFC7231, Section 6.5.11](http://tools.ietf.org/html/rfc7231)

##### Description:
The server is refusing to process a request because the request entity is larger than the server is willing or able to process. The server MAY close the connection to prevent the client from continuing the request.

### REQUEST_URI_TOO_LONG
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
414 | Request-URI Too Long | REQUEST_URI_TOO_LONG | [RFC7231, Section 6.5.12](http://tools.ietf.org/html/rfc7231)

##### Description:
The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret. This rare condition is only likely to occur when a client has improperly converted a POST request to a GET request with long query information, when the client has descended into a URI black hole of redirection (e.g., a redirected URI prefix that points to a suffix of itself), or when the server is under attack by a client attempting to exploit security holes present in some servers using fixed-length buffers for reading or manipulating the Request-URI.

### UNSUPPORTED_MEDIA_TYPE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
415 | Unsupported Media Type | UNSUPPORTED_MEDIA_TYPE | [RFC7231, Section 6.5.13](http://tools.ietf.org/html/rfc7231)

##### Description:
The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.

### REQUESTED_RANGE_NOT_SATISFIABLE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
416 | Requested Range Not Satisfiable | REQUESTED_RANGE_NOT_SATISFIABLE | [RFC7233, Section 4.4](http://tools.ietf.org/html/rfc7233)

##### Description:
A server SHOULD return a response with this status code if a request included a Range request-header field, and none of the range-specifier values in this field overlap the current extent of the selected resource, and the request did not include an If-Range request-header field. (For byte-ranges, this means that the first- byte-pos of all of the byte-range-spec values were greater than the current length of the selected resource.) When this status code is returned for a byte-range request, the response SHOULD include a Content-Range entity-header field specifying the current length of the selected resource. This response MUST NOT use the multipart/byteranges content-type.

### EXPECTATION_FAILED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
417 | Expectation Failed | EXPECTATION_FAILED | [RFC7231, Section 6.5.14](http://tools.ietf.org/html/rfc7231)

##### Description:
The expectation given in an Expect request-header field could not be met by this server, or, if the server is a proxy, the server has unambiguous evidence that the request could not be met by the next-hop server.

### I_AM_A_TEAPOT
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
418 | I'm a teapot (RFC 2324) | I_AM_A_TEAPOT | No reference

##### Description:
This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers.

### ENHANCE_YOUR_CALM
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
420 | Enhance Your Calm | ENHANCE_YOUR_CALM | No reference

##### Description:
Returned by the API endpoint when the client is being rate limited. Likely a reference to this number's association with marijuana. Other services may wish to implement the 429 Too Many Requests response code instead.

### UNPROCESSABLE_ENTITY
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
422 | Unprocessable Entity | UNPROCESSABLE_ENTITY | [RFC4918](http://www.iana.org/go/rfc4918)

##### Description:
The 422 - Unprocessable Entity status code means the server understands the content type of the request entity (hence a 415 - Unsupported Media Type status code is inappropriate), and the syntax of the request entity is correct (thus a 400 - Bad Request status code is inappropriate) but was unable to process the contained instructions. For example, this error condition may occur if an XML request body contains well-formed (i.e., syntactically correct), but semantically erroneous, XML instructions.

### LOCKED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
423 | Locked (WebDAV) | LOCKED | [RFC4918](http://tools.ietf.org/html/rfc4918)

##### Description:
The 423 (Locked) status code means the source or destination resource of a method is locked. This response SHOULD contain an appropriate precondition or postcondition code, such as 'lock-token-submitted' or 'no-conflicting-lock'.

### FAILED_DEPENDENCY
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
424 | Failed Dependency (WebDAV) | FAILED_DEPENDENCY | [RFC4918](http://tools.ietf.org/html/rfc4918)

##### Description:
The 424 (Failed Dependency) status code means that the method could not be performed on the resource because the requested action depended on another action and that action failed.

### RESERVED_FOR_WEBDAV
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
425 | Reserved for WebDAV | RESERVED_FOR_WEBDAV | No reference

##### Description:
Defined in drafts of WebDAV Advanced Collections Protocol, but not present in Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol.

### UPGRADE_REQUIRED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
426 | Upgrade Required | UPGRADE_REQUIRED | [RFC7231, Section 6.5.15](http://tools.ietf.org/html/rfc7231)

##### Description:
Reliable, interoperable negotiation of Upgrade features requires an unambiguous failure signal. The 426 Upgrade Required status code allows a server to definitively state the precise protocol extensions a given resource must be served with.

### PRECONDITION_REQUIRED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
428 | Precondition Required | PRECONDITION_REQUIRED | [RFC6585](http://tools.ietf.org/html/rfc6585)

##### Description:
The origin server requires the request to be conditional. Intended to prevent the LOST UPDATE PROBLEM, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.

### TOO_MANY_REQUESTS
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
429 | Too Many Requests | TOO_MANY_REQUESTS | [RFC6585](http://tools.ietf.org/html/rfc6585)

##### Description:
The 429 status code indicates that the user has sent too many requests in a given amount of time (rate limiting). The response representations SHOULD include details explaining the condition, and MAY include a Retry-After header indicating how long to wait before making a new request.

### REQUEST_HEADER_FIELDS_TOO_LARGE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
431 | Request Header Fields Too Large | REQUEST_HEADER_FIELDS_TOO_LARGE | [RFC6585](http://tools.ietf.org/html/rfc6585)

##### Description:
The 431 status code indicates that the server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.

### NO_RESPONSE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
444 | No Response | NO_RESPONSE | No reference

##### Description:
The server returns no information to the client and closes the connection (useful as a deterrent for malware).

### RETRY_WITH
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
449 | Retry With (Microsoft) | RETRY_WITH | No reference

##### Description:
A Microsoft extension. The request should be retried after performing the appropriate action.

### BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
450 | Blocked by Windows Parental Controls (Microsoft) | BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS | No reference

##### Description:
A Microsoft extension. This error is given when Windows Parental Controls are turned on and are blocking access to the given webpage.

### CLIENT_CLOSED_REQUEST
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
499 | Client Closed Request | CLIENT_CLOSED_REQUEST | No reference

##### Description:
This code is introduced to log the case when the connection is closed by client while HTTP server is processing its request, making server unable to send the HTTP header back.

### INTERNAL_SERVER_ERROR
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
500 | Internal Server Error | INTERNAL_SERVER_ERROR | [RFC7231, Section 6.6.1](http://tools.ietf.org/html/rfc7231)

##### Description:
The server encountered an unexpected condition which prevented it from fulfilling the request.

### NOT_IMPLEMENTED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
501 | Not Implemented | NOT_IMPLEMENTED | [RFC7231, Section 6.6.2](http://tools.ietf.org/html/rfc7231)

##### Description:
The server does not support the functionality required to fulfill the request. This is the appropriate response when the server does not recognize the request method and is not capable of supporting it for any resource.

### BAD_GATEWAY
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
502 | Bad Gateway | BAD_GATEWAY | [RFC7231, Section 6.6.3](http://tools.ietf.org/html/rfc7231)

##### Description:
The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.

### SERVICE_UNAVAILABLE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
503 | Service Unavailable | SERVICE_UNAVAILABLE | [RFC7231, Section 6.6.4](http://tools.ietf.org/html/rfc7231)

##### Description:
The server is currently unable to handle the request due to a temporary overloading or maintenance of the server. The implication is that this is a temporary condition which will be alleviated after some delay. If known, the length of the delay MAY be indicated in a Retry-After header. If no Retry-After is given, the client SHOULD handle the response as it would for a 500 response.

### GATEWAY_TIMEOUT
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
504 | Gateway Timeout | GATEWAY_TIMEOUT | [RFC7231, Section 6.6.5](http://tools.ietf.org/html/rfc7231)

##### Description:
The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.

### HTTP_VERSION_NOT_SUPPORTED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
505 | HTTP Version Not Supported | HTTP_VERSION_NOT_SUPPORTED | [RFC7231, Section 6.6.6](http://tools.ietf.org/html/rfc7231)

##### Description:
The server does not support, or refuses to support, the HTTP protocol version that was used in the request message. The server is indicating that it is unable or unwilling to complete the request using the same major version as the client, as described in section 3.1, other than with this error message. The response SHOULD contain an entity describing why that version is not supported and what other protocols are supported by that server.

### VARIANT_ALSO_NEGOTIATES
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
506 | Variant Also Negotiates | VARIANT_ALSO_NEGOTIATES | [RFC2295](http://tools.ietf.org/html/rfc2295)

##### Description:
The 506 status code indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.

### INSUFFICIENT_STORAGE
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
507 | Insufficient Storage (WebDAV) | INSUFFICIENT_STORAGE | [RFC4918](http://tools.ietf.org/html/rfc4918)

##### Description:
The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request that received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.

### LOOP_DETECTED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
508 | Loop Detected (WebDAV) | LOOP_DETECTED | [RFC5842](http://tools.ietf.org/html/rfc5842)

##### Description:
The 508 (Loop Detected) status code indicates that the server terminated an operation because it encountered an infinite loop while processing a request with Depth: infinity. This status indicates that the entire operation failed.

### BANDWIDTH_LIMIT_EXCEEDED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
509 | Bandwidth Limit Exceeded | BANDWIDTH_LIMIT_EXCEEDED | No reference

##### Description:
This status code, while used by many servers, is not specified in any RFCs.

### NOT_EXTENDED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
510 | Not Extended | NOT_EXTENDED | [RFC2774](http://tools.ietf.org/html/rfc2774)

##### Description:
The policy for accessing the resource has not been met in the request. The server should send back all the information necessary for the client to issue an extended request. It is outside the scope of this specification to specify how the extensions inform the client.

### NETWORK_AUTHENTICATION_REQUIRED
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
511 | Network Authentication Required | NETWORK_AUTHENTICATION_REQUIRED | [RFC6585](http://tools.ietf.org/html/rfc6585)

##### Description:
The 511 status code indicates that the client needs to authenticate to gain network access. The response representation SHOULD contain a link to a resource that allows the user to submit credentials.

### NETWORK_READ_TIMEOUT_ERROR
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
598 | Network read timeout error | NETWORK_READ_TIMEOUT_ERROR | No reference

##### Description:
This status code is not specified in any RFCs, but is used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.

### NETWORK_CONNECT_TIMEOUT_ERROR
Status code | Error name | Error type | Reference
----- | ------------------------------------------------ | ------------------------------------------------ | -----------------------------
599 | Network read timeout error | NETWORK_CONNECT_TIMEOUT_ERROR | No reference

##### Description:
This status code is not specified in any RFCs, but is used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.

