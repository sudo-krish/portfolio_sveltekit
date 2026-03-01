---
title: "Real-Time CDC Patterns with Kafka"
description: "How we scaled database replication to 50M events."
datePublished: "2024-01-15"
category: "Data Engineering"
readTime: "8 min read"
keywords: ["Kafka", "Debezium", "CDC"]
---

## The Problem with Batch Processing
When you process 50M+ tracking events daily, a 3-hour batch lag means the customer doesn't know their shipment is delayed until it's too late.

Enter Change Data Capture (CDC). Instead of running heavy SQL queries spanning hours of data, we listen to the database's transaction log. 

### Architecture Overview
1. **Source Strategy:** Primary PostgreSQL databases emit changes to the Write-Ahead Log (WAL).
2. **Debezium Connectors:** We use Kafka Connect running Debezium to read the WAL and serialize rows into Avro format.
3. **Kafka Streams / Python Consumers:** The heavy lifting. We apply stateless transformations (masking PII) and stateful aggregations (windowing events by shipment ID) in real-time.

\`\`\`python
# Example: Using confluent-kafka for a high-throughput consumer
from confluent_kafka import Consumer, KafkaException

conf = {
    'bootstrap.servers': 'broker1:9092,broker2:9092',
    'group.id': 'cdc-lakehouse-ingestion',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False
}

consumer = Consumer(conf)
consumer.subscribe(['pg_public_tracking_events'])

def process_event(msg):
    # Deserialization and business logic here
    pass

try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None: continue
        if msg.error(): raise KafkaException(msg.error())
        
        process_event(msg)
        # Manually commit to ensure exactly-once semantics
        consumer.commit(asynchronous=True)
finally:
    consumer.close()
\`\`\`

### Lessons Hard Learned
* **Schema Evolution:** Hardcode schemas and you will fail. Use a Schema Registry (like Confluent's or AWS Glue) and configure Debezium to evolve gracefully.
* **Tombstone Records:** Handling \`DELETE\` operations requires careful downstream logic, especially if syncing to an immutable Data Lake. We trigger tombstone logic that tags records as deleted in Delta Lake rather than actually deleting them.

If you are building pipelines that require sub-second latency, this architecture pattern is the industry standard for a reason.
