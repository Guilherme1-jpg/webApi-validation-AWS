//fn = main
//schema = validacao
//argtype = body, queryString

const decoratorValidator = (fn, schema, argType) => {
  return async function (event) {
    const data = JSON.parse(event[argType]);
    const { error, value } = schema.validate(data, {
      abortEarly: false,
    });

    //faz com que o event.body ja venha como obj ao inves de string
    //tb altera o obj
    event[argType] = value;

    if (!error) {
      return fn.apply(this, arguments);
    }

    return {
      statusCode: 422,
      body: error.message,
    };
  };
};

module.exports = {
  decoratorValidator,
};
