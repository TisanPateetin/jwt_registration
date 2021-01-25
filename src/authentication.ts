import * as express from "express";
let jwt = require("jsonwebtoken");
var jwksClient = require("jwks-rsa");
import { String } from 'typescript-string-operations';
import env from "./env";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  roles?: string[]
): Promise<any> {
  if (securityName === "api_token") {
    return new Promise((resolve, reject) => {
      return reject(new Error("Not supported authentication type"));
    });

  }
  if (securityName === "jwt") {
    let token:any = request.query.token || request.headers["authorization"] || request.headers["Authorization"];

    return new Promise((resolve, reject) => {

      if (!token) {
        return reject(new Error("No token provided"));
      }

      if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      var decoded = jwt.decode(token, { complete: true });
      return resolve(decoded);
    });
  }
  return Promise.reject({});
}