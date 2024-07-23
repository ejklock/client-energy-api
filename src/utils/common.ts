export function successResponse<T>({
  message = 'Success',
  data,
}: { message?: string; data?: T } = {}): {
  success: boolean
  message: string
  data: T
} {
  return {
    success: true,
    message,
    ...(data && { data }),
  }
}

export function errorResponse(
  message: string,
  statusCode: number = 500,
): { statusCode: number; success: boolean; message: string } {
  return {
    success: false,
    statusCode,
    message,
  }
}
