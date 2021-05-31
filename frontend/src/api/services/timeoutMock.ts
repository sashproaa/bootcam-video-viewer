export async function timeoutMock(data: any): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
}
