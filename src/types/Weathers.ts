export interface Options {
  method: string;
  url: string;
  params: {
    q: string;
  };
  headers: {
    [key: string]: string;
  };
}
