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

// Default options to buil RESTfulError
const defaultOptions = {
  errorType: 'UNKNOWN_INTERNAL_ERROR',
  HTTPStatusCode: 500,
  description: `The server encountered an unknown internal error. Please retry the request.`,
  sourceError: null,
  message: `Sorry carried out request has generated an unknown error.`
};


/**
 * Class representing a RESTful Error
 * @class
 */
class RESTfulError extends Error {
   
   /**
    * This static field contains all REStful Error properties
    * @constant {object} ERROR_TYPES 
    * @see {@link }
    */
   static get ERROR_TYPES() {
     return errorTypes;
   }
  
  /**
   * Create a RESTfulError
   * @param {object} Option object to build RESTfulError
   * @constructor
   */
  constructor(options) {
    super();
    this.name = 'RESTfulError';
    let typeOpts = typeof options;
    if (!options && (typeOpts !== 'function' || typeOpts !== 'object')) {
      options = {};
    }
    this.errorType = options.errorType || defaultOptions.errorType;
    this.HTTPStatusCode = options.HTTPStatusCode || defaultOptions.HTTPStatusCode;
    this.description = options.sourceError || defaultOptions.sourceError;
    this.message = options.message || defaultOptions.message;
  }

}

module.exports = RESTfulError;