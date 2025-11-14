function queryString(str) {
  let queries = {};
  const reg = /.+\?(.+)/;
  const allQueries = reg.exec(str);

  if (allQueries) {
    const pairs = allQueries[1].split("&");
    for (const pair of pairs) {
      let [key, value] = pair.split("=");
      queries[key] = value;
    }
  }
  return queries;
}

function processUrl(url) {
  const [path] = url.split("?");
  return {
    path,
    queries: queryString(url),
  };
}

module.exports = { processUrl,queryString };
