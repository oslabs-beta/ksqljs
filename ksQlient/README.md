# ksQlient (formerly ksqlDB-JS)

<div align="center">
<img src="./static/name.png" alt="logo" width="400"/>
</div>

<div align="center">
<a href="https://github.com/oslabs-beta/ksqlSuite"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
<a href="https://github.com/oslabs-beta/ksqlSuite/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/ksqlSuite"></a>
<a href="https://github.com/oslabs-beta/ksqlSuite/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/ksqlSuite"></a>
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/ksqlSuite">

   <p align="center"> <strong>A native Node.js client for ksqlDB</strong></p>
</div>

## <a name="about"></a> About the Project

ksQlient is a **lightweight Node.js client for ksqlDB**, a database for streaming applications leveraging Kafka infrastructure under the hood.

With our client, you can deploy stream-processing workloads on ksqlDB from within JS applications using simple, declarative SQL statements.

Sample use cases:

1. Build applications that respond immediately to events.
2. Craft materialized views over streams.
3. Receive real-time push updates, or pull current state on demand.

## Table of Contents

- [About the project](#about)
- [Getting Started](#getting-started)
  - [Usage](#usage)
- [Features](#features)
- [Developers](#developers)
- [Contributions](#contributions)
- [License](#license)

## <a name="getting-started"></a> Getting Started

The client is available on Node package manager (npm) ([link](https://www.npmjs.com/package/ksqlient))

```bash

npm install ksqlient

```

## <a name="usage"></a> Usage

Create a client in the application file:

```javascript
const ksqldb = require("ksqlient");
const client = new ksqldb({ ksqldbURL: "<url to ksqlDB server>" });
```

To run tests, initiate Docker containers included in yaml file:

```bash
docker-compose up
npm test
```

## <a name="features"></a> Features

### Create a pull query

```javascript
client.pull("SELECT * FROM myTable;");
```

### Create a push query (persistent query that subscribes to a stream)

```javascript
client.push("SELECT * FROM myTable EMIT CHANGES;", (data) => {
  console.log(data);
});
```

### Terminate persistent query (e.g. push query)

```javascript
client.terminate(queryId);
```

### Insert rows of data into a stream

```javascript
client.insertStream("myTable", [
  { name: "jack", email: "123@mail.com", age: 25 },
  { name: "john", email: "456@mail.com", age: 20 },
]);
```

### List streams/queries

```javascript
client.ksql("LIST STREAMS;");
```

### Create table/streams

```javascript
client.createStream(
  "testStream",
  (columnsType = ["name VARCHAR", "email varchar", "age INTEGER"]),
  (topic = "testTopic"),
  (value_format = "json"),
  (partitions = 1)
);
```

### For custom SQL statements including complex joins use the .ksql method

```javascript
client.ksql("DROP STREAM IF EXISTS testStream;");
```

### SQL Query builder

Feel free to use the built-in query builder to parametrize any SQL query to avoid SQL injection.

```javascript
const builder = new queryBuilder();
const query = "SELECT * FROM table WHERE id = ? AND size = ?";
const finishedQuery = builder.build(query, 123, "middle");

client.ksql(finishedQuery);
```

### Create a table (materialized view) from a source stream

```javascript
client.createTableAs(
  "testTable",
  "sourceStream",
  (selectArray = ["name", "LATEST_BY_OFFSET(age) AS recentAge"]),
  (propertiesObj = { topic: "newTestTopic" }),
  (conditionsObj = { WHERE: "age >= 21", GROUP_BY: "name" })
);
```

### Create a stream based on an existing stream

```javascript
client.createStreamAs(
  "testStream",
  (selectColumns = ["name", "age"]),
  "sourceStream",
  (propertiesObj = {
    kafka_topic: "testTopic",
    value_format: "json",
    partitions: 1,
  }),
  (conditions = "age > 50")
);
```

### Pull stream data between two timestamps

```javascript
client.pullFromTo(
  "TESTSTREAM",
  "America/Los_Angeles",
  (from = ["2022-01-01", "00", "00", "00"]),
  (to = ["2022-01-01", "00", "00", "00"])
);
```

### Troubleshooting methods to inspect server metrics

- inspectServerStatus
- inspectQueryStatus
- inspectClusterStatus

## <a name="developers"></a> Use Case

We have built a [demo app](https://github.com/stabRabbitDemo/app) to showcase how ksQlient can be used to create a streaming application .

## <a name="developers"></a> Developers

- Javan Ang - [GitHub](https://github.com/javanang) | [LinkedIn](https://www.linkedin.com/in/javanang/)
- Michael Snyder - [GitHub](https://github.com/MichaelCSnyder) | [LinkedIn](https://www.linkedin.com/in/michaelcharlessnyder/)
- Jonathan Luu - [GitHub](https://github.com/jonathanluu17) | [LinkedIn](https://www.linkedin.com/in/jonathanluu17/)
- Matthew Xing - [GitHub](https://github.com/matthewxing1) | [LinkedIn](https://www.linkedin.com/in/matthew-xing/)
- Gerry Bong - [GitHub](https://github.com/ggbong734) | [LinkedIn](https://www.linkedin.com/in/gerry-bong-71137420/)

## <a name="contributions"></a> Contributions

Contributions to the code, examples, documentation, etc. are very much appreciated.

- Please report issues and bugs directly in this [GitHub project](https://github.com/oslabs-beta/ksqljs/issues).

## <a name="license"></a> License

This product is licensed under the MIT License - see the LICENSE.md file for details.

This is an open source product.

This product is accelerated by OS Labs.

ksqlDB is licensed under the [Confluent Community License](https://github.com/confluentinc/ksql/blob/master/LICENSE).

_Apache, Apache Kafka, Kafka, and associated open source project names are trademarks of the [Apache Software Foundation](https://www.apache.org/)_.
