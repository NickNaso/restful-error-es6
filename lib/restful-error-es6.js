/*******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 * Mauro Doganieri <mauro.doganieri@gmail.com>
 ******************************************************************************/

'use strict';

/*!
 * Module dependencies
 */
const errorTypes = require('./error-types');

// Default options to build RESTfulError
const defaultOptions = {
  code: 'UNKNOWN_INTERNAL_ERROR',
  statusText: 'Unknown internal error',
  HTTPStatusCode: 500,
  description: 'The server encountered an unknown internal error. Please retry the request.',
  message: 'Sorry carried out request has generated an unknown error.'
};


/**
 * Class representing a RESTful Error
 * @class
 */
class RESTfulError extends Error {

  /**
   * Create a RESTfulError
   * @param {object} type RESTful error type 
   * @param {string} message Custom error message
   * @param {object} sourceError Last error detected during execution
   * @constructor
   */
  constructor(type, message, sourceError = null) {
    super();
    this.name = 'RESTfulError';
    this.code = type.code || defaultOptions.code;
    this.statusText = type.statusText || defaultOptions.statusText;
    this.HTTPStatusCode = type.HTTPStatusCode || defaultOptions.statusCode;
    this.description = type.description || defaultOptions.description;
    this.message = message;
    this.sourceError = sourceError;
  }

}

Object.assign(RESTfulError, errorTypes);


module.exports = RESTfulError;