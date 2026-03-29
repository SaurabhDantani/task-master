export class CommonResponse<T = any> {
  status!: boolean;
  message!: string;
  data?: T;

  static success(message: string): CommonResponse {
    return {
      status: true,
      message,
    };
  }

  static failure(message: string): CommonResponse {
    return {
      status: false,
      message,
    };
  }

  static successWithData<T = any>(message: string, data: T): CommonResponse<T> {
    const response: CommonResponse<T> = {
      status: true,
      message,
    };
    if (data !== undefined) {
      response.data = data;
    }
    return response;
  }
}
