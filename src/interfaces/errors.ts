// function ServerResponseError(message = "", code = 500) {
//     this.name = "ServerResponseError";
//     this.message = message;
//     this.code = code;
// }
// ServerResponseError.prototype = Error.prototype;

function InnerDataError(message = "") { // @ts-ignore
  this.name = "InnerDataError"; // @ts-ignore
  this.message = message;
}

InnerDataError.prototype = Error.prototype;

export {
  // ServerResponseError,
  InnerDataError
}

export class ServerResponseError extends Error {// @ts-ignore
  private readonly code: number;// @ts-ignore
  private readonly type: string = 'SERVER_RESPONSE_ERROR';

  constructor(message: string, code: number) {
      super(message);

      this.code = code;

      Object.setPrototypeOf(this, ServerResponseError.prototype);
  }
}

export class AccountBlockedError extends Error {// @ts-ignore
  private readonly code: number;// @ts-ignore
  private readonly type: string = 'ACCOUNT_BLOCKED_ERROR';

  constructor(message: string, code: number) {
      super(message);

      this.code = code;

      Object.setPrototypeOf(this, ServerResponseError.prototype);
  }
}

export class AgentNotFoundError extends Error {// @ts-ignore
  private readonly type: string = 'AGENT_NOT_FOUND_ERROR';

  constructor(message: string) {
      super(message);

      Object.setPrototypeOf(this, AgentNotFoundError.prototype);
  }
}
