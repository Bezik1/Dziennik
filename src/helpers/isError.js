export const isError = () => {
  let err;
  const errTypes = [
    100,
    101,
    110,
    111,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    300,
    301,
    302,
    303,
    304,
    305,
    306,
    307,
    310,
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409,
    500,
    501,
    502,
    503,
    504,
    505,
    506,
    507,
    508,
    509,
    510,
    511
  ];
  const errLink = errTypes.map(
    (type) => `https://16rj7e.csb.app/error/${type}`
  );

  errLink.map((link) => {
    if (window.location == link) {
      err = true;
    } else {
      err = false;
    }
  });
  return err;
};
