# Template 2: Performance-Sensitive Code

**Use this template when optimizing queries, implementing caching, building high-throughput systems, or addressing performance bottlenecks.**

---

## Quick Copy-Paste Template

```
I need to implement [DESCRIBE FUNCTIONALITY].

Performance requirements:
- Target latency: [P50/P95/P99 TARGETS]
- Expected throughput: [REQUESTS/SECOND, QUERIES/SECOND]
- Data volume: [NUMBER OF RECORDS, DATA SIZE]
- Concurrency: [SIMULTANEOUS USERS/OPERATIONS]

Before generating code, analyze:

1. **Algorithmic Complexity**: What's the time/space complexity of this approach?
2. **Memory Characteristics**: What's the memory footprint? Any allocation hotspots?
3. **Bottlenecks**: What are the likely performance bottlenecks?
4. **Scalability**: How does this perform at 10x, 100x current data volume?
5. **Tradeoffs**: What am I optimizing for (read vs write, latency vs throughput)?

Then implement with performance considerations addressed.

After implementation, explain:
- Chosen approach and why
- Performance characteristics (Big O notation)
- Scaling limits and mitigation strategies
- Monitoring/observability needs
```

---

## When to Use This Template

### ✅ Use for:
- Database query optimization
- Caching implementation
- High-throughput API endpoints
- Real-time data processing
- Resource-intensive computations

### ❌ Don't use for:
- Code that runs infrequently
- Operations already fast enough (<100ms)
- Prototype/proof-of-concept code
- Code where correctness > performance

---

## Example Usage

### Scenario: Real-Time Analytics Dashboard

```
I need to implement real-time analytics aggregation for a dashboard showing user activity metrics.

Performance requirements:
- Target latency: p95 < 200ms for dashboard load
- Expected throughput: 5,000 queries/second during peak hours
- Data volume: 100M events per day, 30-day retention window
- Concurrency: 500 simultaneous dashboard users

Before generating code, analyze:

1. **Algorithmic Complexity**:
   - Naive approach: O(n) scan of 3B events = unacceptable
   - Pre-aggregation: O(1) lookup from materialized views = target
   - Memory: ~100MB for 30-day aggregated data in cache

2. **Memory Characteristics**:
   - Redis cache: 100MB for hot aggregations (last 24h)
   - Cold aggregations: Query from Postgres materialized views
   - Connection pooling: Max 50 DB connections, 100 Redis connections

3. **Bottlenecks**:
   - Database: Materialized view refresh (can lag 1-5 minutes)
   - Cache: Thundering herd on cache miss for popular metrics
   - Network: Cross-region latency if cache miss

4. **Scalability**:
   - 10x traffic: Current Redis cluster handles it
   - 100x traffic: Need horizontal sharding by tenant ID
   - Storage: Materialized views consume 50GB, grows linearly

5. **Tradeoffs**:
   - Optimizing for: Read latency over write latency
   - Accepting: 1-5 minute staleness for cold aggregations
   - Trading: Storage space (materialized views) for query speed
```

---

## Performance Optimization Patterns

### Caching Strategies
- **Cache-aside**: Application checks cache, falls back to DB
- **Write-through**: Write to cache and DB simultaneously
- **Write-behind**: Write to cache, async write to DB

### Database Optimization
- **Indexes**: Create on WHERE, JOIN, ORDER BY columns
- **Materialized views**: Pre-compute expensive aggregations
- **Connection pooling**: Reuse connections, limit max pool size
- **Query optimization**: Use EXPLAIN ANALYZE, avoid N+1

### Async Processing
- **Job queues**: Offload non-critical work
- **Batching**: Group writes to reduce round trips
- **Streaming**: Process large datasets incrementally

---

## Related Resources

- [Performance Examples](../examples/python/performance-example.py)
- [Quick Start Guide](../docs/quick-start.md)

