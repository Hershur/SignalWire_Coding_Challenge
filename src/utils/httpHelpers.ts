import { Response } from "express";

const httpHelpers = {
  respondWith200OkJson: <T>(response: Response, jsonBody: T) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(jsonBody));
  },

  respondWith422UnprocessableEntity: <T>(response: Response, jsonBody: T) => {
    response.writeHead(422, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(jsonBody));
  },
  
  respondWith400BadRequest: <T>(response: Response, jsonBody?: T) => {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(jsonBody));
  }
};

export default httpHelpers;
