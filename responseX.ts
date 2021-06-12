import { ResponseData } from "./types";
// import { Response } from "express";

class ResponseStatus {
  statusCode: number | null;

  payload: ResponseData | null;

  message: string | null;

  constructor() {
    this.statusCode = null;
    this.payload = null;
    this.message = null;
  }

  setSuccess(statusCode: number, message: string, data: ResponseData): void {
    this.statusCode = statusCode;
    this.message = message;
    this.payload = data;
  }

  setError(statusCode: number, message: string): void {
    this.statusCode = statusCode;
    this.message = message;
  }

  send(res: Response): Response {
    const data = {
      message: this.message,
      payload: this.payload,
    };

    if (this.statusCode >= 200 && this.statusCode < 300) {
      return res.status(this.statusCode ? this.statusCode : 200).json(data);
    }

    return res.status(this.statusCode ? this.statusCode : 500).json({
      message: this.message,
      payload: [],
    });
  }
}
export default ResponseStatus;
