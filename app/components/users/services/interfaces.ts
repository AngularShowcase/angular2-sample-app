export interface IUser {
  HETU: string;
  cell: string;
  dob: string;
  email: string;
  gender: string;
  location: {
    city: string;
    region: string;
    street: string;
    zip: string;
  };
  md5: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  nationality: string;
  password: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  version: string;
}
